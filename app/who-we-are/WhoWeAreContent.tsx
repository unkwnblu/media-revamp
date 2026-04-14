"use client";

import { useRef, useEffect } from "react";
import { fadeInUp } from "@/lib/animations";

export default function WhoWeAreContent() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const tween = fadeInUp(sectionRef.current);
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 md:px-10 border-t border-white-10">
      <div ref={sectionRef} className="max-w-4xl mx-auto text-center">
        <p className="text-base md:text-lg lg:text-xl leading-relaxed font-body font-medium opacity-90 normal-case">
          We are specifically built on the premise of diversity and inclusion.
          We&apos;re still building on that legacy and are always looking for new
          ways to do so. Fueled by self-expression and the spirit of discovery,
          we respond to a calling to connect and form something bigger than
          ourselves. We strive to create safe and magical spaces fueled by
          relentless positivity.
        </p>
      </div>
    </section>
  );
}
