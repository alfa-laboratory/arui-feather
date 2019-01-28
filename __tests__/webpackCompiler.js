import webpack from 'webpack';
import fs from 'fs';
import merge from 'webpack-merge';
import { Union } from 'unionfs';
import MFS from 'memory-fs';

import WEBPACK_BASE_TEMPLATE from 'arui-presets/webpack.base';
import WEBPACK_DEV_TEMPLATE from 'arui-presets/webpack.development';

const mfs = new MFS();
const ufs = new Union();

export const compiler = webpack(
    merge.smart(WEBPACK_BASE_TEMPLATE, WEBPACK_DEV_TEMPLATE, {
        devtool: 'eval',
        entry: '/wubba/lubba/dub/dub.js',
        module: {
            rules: [
                // We need to transpile at least `gemini-react/lib/client-wrapper.js` for IE10
                {
                    test: /gemini-react\/lib\/client-wrapper\.js$/,
                    exclude: /node_modules\/(?!gemini-react\/).*/,
                    loader: 'babel-loader'
                }
            ]
        },
        plugins: [new webpack.EnvironmentPlugin(['ALL_SIZES'])]
    })
);

ufs.use(mfs).use(fs);
compiler.inputFileSystem = ufs;
compiler.outputFileSystem = mfs;

export const compileCode = () => {
    //
};
