/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import Editor from 'react-styleguidist/lib/rsg-components/Editor';
import Usage from 'react-styleguidist/lib/rsg-components/Usage';
import IsolateButton from 'react-styleguidist/lib/rsg-components/slots/IsolateButton';
import CodeTabButton from './code-tab-button';
import UsageTabButton from './usage-tab-button';

export const EXAMPLE_TAB_CODE_EDITOR = 'rsg-code-editor';
export const DOCS_TAB_USAGE = 'rsg-usage';

const toolbar = [IsolateButton];

export default {
    sectionToolbar: toolbar,
    componentToolbar: toolbar,

    examplesToolbar: toolbar,

    examplesTabButton: [
        {
            id: EXAMPLE_TAB_CODE_EDITOR,
            render: CodeTabButton
        }
    ],
    examplesTab: [
        {
            id: EXAMPLE_TAB_CODE_EDITOR,
            render: Editor
        }
    ],
    docsTabButton: [
        {
            id: DOCS_TAB_USAGE,
            render: UsageTabButton
        }
    ],
    docsTab: [
        {
            id: DOCS_TAB_USAGE,
            render: Usage
        }
    ],
    usageTabButton: [
        {
            id: EXAMPLE_TAB_CODE_EDITOR,
            render: CodeTabButton
        }
    ],
    usageTab: [
        {
            id: DOCS_TAB_USAGE,
            render: Usage
        }
    ]
};
