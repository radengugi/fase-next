import { Inter } from "next/font/google";
import { Sidebar } from "@/components/admin/sidebar";
import { TopNav } from "@/components/admin/topnav";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className={`min-h-screen bg-neutral-950 text-white flex ${inter.className}`}>
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 ml-[280px]">
          <TopNav />
          <main className="flex-1 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
