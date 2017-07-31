/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export function getPlayground(sections) {
    const evalInContext = sections[0].components[0].props
        .examples.filter(example => example.evalInContext)[0].evalInContext;
    const code = decodeURI(location.hash.replace('#playground/code=', ''));
    sections = [{
        components: [{
            name: 'PlayGround',
            hasExamples: true,
            props: {
                examples: [{
                    content: code,
                    type: 'code',
                    settings: {
                        showcode: true
                    },
                    evalInContext
                }],
                methods: []
            }
        }]
    }];
    return sections;
}

export function isPlayground(hash = window.location.hash) {
    return hash.indexOf('#playground/code=') !== -1;
}
