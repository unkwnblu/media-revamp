export default function A1Watermark() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <span className="font-heading font-black leading-none tracking-tighter opacity-[0.04]" style={{ fontSize: "40vw" }}>
        A1
      </span>
    </div>
  );
}
