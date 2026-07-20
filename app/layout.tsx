import type { Metadata } from "next";
import { Geist, Google_Sans, Poppins, Instrument_Sans, Birthstone} from "next/font/google";
import { Providers } from "./providers/query-client";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

const popins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"]

})

const googleSans = Google_Sans({
  weight: [ "400", "500", "700", "600"],
  variable: "--font-google-sans",
  subsets: ["latin"]
})

const birthstone = Birthstone({
  weight: ["400"],
  variable: "--font-birthstone",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Revendaja",
  description: "A plataforma definitiva para comprar e vender produtos usados com segurança e facilidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${popins.variable} ${googleSans.variable} ${birthstone.variable} *: antialiased`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
