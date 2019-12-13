/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @ts-nocheck

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

const buffer = require('vinyl-buffer');
const del = require('del');
const fs = require('fs');
const gm = require('gulp-gm');
const gulp = require('gulp');
const hbs = require('handlebars');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const merge = require('merge-stream');
const path = require('path');
const spritesmith = require('gulp.spritesmith');

const SIZES = ['s', 'm', 'l', 'xl'];
const DIMENSIONS = {
    s: [15, 12],
    m: [20, 15],
    l: [22, 17],
    xl: [24, 20]
};

const COMPONENT_DIR = './';
const SPRITES_IMG_DIR = './images/sprites';
const CHUNKS_IMG_DIR = './images/chunks';

function getImageHeightBySize(size, ratio = 1) {
    return {
        width: DIMENSIONS[size][0] * ratio,
        height: DIMENSIONS[size][1] * ratio
    };
}

function optimizeGmFile(file) {
    return file.noProfile().quality(60).colors(24);
}

gulp.task('clean:flag-icon', () => del(
    [`${COMPONENT_DIR}/flag-icon_size_*.css`, SPRITES_IMG_DIR, CHUNKS_IMG_DIR])
);

SIZES.forEach((size) => {
    const cssChunksTemplate = hbs.compile(fs.readFileSync(`${COMPONENT_DIR}/flag-icon.chunks.css.hbs`).toString());
    const cssChunksData = { size, chunks: [] };

    // Process 2-char country code files only (ignore subregions)
    gulp.task(`flag-icon:resize-${size}`, () => gulp.src('../../node_modules/region-flags/png/??.png')
        .pipe(rename((path) => {
            path.basename = path.basename.toLowerCase();
        }))
        // You need graphicsmagick installed on your system:
        // https://github.com/scalableminds/gulp-gm#graphicsmagick-or-imagemagick
        .pipe(gm((file => file.resize(
            getImageHeightBySize(size, 2).width,
            getImageHeightBySize(size, 2).height
        ))))
        .pipe(gm((file, done) => {
            // We need to run through new dimensions & resize with even numbers if it has odd ones
            // https://github.com/twolfson/gulp.spritesmith/issues/57
            // https://github.com/katapad/evenizer
            file.size((error, dimensions) => {
                const { width, height } = dimensions;

                if (error) {
                    throw error;
                }

                const east = width % 2 === 1 ? 1 : 0;
                const south = height % 2 === 1 ? 1 : 0;

                if (east || south) {
                    done(null, optimizeGmFile(file.resize(
                        width + east,
                        height + south,
                        '!' // Override aspect ratio
                    )));
                } else {
                    done(null, optimizeGmFile(file));
                }
            });
        }))
        .pipe(gulp.dest(`${CHUNKS_IMG_DIR}/${size}/2x`))
        .pipe(gm((file, done) => {
            file.size((error, dimensions) => {
                if (error) {
                    throw error;
                }

                done(null, optimizeGmFile(file.resize(
                    dimensions.width / 2,
                    dimensions.height / 2
                )));
            });
        }))
        // We need to save files on disk cause of spritesmith's retinaSrcFilter inability to read streams
        .pipe(gulp.dest(`${CHUNKS_IMG_DIR}/${size}/1x`))
    );

    gulp.task(`flag-icon:chunks-${size}`, [`flag-icon:resize-${size}`],
        () => gulp.src(`${CHUNKS_IMG_DIR}/${size}/1x/*.png`)
            .pipe(gm((file, done) => {
                file.size((error, dimensions) => {
                    if (error) {
                        throw error;
                    }

                    const url = file.source.split(/\/1x\//g);
                    const name = path.basename(file.source, path.extname(file.source));

                    cssChunksData.chunks.push({
                        width: `${dimensions.width}px`,
                        height: `${dimensions.height}px`,
                        name,
                        url: `${CHUNKS_IMG_DIR}/${size}/1x/${url[1]}`
                    });

                    done(null, file);
                });
            }))
            .on('end', () => {
                cssChunksData.retinaChunks = cssChunksData.chunks.map(item => ({
                    name: item.name,
                    url: item.url.replace('/1x/', '/2x/')
                }));

                fs.writeFileSync(
                    `${COMPONENT_DIR}/flag-icon_size_${size}.chunks.css`,
                    cssChunksTemplate(cssChunksData)
                );
            })
    );

    gulp.task(`flag-icon:sprite-${size}`, [`flag-icon:resize-${size}`], () => {
        const spriteData = gulp.src(`${CHUNKS_IMG_DIR}/${size}/**/*.png`)
            .pipe(spritesmith({
                cssName: `flag-icon_size_${size}.sprite.css`,
                imgName: `flag-icon_size_${size}@1x.png`,
                retinaImgName: `flag-icon_size_${size}@2x.png`,
                retinaSrcFilter: [`${CHUNKS_IMG_DIR}/${size}/2x/*.png`],
                cssTemplate: `${COMPONENT_DIR}/flag-icon.sprite.css.hbs`,
                cssOpts: { size },
                cssVarMap: (sprite) => {
                    sprite.selector = `.flag-icon_country_${sprite.name}`;

                    // https://github.com/twolfson/gulp.spritesmith/issues/124
                    if (sprite.source_image.indexOf('2x') !== -1) {
                        sprite.name += '-2x';
                    }
                }
            }));

        const imageStream = spriteData.img
            .pipe(buffer())
            .pipe(imagemin([
                imagemin.optipng({ optimizationLevel: 7 })
            ]))
            .pipe(gulp.dest(SPRITES_IMG_DIR));

        const cssStream = spriteData.css
            .pipe(gulp.dest(COMPONENT_DIR));

        return merge(imageStream, cssStream);
    });
});

gulp.task('default', ['clean:flag-icon']
    .concat(SIZES.map(size => `flag-icon:chunks-${size}`))
    .concat(SIZES.map(size => `flag-icon:sprite-${size}`))
);
