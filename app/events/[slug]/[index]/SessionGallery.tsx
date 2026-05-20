"use client";

import { useState } from "react";
import Image from "next/image";
import { RiCloseLine, RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({
  images, startIndex, onClose,
}: { images: string[]; startIndex: number; onClose: () => void }) {
  const [current, setCurrent] = useState(startIndex);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
      >
        <RiCloseLine size={20} />
      </button>

      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-xs text-white/40 tabular-nums">
        {current + 1} / {images.length}
      </div>

      <div
        className="relative w-full max-w-5xl mx-16 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[current]}
          alt={`Photo ${current + 1}`}
          width={1400}
          height={900}
          className="object-contain w-full max-h-[90vh] rounded-xl"
          unoptimized
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <RiArrowLeftSLine size={22} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <RiArrowRightSLine size={22} />
          </button>
        </>
      )}
    </div>
  );
}

// ── Bento layouts ─────────────────────────────────────────────────────────────
// Each layout describes grid spans for a group of images.
// We tile these groups across all images.

type Span = { col: number; row: number };

const bentoPatterns: Span[][] = [
  // Pattern A: 1 big + 2 small (3 images)
  [
    { col: 2, row: 2 },
    { col: 1, row: 1 },
    { col: 1, row: 1 },
  ],
  // Pattern B: 1 tall + 2 wide stacked (3 images)
  [
    { col: 1, row: 2 },
    { col: 2, row: 1 },
    { col: 2, row: 1 },
  ],
  // Pattern C: 4 equal (4 images)
  [
    { col: 1, row: 1 },
    { col: 1, row: 1 },
    { col: 1, row: 1 },
    { col: 1, row: 1 },
  ],
  // Pattern D: 1 wide + 3 small (4 images)
  [
    { col: 3, row: 1 },
    { col: 1, row: 1 },
    { col: 1, row: 1 },
    { col: 1, row: 1 },
  ],
];

function pickPattern(remaining: number): Span[] {
  if (remaining === 1) return [{ col: 3, row: 2 }];
  if (remaining === 2) return [{ col: 2, row: 2 }, { col: 1, row: 2 }];
  if (remaining >= 4) return bentoPatterns[Math.floor(Math.random() * bentoPatterns.length)];
  return bentoPatterns[0]; // 3 images → pattern A
}

// ── Gallery ───────────────────────────────────────────────────────────────────
export default function SessionGallery({ images }: { images: string[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Build bento groups
  const groups: { items: { src: string; globalIdx: number; span: Span }[] }[] = [];
  let cursor = 0;

  while (cursor < images.length) {
    const remaining = images.length - cursor;
    const pattern = pickPattern(remaining);
    const take = Math.min(pattern.length, remaining);
    const group = {
      items: pattern.slice(0, take).map((span, i) => ({
        src: images[cursor + i],
        globalIdx: cursor + i,
        span,
      })),
    };
    groups.push(group);
    cursor += take;
  }

  return (
    <>
      <div className="space-y-3">
        {groups.map((group, gi) => (
          <div
            key={gi}
            className="grid grid-cols-3 gap-3 auto-rows-[200px] md:auto-rows-[260px]"
          >
            {group.items.map(({ src, globalIdx, span }) => (
              <button
                key={globalIdx}
                type="button"
                onClick={() => setLightbox(globalIdx)}
                className="relative overflow-hidden rounded-xl group focus:outline-none"
                style={{
                  gridColumn: `span ${span.col}`,
                  gridRow: `span ${span.row}`,
                }}
              >
                <Image
                  src={src}
                  alt={`Photo ${globalIdx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
              </button>
            ))}
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <Lightbox
          images={images}
          startIndex={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}
