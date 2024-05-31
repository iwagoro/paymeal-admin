/**
 * @type {import('next').NextConfig}
 */
// next.config.js

const nextConfig = {
    images: {
        domains: ["blogger.googleusercontent.com"],
    },
    reactStrictMode: false, // Strict Modeを無効にする
    output: "standalone",
    env: {
        TZ: process.env.TZ || "Asia/Tokyo",
    },
};

module.exports = nextConfig;
