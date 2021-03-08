const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './index.jsx',
    devServer: {
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.jsx/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: './index.html',
        })
    ]
}