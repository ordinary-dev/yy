/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ["en", "ru"],
        defaultLocale: "en",
        localeDetection: false,
    },
}

module.exports = nextConfig
