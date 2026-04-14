"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { amlrPastEvents } from "@/lib/data";
import { fadeInUp, staggerFadeIn } from "@/lib/animations";

export default function AMLRContent() {
  const infoRef = useRef<HTMLDivElement>(null);
  const pastEventsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const tweens: gsap.core.Tween[] = [];

    if (infoRef.current) {
      tweens.push(fadeInUp(infoRef.current));
    }

    const pastCards = pastEventsRef.current.filter(Boolean);
    if (pastCards.length > 0) {
      tweens.push(staggerFadeIn(pastCards, 0.08));
    }

    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* Event Details */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10">
        <div
          ref={infoRef}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <div>
            <h2 className="font-heading font-black text-2xl md:text-3xl mb-6">
              Next Edition
            </h2>
            <div className="space-y-3 text-sm opacity-80">
              <p className="normal-case">
                <strong>Event:</strong> Back to the Groove
              </p>
              <p className="normal-case">
                <strong>Date:</strong> Saturday, May 31st
              </p>
              <p className="normal-case">
                <strong>Venue:</strong> The Clubhouse, VI (Landmark Towers)
              </p>
              <p className="normal-case">
                <strong>Time:</strong> 10PM till late
              </p>
              <p className="normal-case">
                <strong>GA:</strong> &#8358;10,000
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-heading font-black text-2xl md:text-3xl mb-6">
              About
            </h2>
            <p className="text-sm leading-relaxed opacity-80 normal-case">
              After a brief pause, Amapiano Left and Right is back—and we&apos;re
              coming in hot with Back to the Groove! It&apos;s time to reconnect with
              the rhythm, the basslines, and the unmatched vibe only Amapiano
              can deliver.
            </p>
            <div className="mt-8 space-y-2 text-xs opacity-60">
              <p className="normal-case">
                Table reservations: +234 816 803 2026
              </p>
            </div>
            <div className="flex gap-4 mt-6">
              <Link
                href="https://www.instagram.com/amapianoleftandright"
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

      {/* Past Events Gallery */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="font-heading font-black text-2xl md:text-4xl mb-12 md:mb-16">
            Past Editions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amlrPastEvents.map((event, i) => (
              <div
                key={event.name}
                ref={(el) => {
                  if (el) pastEventsRef.current[i] = el;
                }}
                className="group aspect-[4/3] bg-white-10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white-20 to-transparent transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-end p-6">
                  <h3 className="font-heading font-black text-sm md:text-base">
                    {event.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
