/*
 * Copyright 2015 Network New Technologies Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var host = "localhost";
var port = "8001";
var publicPath = "http://" + host + ":" + port + "/";

var outputPath = "/var/www/html/";

module.exports = {
    entry: {
        app: ['./app/app.js'],
        vendors: ['react',
            'react-router',
            'jquery',
            'flux',
            'http-proxy',
            'marked',
            'path',
            'superagent',
            'underscore',
            'jwt-decode',
            'object-assign',
            'material-ui']
    },
    output: {
        filename: outputPath + 'bundle.js',
        publicPath: publicPath
    },
    module: {

        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: [nodeModulesPath]
            },
            {
                test: /\.css$/,
                loaders: [
                    "style-loader",
                    "css-loader",
                    "autoprefixer-loader?browsers=last 2 versions"
                ]
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader?browsers=last 2 versions!sass-loader?indentedSyntax=sass&includePaths[]=" + path.resolve(__dirname, "/app/assets/stylesheets"))
            },
            {test: /\.less$/, loader: "style!css!less"},

            {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendors", outputPath + "vendor.bundle.js"),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin(outputPath + 'style.css', {
            allChunks: true
        })
    ],

    devServer: {
        port: port,
        publicPath: publicPath,
        historyApiFallback: true
    }
};
