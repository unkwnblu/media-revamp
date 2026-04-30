export default function MarqueeTicker() {
  const items = [
    "Artist Bookings",
    "Asset & Content Creation",
    "Crisis Management",
    "Public & Media Relations",
    "Social Media Ads & Campaigns",
    "Reporting",
    "Live Events",
    "Brand Activations",
  ];

  const repeated = [...items, ...items];

  return (
    <section className="border-y border-white-10 py-5 overflow-hidden bg-gradient-to-r from-purple-950/30 via-black to-pink-950/30">
      <div className="marquee-track">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 mx-6 text-sm md:text-base font-heading font-black tracking-widest whitespace-nowrap opacity-60"
          >
            <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
          </span>
        ))}
      </div>
    </section>
  );
}
