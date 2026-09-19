import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NightNest — turn dark skies into a guest amenity",
  description: "A runnable demo that scores a rental property's night sky and builds a right-sized stargazing amenity plan.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
