/** @type {import('next').NextConfig} */
const path = require('path')
module.exports = {
    trailingSlash: true,
	webpackDevMiddleware: config => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300
		}
		return config
	},
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
      },
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