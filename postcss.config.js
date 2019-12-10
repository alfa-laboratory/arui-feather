/* eslint import/no-extraneous-dependencies: 0 */

const path = require('path');
const getConfig = require('arui-presets/postcss');
const MQ = require('./src/mq/mq.json');

module.exports = getConfig(MQ, [], (id) => {
    if (/^arui-feather/.test(id)) {
        id = path.join(__dirname, id.replace(/^arui-feather/, 'src'));
    }

    return id;
});
