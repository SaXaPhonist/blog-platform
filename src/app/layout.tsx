import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ThemeToggle from "@/components/ThemeToggle"

const inter = Inter({ subsets: ["latin"] })


export const metadata: Metadata = {
  title: "Blog Platform",
  description: "Dynamic blog platform using Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300`}>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <ThemeToggle />
      </body>
    </html>
  )
} 