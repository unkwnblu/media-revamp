"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RiEyeLine, RiEyeOffLine, RiLockPasswordLine, RiMailLine, RiArrowRightLine, RiShieldCheckLine } from "react-icons/ri";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/app/admin/components/Toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Invalid email or password. Please try again.");
      setIsLoading(false);
      return;
    }

    showToast("Welcome back! You're now signed in.", "success");
    setTimeout(() => router.push("/admin"), 800);
  };

  return (
    <div className="fixed inset-0 z-[300] bg-[#08080f] flex items-center justify-center px-4 overflow-hidden">

      {/* Ambient background orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-pink-600/10 blur-[120px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative w-full max-w-md">

        {/* Logo + branding */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/logo.png"
              alt="A1 Media"
              width={400}
              height={400}
              className="h-12 w-auto invert mix-blend-screen"
              priority
            />
            <div>
              <p className="text-xl font-black tracking-wider leading-none" style={{ fontFamily: "var(--font-nunito-sans)" }}>
                A1 Media
              </p>
              <p className="text-[11px] text-white/40 tracking-[0.2em] mt-0.5">ADMIN PORTAL</p>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-black tracking-tight" style={{ fontFamily: "var(--font-nunito-sans)" }}>
              Welcome back
            </h1>
            <p className="text-sm text-white/40 mt-1">Sign in to manage your content</p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-8 space-y-5">

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-white/60">
                Email address
              </label>
              <div className="relative">
                <RiMailLine
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="admin@a1media.com"
                  required
                  autoComplete="email"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-purple-400/60 focus:bg-white/[0.06] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-white/60">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-purple-400/70 hover:text-purple-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <RiLockPasswordLine
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-12 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-purple-400/60 focus:bg-white/[0.06] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <span className="shrink-0">⚠</span>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <RiArrowRightLine size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex-1 h-[1px] bg-white/[0.06]" />
            <span className="text-[11px] text-white/20 tracking-widest">SECURE</span>
            <div className="flex-1 h-[1px] bg-white/[0.06]" />
          </div>

          {/* Security note */}
          <div className="flex items-center gap-2.5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
            <RiShieldCheckLine size={15} className="text-purple-400/60 shrink-0" />
            <p className="text-[11px] text-white/30 leading-relaxed">
              This portal is restricted to authorised A1 Media administrators only.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-white/20 mt-8">
          © {new Date().getFullYear()} A1 Media · All rights reserved
        </p>
      </div>
    </div>
  );
}
