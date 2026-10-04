import React from "react";
import Link from "next/link";

export default function DealerLogin({
  searchParams,
}: {
  searchParams: { apply?: string };
}) {
  const isApply = searchParams.apply === "1";

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
          {isApply ? "Dealer Application" : "Dealer Portal"}
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          {isApply
            ? "Submit your credentials for wholesale clearance."
            : "Access wholesale pricing and configuration tools."}
        </p>
      </div>

      <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {isApply && (
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
              Company Name
            </label>
            <input
              type="text"
              className="input-elegant"
              placeholder="Atelier Architecture Inc."
            />
          </div>
        )}
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
            Professional Email
          </label>
          <input
            type="email"
            className="input-elegant"
            placeholder="admin@domain.com"
          />
        </div>
        {!isApply && (
          <div>
            <label
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Secure Code
              </span>
              <Link
                href="/account/forgot-password"
                style={{ color: "var(--text-primary)", fontSize: "0.75rem" }}
              >
                Forgot?
              </Link>
            </label>
            <input
              type="password"
              className="input-elegant"
              placeholder="••••••••"
            />
          </div>
        )}

        <button
          type="button"
          className="btn-primary"
          style={{ marginTop: "1rem", width: "100%" }}
        >
          {isApply ? "Submit Application" : "Authorize Clearance"}
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
        {isApply ? (
          <>
            Already cleared?{" "}
            <Link
              href="/account/dealer-login"
              style={{ color: "var(--text-primary)" }}
            >
              Access Portal
            </Link>
          </>
        ) : (
          <>
            Need clearance?{" "}
            <Link
              href="/account/dealer-login?apply=1"
              style={{ color: "var(--text-primary)" }}
            >
              Apply Here
            </Link>
          </>
        )}
      </div>
    </>
  );
}
