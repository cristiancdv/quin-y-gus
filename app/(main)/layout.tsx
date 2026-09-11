import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Alex_Brush } from "next/font/google";
import { QRCodeSVG } from "qrcode.react";
import { Toaster } from "@/components/ui/sonner";
import { weddingContent } from "@/data/wedding";
import { accessibilityContent } from "@/data/sections";
import "../globals.css";

// Body copy: clean grotesque sans, matches the reference's UI text.
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// Section headings and the two-tone "El algoritmo del / amor verdadero"
// style titles throughout the page.
const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

// The couple's names in the hero and footer ("Valentina & Sebastián").
const alexBrush = Alex_Brush({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const { first, second } = weddingContent.coupleNames;
const { notFoundCards } = weddingContent;

export const metadata: Metadata = {
  title: `${first} & ${second} — ${weddingContent.weddingDateLabel}`,
  description: `Acompañanos a celebrar el casamiento de ${first} y ${second}, el ${weddingContent.weddingDateLabel} en ${weddingContent.venue.name}.`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fdf8f5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfairDisplay.variable} ${alexBrush.variable} antialiased`}
    >
      <body className="bg-background text-foreground min-h-screen">
        <div className="mobile-app">
          {children}
          <Toaster position="top-center" richColors />
        </div>
        <main className="desktop-message" aria-label={accessibilityContent.desktopAvailability}>
          <article className="desktop-message-card">
            <i className={notFoundCards.icon} />
            <h1>{notFoundCards.title}</h1>
            <p>{notFoundCards.paragraph}<span className="font-bold">{notFoundCards.paragraphSpan}</span></p>
            {notFoundCards.qrUrl ? (
              <QRCodeSVG
                value={notFoundCards.qrUrl}
                size={160}
                marginSize={2}
                bgColor="#ffffff"
                fgColor="#241f1a"
                aria-label={accessibilityContent.eventQr}
              />
            ) : null}
          </article>
        </main>
      </body>
    </html>
  );
}
