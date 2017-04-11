/* eslint import/no-extraneous-dependencies: 0 */

const MQ = require('./src/mq/mq.json');
const aruiConfig = require('arui-presets/postcss');

module.exports = aruiConfig(MQ);
