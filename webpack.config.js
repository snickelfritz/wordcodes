var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './js/app.js',
    output: {
        path: path.resolve(__dirname, 'public/build'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
