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
    exampleToolbar: toolbar,
    exampleTabButtons: [
        {
            id: EXAMPLE_TAB_CODE_EDITOR,
            render: CodeTabButton
        }
    ],
    exampleTabs: [
        {
            id: EXAMPLE_TAB_CODE_EDITOR,
            render: Editor
        }
    ],
    docsTabButtons: [
        {
            id: DOCS_TAB_USAGE,
            render: UsageTabButton
        }
    ],
    docsTabs: [
        {
            id: DOCS_TAB_USAGE,
            render: Usage
        }
    ]
};
