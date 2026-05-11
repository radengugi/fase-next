import { Inter } from "next/font/google"
import { ClientNav } from "@/components/client/client-nav"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`min-h-screen bg-neutral-950 text-white flex ${inter.className}`}>
      <ClientNav />
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
