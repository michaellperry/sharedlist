const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Inputs
    entry: {
        main: "./src/client/main.ts"
    },
    resolve: {
        extensions: [".js", ".ts"],
        alias: {
            "@shared": path.resolve(__dirname, "./src/shared"),
            "jinaga": "jinaga/dist/jinaga",
        }
    },

    // Processing
    mode: "production",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/server/index.html",
            publicPath: "/scripts/",
            filename: "../server/[name].html",
        }),
    ],
    module: {
        rules: [{
            test: /\.ts$/,
            loader: "ts-loader",
            include: [
                path.resolve(__dirname, "./src/client"),
                path.resolve(__dirname, "./src/shared")
            ],
            exclude: [/node_modules/]
        }]
    },

    // Outputs
    output: {
        filename: "[name]-[contenthash].js",
        path: path.resolve(__dirname, "dist", "scripts"),
    },
};