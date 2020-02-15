/** @type {import("webpack").WebpackOptions} */
const config = {
    mode: "development",
    entry: {
        clock: "./examples/clock/src",
        todo: "./examples/todo/src"
    },
    output: {
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                }
            }
        ]
    },
    resolve: {
        extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx"
        ]
    },
    devtool: "sourcemaps",
    optimization: {
        splitChunks: {
            chunks: 'initial',
            maxInitialRequests: 2,
            cacheGroups: {
                vendor: {                    
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/
                }
            }
        }
    },
    devServer: {
        contentBase: "./examples"
    }
};

module.exports = config;