var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var ENTRY_PATH = path.resolve(ROOT_PATH, 'src/js/index');
var TEMPLATE_PATH = path.resolve(ROOT_PATH, 'src/index.html');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

const PORT = 8080;

var config = {
    entry: ENTRY_PATH,
    plugins: [
        new CopyWebpackPlugin([
            {
                from: './src/images',
                to: './images'
            }
        ]),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: TEMPLATE_PATH
        }),
        new OpenBrowserPlugin({
            url: `http://localhost:${PORT}/`
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.glsl']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015']
                }
            },
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.png$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=images/[name].[ext]'
            }
        ]
    }
};

module.exports = config;
