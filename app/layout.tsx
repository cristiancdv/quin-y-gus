import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Alex_Brush } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { weddingContent } from "@/data/wedding";
import "./globals.css";

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
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
