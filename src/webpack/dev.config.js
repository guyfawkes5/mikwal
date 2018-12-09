const SRC = __dirname + "/..",
    DIST = __dirname + "/../../docs",
    
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: SRC + "/index.jsx",
    output: {
        filename: "bundle.js",
        path: DIST
    },
    mode: "development",

    devtool: "source-map",

    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },

    module: {
        rules: [{
            test: /.jsx?$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            query: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
                plugins: ["@babel/plugin-proposal-class-properties"]
            }
        }, {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
        }, {
            test: /\.STL$/,
            loader: 'file-loader'
        }]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: SRC + "/assets/index.html"
        }),
        new CopyWebpackPlugin([{
            from: './src/assets/favicon.ico'
        }, {
            from: './src/assets/ireland.json'
        }, {
            from: './src/assets/export.png'
        }])
    ]
};