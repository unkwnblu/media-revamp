"use client";

import Link from "next/link";
import { FaInstagram, FaXTwitter, FaFacebook } from "react-icons/fa6";
import { socialLinks } from "@/lib/data";
import { useInView } from "@/lib/useInView";

const socialIcons: Record<string, React.ReactNode> = {
  Instagram: <FaInstagram size={40} />,
  X: <FaXTwitter size={40} />,
  Facebook: <FaFacebook size={40} />,
};

export default function SocialsContent() {
  const { ref: cardsRef, inView: cardsInView } = useInView(0.1);
  const { ref: contactRef, inView: contactInView } = useInView(0.2);

  return (
    <>
      {/* Social Links */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10">
        <div className="max-w-[1400px] mx-auto">
          <div
            ref={cardsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children"
          >
            {socialLinks.map((link) => (
              <Link
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group border border-white-10 p-10 md:p-12 flex flex-col items-center justify-center gap-6 hover:bg-white hover:text-black transition-all duration-500 fade-in-up ${
                  cardsInView ? "in-view" : ""
                }`}
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
          className={`max-w-4xl mx-auto text-center space-y-6 fade-in-up ${
            contactInView ? "in-view" : ""
          }`}
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
