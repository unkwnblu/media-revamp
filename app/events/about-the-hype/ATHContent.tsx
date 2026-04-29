"use client";

import Link from "next/link";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { useInView } from "@/lib/useInView";

export default function ATHContent() {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 fade-in-up ${
          inView ? "in-view" : ""
        }`}
      >
        <div>
          <h2 className="font-heading font-black text-2xl md:text-3xl mb-6">
            Every Thursday
          </h2>
          <div className="space-y-3 text-sm opacity-80">
            <p className="normal-case">
              <strong>Venue:</strong> Chopilos, 873 Ozumba Mbadiwe, VI
            </p>
            <p className="normal-case">
              <strong>Time:</strong> 8 PM
            </p>
            <p className="normal-case">
              <strong>Entry:</strong> FREE
            </p>
          </div>
          <div className="mt-8 space-y-2 text-xs opacity-60">
            <p className="normal-case">
              Performance booking: +234 816 803 2026
            </p>
          </div>
        </div>
        <div>
          <h2 className="font-heading font-black text-2xl md:text-3xl mb-6">
            About
          </h2>
          <p className="text-sm leading-relaxed opacity-80 normal-case">
            Welcome to About The Hype — where the energy is unmatched and the
            vibe is everything. Every Thursday night, we bring together elite
            Artistes, Hypemen, and industry tastemakers for an unforgettable
            experience.
          </p>
          <div className="flex gap-4 mt-8">
            <Link
              href="https://www.instagram.com/aboutthehype.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </Link>
            <Link
              href="https://x.com/thea1media"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity"
              aria-label="X"
            >
              <FaXTwitter size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
