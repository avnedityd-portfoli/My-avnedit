import * as React from "react"
import "./Contact.css"

const GMAIL_PLACEHOLDER = "YOUR-GMAIL-HERE"

export default function Contact() {
  const [copied, setCopied] = React.useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(GMAIL_PLACEHOLDER)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard API might be blocked — fail silently, button still opens Gmail
    }
  }

  return (
    <div className="avn-page avn-container">
      <div className="avn-contact-hero">
        <h1>Let's Create Something Great</h1>
        <p>
          Contact AVNEDIT for project discussions, custom work, questions, or service inquiries.
        </p>
      </div>

      <div className="avn-card avn-contact-card">
        <span className="avn-contact-label">Your Email</span>
        <span className="avn-contact-email">{GMAIL_PLACEHOLDER}</span>
        <div className="avn-contact-actions">
          <button type="button" className="avn-btn avn-btn-secondary" onClick={handleCopy}>
            {copied ? "Copied ✓" : "Copy Email"}
          </button>
          <a
            className="avn-btn avn-btn-primary"
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${GMAIL_PLACEHOLDER}`}
            target="_blank"
            rel="noreferrer"
          >
            Open Gmail
          </a>
        </div>
        <p className="avn-field-hint" style={{ marginTop: 18 }}>
          Replace YOUR-GMAIL-HERE in src/pages/Contact.jsx once your Gmail address is ready.
        </p>
      </div>
    </div>
  )
}
