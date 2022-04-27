/** @type {import('next').NextConfig} */
const withSass = require('@zeit/next-sass')
module.exports = withSass({
    images: {
        // loader: "cloudinary",
        // path: "https://res.cloudinary.com/the-color-mill/image/upload/",
        domains: ["cdn.sanity.io", "res.cloudinary.com"],
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    env: {
        API_KEY: process.env.API_KEY,
    },
    reactStrictMode: true,
});