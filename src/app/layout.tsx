import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/context/SidebarContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { SavedCoursesProvider } from "@/context/SavedCoursesContext";
import { ToastProvider } from "@/components/Toast";
import { ChallengesProvider } from "@/context/ChallengesContext";
import BootSplash from "@/components/BootSplash";
import RouteWarmer from "@/components/RouteWarmer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reallife 101 — Learn Real Skills",
  description:
    "A modern learning platform for practical life skills. Finance, Career, Health, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-brand-bg text-white antialiased`}>
        <SidebarProvider>
          <LanguageProvider>
            <SubscriptionProvider>
              <SavedCoursesProvider>
                <ChallengesProvider>
                  <ToastProvider>{children}</ToastProvider>
                </ChallengesProvider>
              </SavedCoursesProvider>
            </SubscriptionProvider>
          </LanguageProvider>
        </SidebarProvider>
        {/* Branded boot splash — server-rendered, covers the first paint
            until React hydrates, then fades out (mounts once per page load). */}
        <BootSplash />
        {/* Prefetch every route right after boot so tab switches are instant */}
        <RouteWarmer />
      </body>
    </html>
  );
}
