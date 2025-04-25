import localFont from "next/font/local";
import { Space_Grotesk, Space_Mono } from "next/font/google";

// Space Grotesk and Space Mono for Neo Brutalism design
export const spaceGroteskFont = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const spaceMonoFont = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

// Keep the original font for backward compatibility
export const monaSans = localFont({
  src: [
    {
      path: "./MonaSans-VariableFont_wdth,wght.ttf",
      style: "normal",
    },
    {
      path: "./MonaSans-Italic-VariableFont_wdth,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-mona-sans",
  display: "swap",
});
