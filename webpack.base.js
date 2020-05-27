/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');

const QUERY = {
    name: '[name].[hash].[ext]',
};

module.exports = {
    resolve: {
        modules: [
            'node_modules',
            path.join(process.cwd(), 'node_modules'),
        ],
        extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                loader: require.resolve('ts-loader'),
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                },
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: require.resolve('file-loader'),
                options: { mimetype: 'application/font-woff', ...QUERY },
            },
            {
                test: /\.(ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: require.resolve('file-loader'),
                options: { mimetype: 'application/octet-stream', ...QUERY },
            },
            {
                test: /\.(eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: require.resolve('file-loader'),
            },
            {
                test: /\.(jpe?g)$/i,
                loader: require.resolve('file-loader'),
                options: { mimetype: 'image/jpeg', ...QUERY },
            },
            {
                test: /\.(gif)$/i,
                loader: require.resolve('file-loader'),
                options: { mimetype: 'image/gif', ...QUERY },
            },
            {
                test: /\.(png)$/i,
                loader: require.resolve('file-loader'),
                options: { mimetype: 'image/png', ...QUERY },
            },
            {
                test: /\.(svg)$/i,
                loader: require.resolve('file-loader'),
                options: { mimetype: 'image/svg+xml', ...QUERY },
            },
            {
                test: /\.css$/,
                use: [
                    require.resolve('style-loader'),
                    require.resolve('css-loader'),
                    require.resolve('postcss-loader'),
                ],
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.HOT_LOADER': process.env.HOT_LOADER,
        }),
    ],
};
