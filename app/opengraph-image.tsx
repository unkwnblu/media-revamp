import { ImageResponse } from "next/og";

export const alt = "A1 Media — Lagos Entertainment Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0014 0%, #1a0030 40%, #0d0020 70%, #150025 100%)",
          position: "relative",
        }}
      >
        {/* Ambient glow effects */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-60px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)",
          }}
        />

        {/* Brand name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            A1
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: "rgba(255, 255, 255, 0.9)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
            }}
          >
            Media
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "80px",
            height: "2px",
            background: "linear-gradient(90deg, rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8))",
            marginBottom: "20px",
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(255, 255, 255, 0.5)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Entertainment Agency
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "2px",
              background: "linear-gradient(90deg, rgba(147, 51, 234, 0.6), rgba(236, 72, 153, 0.6))",
            }}
          />
          <div
            style={{
              fontSize: 14,
              color: "rgba(255, 255, 255, 0.3)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            thea1media.com
          </div>
          <div
            style={{
              width: "40px",
              height: "2px",
              background: "linear-gradient(90deg, rgba(236, 72, 153, 0.6), rgba(147, 51, 234, 0.6))",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
