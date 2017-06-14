const createTasks = require('library-utils/gulp-tasks');

createTasks('arui-feather', {
    componentsGlob: [
        'src/*/*.jsx',
        'src/*/fantasy/index.js',
        'src/*/fantasy/*.jsx',
        '!src/*/*-test.jsx',
        '!src/*/*-benchmark.jsx'
    ]
});
