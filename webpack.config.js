const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Inputs
    entry: {
        main: "./src/client/main.js"
    },

    // Processing
    mode: "production",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/server/index.html",
            publicPath: "/scripts/",
            filename: "../[name].html",
        }),
    ],

    // Outputs
    output: {
        filename: "[name]-[contenthash].js",
        path: path.resolve(__dirname, "dist", "scripts"),
    },
};