/* eslint @typescript-eslint/no-var-requires: 0 */

const createTasks = require('library-utils/gulp-tasks');

createTasks('arui-feather', {
    resourcesGlob: ['src/**/*.{png,gif,jpg,svg,ttf,woff,json,d.ts}'],
    useComponentDts: true,
});
