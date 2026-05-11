import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen bg-neutral-950 text-white flex items-center justify-center relative overflow-hidden ${inter.className}`}>
      {/* Animated Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md p-8">
        <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 p-8 rounded-2xl shadow-2xl">
          <div className="flex justify-center mb-8">
            <h1 className="text-3xl font-bold tracking-tighter">FASE</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
