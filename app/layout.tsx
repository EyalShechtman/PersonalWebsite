import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { MusicProvider } from "./contexts/MusicContext";
import MusicFloatingButton from "./components/MusicFloatingButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Eyal Shechtman - Full-Stack Developer & AI Engineer",
  description: "Portfolio of Eyal Shechtman - Full-stack developer specializing in AI-powered applications, Next.js, TypeScript, and modern web development at Chewy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <MusicProvider>
          <MusicFloatingButton />
          {children}
        </MusicProvider>
      </body>
    </html>
  );
}
