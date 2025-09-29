/** @type {import('next').NextConfig} */
const nextConfig = {
  // Set the output file tracing root to this directory to silence warning
  outputFileTracingRoot: '.',
  experimental: {
    // Improve build performance
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
};
export default nextConfig;
