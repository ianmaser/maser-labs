import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maser Labs",
    short_name: "Maser Labs",
    description:
      "Custom software, AI automation, and web services engineered for the modern era.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0B10",
    theme_color: "#0A0B10",
    icons: [
      {
        src: "/brand/android-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/android-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
