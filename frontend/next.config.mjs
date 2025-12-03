// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // ✅ Libera Cloudinary (qualquer pasta/tenancy do seu cloud)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
    // Formatos mais leves
    formats: ["image/avif", "image/webp"],
    // (opcional) se você usar SVG do Cloudinary
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // (opcionais) ajuste caso queira controlar o responsive loader
    // deviceSizes: [360, 640, 768, 1024, 1280, 1536],
    // imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  experimental: {
    // ✅ reduz bundle e melhora cold start do framer-motion
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
