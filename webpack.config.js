var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

var METADATA = {
    title: "My app",
    description: "This is my app",
    baseUrl: "/",
    host: "localhost",
    port: 3000
};

var config = {
    entry: {
        //"vendor": "./src/vendor.ts",
        "index": "./src/index.ts"
    },

    output: {
        path: "dist",
        filename: "[name].bundle.js",
        sourceMapFilename: "[name].bundle.map",
        chunkFilename: "[id].chunk.js"
    },

    // static data for index.html
    metadata: METADATA,

    // Enable sourcemaps for debugging webpack"s output.
    devtool: "source-map",

    resolve: {
        // Add ".ts" and ".tsx" as resolvable extensions.
        extensions: ["", ".ts", ".tsx", ".js"]
    },

    module: {
        preLoaders: [
            // All output ".js" files will have any sourcemaps re-processed by "source-map-loader".
            {test: /\.js$/, loader: "source-map-loader"}
        ],

        loaders: [
            // All files with a ".ts" or ".tsx" extension will be handled by "ts-loader".
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },

            {
                test: /\.css$/,
                loader: "style!css"
            },

            {
                test: /\.less$/,
                loader: "style!css!less",
                exclude: /node_modules/
            },

            {
                /*
                 * embed images and fonts smaller than 5kb
                 * "image-webpack-loader?optimizationLevel=7&.........."
                 */
                test: /\.(gif|png|jpg|jpeg|svg)($|\?)/,
                loaders: ["url?limit=5000&hash=sha512&digest=hex&size=16&name=resources/[name]-[hash].[ext]"]
            },
            {
                test: /\.(woff|woff2|eot|ttf)($|\?)/,
                loaders: ["url?limit=5000&hash=sha512&digest=hex&size=16&name=resources/[name]-[hash].[ext]"]
            }
        ]
    },

    plugins: [
        // TODO vendor bundle file is empty right now, so we copy vendor files directly to dist dir
        //new webpack.optimize.OccurenceOrderPlugin(true),
        //new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.bundle.js", minChunks: Infinity}),

        // static assets
        new CopyWebpackPlugin([
            {from: "node_modules/react/dist/react-with-addons.js", to: "react-with-addons.js"},
            {from: "node_modules/react-dom/dist/react-dom.js", to: "react-dom.js"}
        ]),

        new HtmlWebpackPlugin({
            template: "src/index.html",
            filename: "index.html"
        })
    ],

    // our Webpack Development Server config
    devServer: {
        port: METADATA.port,
        host: METADATA.host,
        historyApiFallback: true,
        watchOptions: {aggregateTimeout: 300, poll: 1000}
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};

module.exports = config;