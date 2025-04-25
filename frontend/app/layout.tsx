import { spaceGroteskFont, spaceMonoFont } from "./fonts";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import "./globals.css";
import type React from "react"; // Import React

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          spaceGroteskFont.variable,
          spaceMonoFont.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
