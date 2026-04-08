import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Club Hub",
  description: "A full-stack developer ecosystem platform for challenges, showcases, analytics, and team operations."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-canvas font-sans text-text antialiased">
        {children}
      </body>
    </html>
  );
}
