var isProduction = 'production' === process.env.NODE_ENV.trim(),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    extractSCSS = new ExtractTextPlugin({
        filename: "stylesheets/bundle-[name].css",
        disable: false,
        allChunks: true
    }),
    plugins = [
        new HtmlWebpackPlugin({
            filename: '../views/layout.twig',
            template: './src/html/layout.html',
            minify: {
                collapseWhitespace: true
            }
        }),
        extractSCSS
    ];

// if (!isProduction) {
//     plugins.push(new webpack.HotModuleReplacementPlugin());
// }

module.exports = {
    entry: './src/js/app.js',
    output: {
        path: __dirname + "/public",
        filename: 'javascripts/bundle.js',
        publicPath: "/"
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: extractSCSS.extract(['css-loader', 'sass-loader'])
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: plugins
};