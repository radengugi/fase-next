import { ForgotPasswordForm } from "./forgot-password-form"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold tracking-tight text-white">FASE</h1>
          </Link>
          <p className="mt-2 text-sm text-neutral-400">Reset your password</p>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <ForgotPasswordForm />

          <div className="mt-6 pt-6 border-t border-neutral-800">
            <p className="text-center text-sm text-neutral-400">
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-medium text-white hover:text-neutral-200 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
