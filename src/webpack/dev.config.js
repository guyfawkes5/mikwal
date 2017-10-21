const SRC = __dirname + "/..",
    DIST = SRC + "/../docs",
    
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: SRC + "/index.tsx",
    output: {
        filename: "bundle.js",
        path: DIST
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "awesome-typescript-loader"
        }, {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader"
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: SRC + "/assets/index.html"
        })
    ]
};