import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/lib/data";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-black">

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-black to-pink-950/40 pointer-events-none" />

      {/* Ambient orbs */}
      <div className="ambient-orb w-[600px] h-[600px] bg-purple-600 top-[-15%] right-[-15%] !opacity-[0.08]" style={{ animationDelay: "0s" }} />
      <div className="ambient-orb w-[500px] h-[500px] bg-pink-600 bottom-[-15%] left-[-10%] !opacity-[0.07]" style={{ animationDelay: "3s" }} />
      <div className="ambient-orb w-[300px] h-[300px] bg-blue-500 top-[40%] left-[20%] !opacity-[0.05]" style={{ animationDelay: "5s" }} />

      {/* Decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-purple-400/[0.04] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-pink-400/[0.05] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-purple-300/[0.06] pointer-events-none" />

      {/* Giant 404 watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
        <span className="font-heading font-black text-[40vw] leading-none tracking-tighter">
          404
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl">

        {/* Logo */}
        <Link href="/" className="mb-12">
          <Image
            src="/logo.png"
            alt="A1 Media"
            width={400}
            height={400}
            className="h-14 w-auto invert mix-blend-screen"
            priority
          />
        </Link>

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-purple-400/60" />
          <span className="text-[10px] tracking-[0.4em] text-purple-400/60">
            404 — PAGE NOT FOUND
          </span>
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-pink-400/60" />
        </div>

        {/* Heading */}
        <h1 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-6">
          Looks like you&apos;re{" "}
          <span className="italic font-body font-medium bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
            lost
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-sm md:text-base leading-relaxed opacity-50 font-body font-medium normal-case max-w-sm mb-12">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Primary CTA */}
        <Link
          href="/"
          className="group relative inline-flex items-center gap-4 border border-purple-400/30 px-8 py-4 text-xs tracking-[0.3em] hover:border-purple-400/60 transition-all duration-500 rounded-full mb-12"
        >
          <span className="relative z-10">Back to Home</span>
          <span className="relative z-10 w-5 h-[1px] bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-9 transition-all duration-300" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-full" />
        </Link>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8 w-full max-w-xs">
          <div className="flex-1 h-[1px] bg-white/[0.06]" />
          <span className="text-[10px] tracking-widest text-white/20">OR EXPLORE</span>
          <div className="flex-1 h-[1px] bg-white/[0.06]" />
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] tracking-widest text-white/40 hover:text-white transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
