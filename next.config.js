module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // no pathname provided, so all paths under this domain are allowed
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        // all paths under this domain are allowed
      },
      {
        protocol: "https",
        hostname: "s.gravatar.com",
        // all paths under this domain are allowed
      },
    ],
  },
};
// End next.config.js
