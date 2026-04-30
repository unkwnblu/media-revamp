"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isOpen
          ? "h-screen bg-black overflow-hidden"
          : "bg-black/80 backdrop-blur-md border-b border-white-10"
      }`}
    >
      {/* Top bar */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 flex items-center gap-2.5"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src="/logo.png"
              alt="A1 Media"
              width={400}
              height={400}
              className="h-9 w-auto invert mix-blend-screen"
              priority
            />
            <span className="font-heading text-lg md:text-xl font-black tracking-wider">
              A1 Media
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs tracking-widest transition-opacity duration-300 hover:opacity-100 ${
                  pathname === item.href ? "opacity-100" : "opacity-60"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger / Close */}
          <button
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 -mr-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-[4.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                isOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu — inside the expanded nav */}
      {isOpen && (
        <div className="lg:hidden flex flex-col items-center justify-center gap-8 h-[calc(100vh-64px)]">
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-2xl font-heading font-black tracking-widest transition-all duration-300 hover:opacity-100 ${
                pathname === item.href ? "opacity-100" : "opacity-50"
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
