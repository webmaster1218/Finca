"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ChatWidget.module.css";

const WHATSAPP_ICON =
  "M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.38-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Inicializa el SDK de Chatwoot (Natalia) y oculta su burbuja:
  // todo el contacto pasa por el FAB unificado
  useEffect(() => {
    if (typeof window === "undefined") return;

    (function (d, t) {
      var BASE_URL = "https://chatwoot.telocalizo.co";
      var g = d.createElement(t) as HTMLScriptElement;
      var s = d.getElementsByTagName(t)[0];
      g.src = BASE_URL + "/packs/js/sdk.js";
      g.defer = true;
      g.async = true;
      if (s && s.parentNode) {
        s.parentNode.insertBefore(g, s);
      }
      g.onload = function () {
        if ((window as any).chatwootSDK) {
          (window as any).chatwootSDK.run({
            websiteToken: "pNexTqfhYuUgZ5pUHhfmBA5v",
            baseUrl: BASE_URL,
          });
          const hideBubble = () => {
            const cw = (window as any).$chatwoot;
            if (cw && cw.toggleBubbleVisibility) cw.toggleBubbleVisibility();
          };
          setTimeout(hideBubble, 800);
          setTimeout(hideBubble, 2500);
        }
      };
    })(document, "script");

    const onOpen = () => setChatOpen(true);
    const onClose = () => setChatOpen(false);
    window.addEventListener("chatwoot:on-open", onOpen);
    window.addEventListener("chatwoot:on-close", onClose);
    return () => {
      window.removeEventListener("chatwoot:on-open", onOpen);
      window.removeEventListener("chatwoot:on-close", onClose);
    };
  }, []);

  // Cierra el menú al hacer clic fuera o presionar ESC
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openChat = () => {
    setOpen(false);
    setChatOpen(true);
    const cw = (window as any).$chatwoot;
    if (cw) {
      if (cw.open) cw.open();
      else if (cw.toggle) cw.toggle();
    }
  };

  // Fallback: si el panel de Chatwoot se cierra, volver a mostrar el FAB
  useEffect(() => {
    if (!chatOpen) return;
    const interval = setInterval(() => {
      const el = document.querySelector("#chatwoot-widget-container");
      const isOpen = el && el.classList.contains("is-open");
      if (!isOpen) setChatOpen(false);
    }, 700);
    return () => clearInterval(interval);
  }, [chatOpen]);

  return (
    <div
      ref={rootRef}
      className={`${styles.fabRoot} ${chatOpen ? styles.fabHidden : ""}`}
    >
      {open && (
        <div className={styles.fabMenu}>
          <a
            href="tel:+573021025621"
            className={styles.fabAction}
            onClick={() => setOpen(false)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Llamar</span>
          </a>
          <a
            href="https://wa.me/573021025621?text=Hola%20La%20Juana%2C%20me%20interesa%20reservar%20para%20un%20grupo%20familiar.%20%C2%BF%20Tienen%20disponibilidad%3F"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fabAction}
            onClick={() => setOpen(false)}
          >
            <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor">
              <path d={WHATSAPP_ICON} />
            </svg>
            <span>WhatsApp</span>
          </a>
          <button type="button" className={styles.fabAction} onClick={openChat}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>Habla con Natalia</span>
          </button>
        </div>
      )}
      <button
        type="button"
        className={`${styles.fab} ${open ? styles.fabOpen : ""}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Cerrar menú de contacto" : "Abrir menú de contacto"}
        aria-expanded={open}
      >
        {open ? (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 16 16" fill="currentColor">
            <path d={WHATSAPP_ICON} />
          </svg>
        )}
      </button>
    </div>
  );
}
