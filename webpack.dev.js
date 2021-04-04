const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    target: "web",
    mode: "development", // this will trigger some webpack default stuffs for dev
    entry: "./src/components/index.tsx", // if not set, default path to './src/index.js'. Accepts an object with multiple key-value pairs, with key as your custom bundle filename(substituting the [name]), and value as the corresponding file path
    output: {
        filename: "bundle.js", // [name] will take whatever the input filename is. defaults to 'main' if only a single entry value
        path: path.resolve(__dirname, "dist") // the folder containing you final dist/build files. Default to './dist'
    },
    devtool: "eval-cheap-module-source-map", // a sourcemap type. map to original source with line number
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: "awesome-typescript-loader",
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
            {
                test: /\.css$/, // run the loaders below only on .css files
                // this are the loaders. they interpret files, in this case css. they run from right to left sequence.
                // css-loader: "interprets @import and url() like import/require() and will resolve them."
                // style-loader: "Adds CSS to the DOM by injecting a <style> tag". this is fine for development.
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "components", "index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: "./src/yourfile.css",
        }),
    ],
};