"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./ChatWidget.module.css";
import { formatChatMessage } from "@/lib/formatChat";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WEBHOOK_URL = "https://n8n.srv1054162.hstgr.cloud/webhook/lajuana-chat-v1";
const SESSION_KEY = "lajuana_chat_session";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Generate or retrieve session ID
  const getSessionId = (): string => {
    if (typeof window === "undefined") return "session-1";
    let sessionId = sessionStorage.getItem(SESSION_KEY);
    if (!sessionId) {
      sessionId = `ses-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      sessionStorage.setItem(SESSION_KEY, sessionId);
    }
    return sessionId;
  };

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      if (container) {
        setTimeout(() => {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, scrollToBottom]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: getSessionId(),
          chatInput: trimmed,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      let text = "";
      if (Array.isArray(data)) {
        text = data[0]?.output || data[0]?.message || JSON.stringify(data[0]);
      } else if (typeof data === "object") {
        text = data.output || data.message || data.text || JSON.stringify(data);
      } else {
        text = String(data);
      }

      const assistantMessage: Message = { role: "assistant", content: text };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("[ChatWidget] Error:", error);
      const errorMsg: Message = {
        role: "assistant",
        content:
          "Disculpa, hubo un problema de conexión. Por favor intenta de nuevo o contáctanos al +57 302 102 5621.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    if (typeof window !== "undefined") {
      if (newState) {
        if (window.innerWidth <= 480) {
          document.body.style.overflow = "hidden";
          document.body.style.position = "fixed";
          document.body.style.width = "100%";
          document.body.classList.add("chat-open");
        }
      } else {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.classList.remove("chat-open");
      }
    }

    if (newState && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "¡Hola! 👋 Soy el asesor virtual de La Juana Cerro Tusa. ¿En qué puedo ayudarte hoy? Puedo asesorarte sobre nuestra finca, habitaciones, experiencias, reservas y más.",
        },
      ]);
    }
  };

  // === SOLUCIÓN DEFINITIVA: visualViewport para teclado móvil ===
  // Esta es la técnica que usan WhatsApp Web, Instagram DM, etc.
  // Cuando el teclado aparece, visualViewport.height se reduce.
  // Usamos ese valor para reposicionar el chat window dinámicamente.
  useEffect(() => {
    if (typeof window === "undefined" || !isOpen) return;
    // Solo activar en móvil
    if (window.innerWidth > 480) return;

    const chatWindow = chatWindowRef.current;
    if (!chatWindow) return;

    const updateChatPosition = () => {
      if (!window.visualViewport) return;

      const vv = window.visualViewport;
      const fullHeight = window.innerHeight;
      const viewportHeight = vv.height;
      const offsetTop = vv.offsetTop;

      // El teclado ocupa la diferencia entre fullHeight y viewportHeight
      const keyboardHeight = fullHeight - viewportHeight - offsetTop;

      if (keyboardHeight > 50) {
        // Teclado visible — reposicionar todo el chat
        // El chat se encaja entre offsetTop y viewportHeight
        chatWindow.style.position = "fixed";
        chatWindow.style.top = `${offsetTop}px`;
        chatWindow.style.height = `${viewportHeight}px`;
        chatWindow.style.maxHeight = `${viewportHeight}px`;
        chatWindow.style.bottom = "auto";
      } else {
        // Sin teclado — pantalla completa normal
        chatWindow.style.position = "fixed";
        chatWindow.style.top = "0";
        chatWindow.style.height = `${viewportHeight}px`;
        chatWindow.style.maxHeight = `${viewportHeight}px`;
        chatWindow.style.bottom = "auto";
      }

      // Forzar scroll al input después de reposicionar
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 50);
    };

    // Escuchar cambios en visualViewport
    const vv = window.visualViewport;
    vv.addEventListener("resize", updateChatPosition);
    vv.addEventListener("scroll", updateChatPosition);

    // También escuchar resize del window como fallback
    window.addEventListener("resize", updateChatPosition);

    // Ejecutar una vez al montar
    updateChatPosition();

    return () => {
      vv.removeEventListener("resize", updateChatPosition);
      vv.removeEventListener("scroll", updateChatPosition);
      window.removeEventListener("resize", updateChatPosition);

      // Restaurar estilos inline
      if (chatWindow) {
        chatWindow.style.position = "";
        chatWindow.style.top = "";
        chatWindow.style.height = "";
        chatWindow.style.maxHeight = "";
        chatWindow.style.bottom = "";
      }
    };
  }, [isOpen]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.classList.remove("chat-open");
      }
    };
  }, []);

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow} ref={chatWindowRef}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.avatar}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <div className={styles.headerTitle}>La Juana Cerro Tusa</div>
                <div className={styles.headerStatus}>● En línea</div>
              </div>
            </div>
            <div className={styles.headerActions}>
              <a
                href="https://wa.me/573021025621?text=Hola%20La%20Juana%2C%20me%20interesa%20reservar%20para%20un%20grupo%20familiar.%20%C2%BFTienen%20disponibilidad%3F"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappBtn}
                aria-label="Contactar por WhatsApp"
                title="Hablar con nosotros por WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.38-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
              </a>
              <button
                onClick={toggleChat}
                className={styles.closeButton}
                aria-label="Cerrar chat"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className={styles.messagesContainer}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${styles.message} ${
                  msg.role === "user" ? styles.userMessage : styles.botMessage
                }`}
                dangerouslySetInnerHTML={
                  msg.role === "assistant"
                    ? { __html: formatChatMessage(msg.content) }
                    : undefined
                }
              >
                {msg.role === "user" ? msg.content : null}
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.botMessage} ${styles.typing}`}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={styles.inputContainer}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu pregunta..."
              className={styles.chatInput}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className={styles.sendButton}
              aria-label="Enviar mensaje"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Bar */}
      <div className={styles.mobileBar}>
        <button
          onClick={toggleChat}
          className={styles.mobileChatButton}
          aria-label="Abrir chat de asistencia"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          ¿Hablamos de La Juana?
        </button>
      </div>

      {/* Floating Call Button - Solo desktop */}
      {!isOpen && (
        <a
          href="tel:+573021025621"
          className={styles.callButton}
          aria-label="Llamar por teléfono"
          title="Llamar al +57 302 102 5621"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
      )}

      {/* Floating Chat Button - Solo desktop */}
      <div className={styles.chatButtonWrapper}>
        {!isOpen && (
          <span className={styles.chatLabel}>¿Hablamos de La Juana?</span>
        )}
        <button
          onClick={toggleChat}
          className={`${styles.chatButton} ${isOpen ? styles.chatButtonActive : ""}`}
          aria-label={isOpen ? "Cerrar chat" : "Abrir chat de asistencia"}
        >
          {isOpen ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
