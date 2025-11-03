import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { AuthProvider } from "@/components/AuthProvider"
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Navbar } from "@/components/Navbar";
//import { decodeAccessToken, getAccessToken } from "@/lib/auth-client";
import Footer from "@/components/Footer";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Design Better - Explora diseños personalizados",
  description: "Busca y personaliza tu vestuario",
};

//function getUser() {
  //const access = getAccessToken()
//  if (access) {
  //  return decodeAccessToken(access)
  //}
  //return null
//}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const us = getUser();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <GoogleOAuthProvider clientId="454329887491-3vjn6t36k4c45l2l3n96k87gl77v5jjq.apps.googleusercontent.com">
          <div className="min-h-screen flex flex-col theme-purple">
          <Navbar />
              <main className="flex-1">{children}</main>
          <Footer />
          </div>
          </GoogleOAuthProvider>
        </AuthProvider>
        
      </body>
    </html>
  );
}
