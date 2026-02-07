import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { TamboClientProvider } from "@/components/TamboClientProvider";
import { TravelAssistant } from "@/components/TravelAssistant";
import { BookingProvider } from "@/context/BookingContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BookingProvider>
          <TamboClientProvider>
            {children}
            <TravelAssistant />
          </TamboClientProvider>
        </BookingProvider>
      </body>
    </html>
  );
}
