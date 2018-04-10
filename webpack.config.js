const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'js/bundle.js':
            [
                './assets/js/carousel.js',
                './assets/js/nav.js',
                './assets/js/navInput.js',
                './assets/js/modalPlugin.js',
                './assets/js/main.js',
                './assets/js/gallery.js',
                './assets/js/removableCarousel.js',
                './assets/js/testimonialsCarousel.js',
                './assets/js/textEditability.js'
            ]
    },
    output: {
        path: __dirname + '/public/',
        filename: "[name]"
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["es2015"]
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: "file-loader",
                query: {
                    name: '[name].[ext]',
                    outputPath: '/images/'
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: "url-loader",
                query: {
                    limit: '10000',
                    name: '[name].[ext]',
                    outputPath: '/fonts/'
                }
            },
            {
                test:/\.less$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use: [{
                      loader: "css-loader", options: { minimize: true }
                    }, {
                      loader: "less-loader"
                    }]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({filename:'/styles/style.css'}),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            'window.$': 'jquery'
        })
    ]
};
