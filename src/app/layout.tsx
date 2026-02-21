import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as a default clean font
import "./globals.css";
import { GameStateProvider } from "../lib/GameStateContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sana All Quest",
  description: "A Tagalog Survival RPG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-gray-950 text-white`}
      >
        <GameStateProvider>
          {children}
        </GameStateProvider>
      </body>
    </html>
  );
}
