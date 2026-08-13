import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  compress: true,
  experimental: {
    optimizeCss: true,
  },
  turbopack: {
    root: __dirname, // Explicitly set root to avoid conflict with rogue lockfiles in parent directories
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Slugs traducidos por idioma (ver src/lib/i18n/locales.ts).
  // redirects: slug legacy que no corresponde al idioma → 301 al slug correcto.
  // rewrites: slug público en inglés → ruta interna en español (que renderiza con locale "en").
  async redirects() {
    return [
      { source: "/en/galeria", destination: "/en/gallery", permanent: true },
      { source: "/en/politicas", destination: "/en/policies", permanent: true },
      { source: "/en/gracias", destination: "/en/thank-you", permanent: true },
      { source: "/en/tours/ascenso-sagrado", destination: "/en/tours/sacred-ascent", permanent: true },
      { source: "/en/tours/retiro-diosa-espejo", destination: "/en/tours/mirror-goddess-retreat", permanent: true },
      { source: "/es/gallery", destination: "/es/galeria", permanent: true },
      { source: "/es/policies", destination: "/es/politicas", permanent: true },
      { source: "/es/thank-you", destination: "/es/gracias", permanent: true },
      { source: "/es/tours/sacred-ascent", destination: "/es/tours/ascenso-sagrado", permanent: true },
      { source: "/es/tours/mirror-goddess-retreat", destination: "/es/tours/retiro-diosa-espejo", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/en/gallery", destination: "/en/galeria" },
      { source: "/en/policies", destination: "/en/politicas" },
      { source: "/en/thank-you", destination: "/en/gracias" },
      { source: "/en/tours/sacred-ascent", destination: "/en/tours/ascenso-sagrado" },
      { source: "/en/tours/mirror-goddess-retreat", destination: "/en/tours/retiro-diosa-espejo" },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=300, stale-while-revalidate=60" },
        ],
      },
      {
        source: "/imagenes/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/eco-tours/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/identidad-de-marca/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/informacion/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:file(favicon|hero-finca|icon).:ext(png|jpg|webp|svg)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
