/**
 * Lightweight chat message formatter.
 * Converts basic markdown to safe HTML for the chat widget.
 * No external dependencies needed.
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Format a chat message with basic markdown support:
 * - **bold** → <strong>
 * - *italic* → <em>
 * - [text](url) → <a href="url" target="_blank">text</a>
 * - \n → <br>
 * - URLs auto-linked
 */
export function formatChatMessage(raw: string): string {
  // First escape HTML to prevent injection
  let text = escapeHtml(raw);

  // Links: [text](url) — must process before bold/italic
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#6f7c4e;text-decoration:underline;font-weight:600;">$1</a>'
  );

  // Bold: **text**
  text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // Italic: *text* (but not inside strong tags)
  text = text.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");

  // Auto-link bare URLs (not already inside an anchor tag)
  text = text.replace(
    /(?<!href=")(?<!href=)https?:\/\/[^\s<]+/g,
    (match) => {
      const cleanUrl = match.replace(/[.,;:!?)\]]+$/, "");
      return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" style="color:#6f7c4e;text-decoration:underline;">${cleanUrl}</a>`;
    }
  );

  // Line breaks
  text = text.replace(/\n/g, "<br>");

  // Clean up any leftover markdown artifacts
  text = text.replace(/\*\*/g, "");
  text = text.replace(/\*/g, "");

  return text;
}
