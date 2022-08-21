const path = require('path');
const banner = require('../build_helper/licence');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

const nodeEnv = process.env.NODE_ENV;

console.log('building for', nodeEnv);

module.exports = {
    name: "mahal-util",
    mode: process.env.NODE_ENV || 'development',
    entry: "./src/index.ts",
    devtool: 'source-map',
    externals: {
        mahal: 'mahal'
    },
    output: {
        path: path.join(__dirname, "./../dist"),
        filename: nodeEnv === 'development' ? "mahal-util.js" : "mahal-util.min.js",
        library: 'mahalUtil',
        libraryTarget: "commonjs2"
    },

    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
                loader: 'ts-loader'
            }
        }]
    },
    resolve: {
        extensions: ['.ts'] // '' is needed to find modules like "jquery"
    },
    plugins: [
        new webpack.BannerPlugin(banner),
        new CopyPlugin({
            patterns: [
                { from: 'build_helper', to: '' },
            ],
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(nodeEnv),
        })
    ],
    externals: [nodeExternals()]
};