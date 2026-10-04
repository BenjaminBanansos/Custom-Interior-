import type { Metadata } from "next";
import { Jost, Playfair_Display } from "next/font/google";
import { getTheme } from "../lib/theme_actions";
import ThemeProvider from "../components/ThemeProvider";
import FloatingCart from "../components/FloatingCart";
import Navbar from "../components/Navbar";
import "./compiled.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Architectural Light Control | Premium Curtains & Blinds Canada",
  description:
    "Custom-made blinds and curtains for retail and wholesale. Precision-engineered architectural light control for Canadian homes and businesses.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getTheme();
  return (
    <html lang="en" className={`\${jost.variable} \${playfair.variable}`}>
      <head>
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </head>
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          margin: 0,
        }}
      >
        <ThemeProvider initialTheme={theme}>
          <Navbar />
          <main className="flex-1 w-full bg-[#F5F7F9]">{children}</main>
          <FloatingCart />
        </ThemeProvider>
      </body>
    </html>
  );
}
