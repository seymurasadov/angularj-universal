const path = require('path');
const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {server: './server.ts'},
    resolve: {extensions: ['.js', '.ts']},
    target: 'node',
    externals: [/(node_modules|main\..*\.js)/],
    output: {
        path: path.join(__dirname, '../resources'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {test: /\.ts$/, loader: 'ts-loader'}
        ]
    },
    plugins: [
        // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
        // for "WARNING Critical dependency: the request of a dependency is an expression"
        new webpack.ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/,
            path.join(__dirname, 'src'), // location of your src
            {} // a map of your routes
        ),
        new webpack.ContextReplacementPlugin(
            /(.+)?express(\\|\/)(.+)?/,
            path.join(__dirname, 'src'),
            {}
        ),
        new UglifyJsPlugin({
            uglifyOptions: {
                ecma: 6,
                compress: false,
                mangle: false,
                comments: false
            }
        })
    ]
};
