/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');

const HOT_LOADER = !!process.env.HOT_LOADER;
const PORT = process.env.PORT ? process.env.PORT : 8080;
const HOST = process.env.HOST || 'localhost';

webpackConfig.entry = Object.keys(webpackConfig.entry).reduce((result, item) => {
    result[item] = [
        'webpack/hot/only-dev-server',
        `webpack-dev-server/client?http://${HOST}:${PORT}`
    ];
    if (HOT_LOADER) {
        result[item] = result[item].concat('react-hot-loader/patch');
    }
    result[item] = result[item].concat(webpackConfig.entry[item]);

    return result;
}, {});

if (HOT_LOADER) {
    webpackConfig.module.loaders
        .filter(loader => loader.loader === 'babel')
        .forEach((loader) => {
            if (loader.query && loader.query.plugins) {
                loader.query.plugins = ['react-hot-loader/babel'].concat(loader.query.plugins);
            }
        });
}

webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
    contentBase: webpackConfig.output.path,
    hot: true,
    quiet: false,
    noInfo: false,
    inline: true,
    lazy: false,
    filename: webpackConfig.output.filename,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    publicPath: '/',
    stats: {
        colors: true,
        assets: false,
        version: false,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false
    }
});

server.listen(PORT, HOST, function () {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://${HOST}:${PORT}/`);
});
