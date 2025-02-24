/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  env: {
    API_URL: process.env.API_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "x-forwarded-host",
          value: process.env.ALLOWED_HOSTS || "",
        },
      ],
    },
  ],
};

export default nextConfig;
