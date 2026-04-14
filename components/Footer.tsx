"use client";

import Link from "next/link";
import { FaInstagram, FaXTwitter, FaFacebook } from "react-icons/fa6";
import { socialLinks } from "@/lib/data";

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: <FaInstagram size={20} />,
  X: <FaXTwitter size={20} />,
  Facebook: <FaFacebook size={20} />,
};

export default function Footer() {
  return (
    <footer className="border-t border-white-10">
      {/* Social Icons Row */}
      <div className="flex justify-center gap-6 py-8">
        {socialLinks.map((link) => (
          <Link
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 hover:opacity-100 transition-opacity duration-300"
            aria-label={link.platform}
          >
            {socialIcons[link.platform]}
          </Link>
        ))}
      </div>

      {/* Three Column Footer */}
      <div className="border-t border-white-10 py-6 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-widest opacity-50">
          <span>Privacy Policy</span>
          <span>&copy; 2026 A1 Media Group</span>
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
}
