/** @type {import('next').NextConfig} */
module.exports = {
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
};