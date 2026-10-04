import React from "react";
import Link from "next/link";

export default function About() {
  return (
    <main
      style={{ minHeight: "100vh", backgroundColor: "var(--bg-secondary)" }}
    >
      {/* Navigation */}

      <div style={{ padding: "6rem 5%", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1
            style={{
              fontSize: "3.5rem",
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Our Story
          </h1>
          <div
            style={{
              width: "60px",
              height: "3px",
              backgroundColor: "var(--accent-gold)",
              margin: "0 auto",
            }}
          ></div>
        </div>

        <div
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.15rem",
            lineHeight: 1.8,
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            backgroundColor: "#fff",
            padding: "4rem",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <p>
            At Stitch Canada, we believe that window treatments should be as
            beautiful as they are functional. They are an essential part of your
            home's architecture and design.
          </p>
          <p>
            Our systems are carefully crafted with the highest quality
            materials, designed to offer perfect light control while elevating
            the aesthetic of any room. We pair traditional craftsmanship with
            modern engineering.
          </p>

          <div
            style={{
              padding: "2rem",
              backgroundColor: "var(--bg-secondary)",
              borderRadius: "var(--radius-sm)",
              marginTop: "1rem",
            }}
          >
            <h3
              style={{
                color: "var(--text-primary)",
                marginBottom: "1rem",
                fontSize: "1.5rem",
              }}
            >
              Our Mission
            </h3>
            <p style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
              To provide bespoke, premium window treatments that perfectly
              balance elegant design with everyday practicality. Every system is
              made-to-measure for your unique space.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
