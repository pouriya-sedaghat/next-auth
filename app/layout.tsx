import type { Metadata } from "next";

import "@/styles/globals.css";

import App from "@/layout/App";

// Client Side SessionProvider

// import SessionProvider from "@/components/SessionProvider";

// Server Side SessionProvider

import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Home",
  description: "Learning NextAuth Version 5 (Beta)",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="bg-gray-700 text-slate-100">
        {/* <SessionProvider> */}
        <SessionProvider session={session}>
          <App>{children}</App>
        </SessionProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
