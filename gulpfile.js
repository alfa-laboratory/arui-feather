const createTasks = require('library-utils/gulp-tasks');

createTasks('arui-feather', {
    componentsGlob: [
        'src/**/*.jsx',
        '!src/*/*-test.jsx',
        '!src/*/*-benchmark.jsx'
    ],
    resourcesGlob: ['src/**/*.{png,gif,jpg,svg,ttf,woff,json,d.ts}']
});
