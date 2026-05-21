import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createMetadata } from "@/lib/metadata";

const CATEGORY_META: Record<string, { label: string; description: string }> = {
  "backstage":         { label: "Backstage",         description: "Behind-the-scenes footage and exclusive backstage content." },
  "studio":            { label: "Studio",             description: "Studio sessions and recording content." },
  "campaigns":         { label: "Campaigns",          description: "Brand campaigns and creative activations." },
  "music-videos":      { label: "Music Videos",       description: "Official music videos from our artists." },
  "brand-activations": { label: "Brand Activations",  description: "Live brand experiences and event activations." },
};

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORY_META[category];
  if (!meta) return {};
  return createMetadata({ title: meta.label });
}

export default async function GalleryCategoryPage({ params }: Props) {
  const { category } = await params;
  const meta = CATEGORY_META[category];
  if (!meta) notFound();

  const supabase = await createClient();

  const { data: videos } = await supabase
    .from("gallery_videos")
    .select("id, title, youtube_url, sort_order")
    .eq("category", category)
    .order("sort_order", { ascending: true });

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-10 relative overflow-hidden">
      {/* A1 watermark */}
      <div className="absolute top-24 inset-x-0 flex items-start justify-center pointer-events-none select-none">
        <span className="font-heading font-black leading-none tracking-tighter opacity-[0.04]" style={{ fontSize: "40vw" }}>A1</span>
      </div>

      <div className="max-w-[1400px] mx-auto relative">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] tracking-[0.4em] text-purple-400/60 mb-3">Gallery</p>
          <h1 className="font-heading font-black text-4xl md:text-6xl">{meta.label}</h1>
          <p className="text-white/50 mt-3 text-sm">{meta.description}</p>
        </div>

        {/* Grid */}
        {videos && videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((v) => (
              <div key={v.id} className="flex flex-col gap-2">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/[0.06]">
                  <iframe
                    src={v.youtube_url}
                    title={v.title || meta.label}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
                {v.title && (
                  <p className="text-sm text-white/60 px-1">{v.title}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-32 border border-dashed border-white/10 rounded-2xl">
            <p className="text-white/30 text-sm">No videos in this section yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
