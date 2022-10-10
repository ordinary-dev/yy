/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["localhost", "127.0.0.1", "photo-storage"],
    },
    i18n: {
        locales: ["en", "ru"],
        defaultLocale: "en",
        localeDetection: false,
    },
}

module.exports = nextConfig
