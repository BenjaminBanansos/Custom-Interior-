import React from "react";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "1.8rem",
            color: "var(--text-primary)",
            marginBottom: "0.5rem",
          }}
        >
          Credential Recovery
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Enter your email to reset your secure code.
        </p>
      </div>

      <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              color: "var(--text-secondary)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Email Identifier
          </label>
          <input
            type="email"
            className="input-elegant"
            placeholder="john@example.com"
          />
        </div>

        <button
          type="button"
          className="btn-primary"
          style={{ marginTop: "1rem", width: "100%" }}
        >
          Transmit Reset Link
        </button>
      </form>

      <div
        style={{
          marginTop: "2rem",
          textAlign: "center",
          fontSize: "0.85rem",
          color: "var(--text-secondary)",
        }}
      >
        Remembered it?{" "}
        <Link
          href="/account/login"
          style={{ color: "var(--text-primary)", textDecoration: "underline" }}
        >
          Back to login
        </Link>
      </div>
    </>
  );
}
