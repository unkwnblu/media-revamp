import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "A1 Media",
    short_name: "A1 Media",
    description:
      "A1 Media is an entertainment company full of Art & Music Lovers — creating the most unique experiences ever.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/logo.png",
        sizes: "400x400",
        type: "image/png",
      },
    ],
  };
}
