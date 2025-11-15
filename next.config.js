/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/graphics', 
  reactStrictMode: true,
  swcMinify: true,
  runtime: 'experimental-edge',
  experimental: {
    externalDir: true,
  },
  webpack(config) {
    config.experiments = {
      asyncWebAssembly: true,
      syncWebAssembly: true,
      layers: true
    };
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: {
        loader: '@svgr/webpack',
        options: { 
          svgoConfig: {
            plugins: [
              {
                name: 'removeViewBox',
                active: false,
              },
            ],
          },
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
