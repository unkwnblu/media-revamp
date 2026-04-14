"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { FaInstagram, FaXTwitter, FaFacebook } from "react-icons/fa6";
import { socialLinks } from "@/lib/data";
import { staggerFadeIn, fadeInUp } from "@/lib/animations";

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: <FaInstagram size={40} />,
  X: <FaXTwitter size={40} />,
  Facebook: <FaFacebook size={40} />,
};

export default function SocialsContent() {
  const cardsRef = useRef<HTMLAnchorElement[]>([]);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tweens: gsap.core.Tween[] = [];

    const cards = cardsRef.current.filter(Boolean);
    if (cards.length > 0) {
      tweens.push(staggerFadeIn(cards, 0.1));
    }

    if (contactRef.current) {
      tweens.push(fadeInUp(contactRef.current, 0.3));
    }

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* Social Links */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialLinks.map((link, i) => (
              <Link
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
                className="group border border-white-10 p-10 md:p-12 flex flex-col items-center justify-center gap-6 hover:bg-white hover:text-black transition-all duration-500"
              >
                <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                  {socialIcons[link.platform]}
                </span>
                <span className="font-heading font-black text-lg tracking-widest">
                  {link.platform}
                </span>
                <span className="text-[10px] tracking-widest opacity-40 group-hover:opacity-60 transition-opacity normal-case">
                  {link.url.replace("https://", "").replace("www.", "")}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Block */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10">
        <div
          ref={contactRef}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <h2 className="font-heading font-black text-2xl md:text-4xl mb-8">
            Get In Touch
          </h2>
          <div className="space-y-4 text-sm opacity-80">
            <p className="normal-case">
              <strong>Email:</strong>{" "}
              <Link
                href="mailto:A1@TheA1media.com"
                className="hover:opacity-100 transition-opacity"
              >
                A1@TheA1media.com
              </Link>
            </p>
            <p className="normal-case">
              <strong>Phone:</strong>{" "}
              <Link
                href="tel:+2348168032026"
                className="hover:opacity-100 transition-opacity"
              >
                +234 816 803 2026
              </Link>
            </p>
            <p className="normal-case">
              <strong>Location:</strong> Lekki, Lagos, Nigeria
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
