/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import IsolateButton from './isolate-button';

import CodeButton from './code-button';
import CodeView from './code-view';

import TabButton from './tab-button';

import ExamplesTab from './examples-tab';
import DocsTab from './docs-tab';
import RulesTab from './rules-tab';

// TODO @teryaew: rename rsg tab names
export const EXAMPLES_TAB = 'examples-view';
export const DOCS_TAB = 'docs-view';
export const RULES_TAB = 'rules-view';

export const CODE_VIEW = 'code-view';

const toolbar = [IsolateButton];

export default {
    sectionToolbar: toolbar,
    componentToolbar: toolbar,

    examplesToolbar: toolbar,

    codeButton: [
        {
            id: CODE_VIEW,
            render: CodeButton
        }
    ],
    codeView: [
        {
            id: CODE_VIEW,
            render: CodeView
        }
    ],

    examplesTabButton: [
        {
            id: EXAMPLES_TAB,
            render: TabButton,
            children: 'Примеры <span>и код</span>'
        }
    ],
    examplesTab: [
        {
            id: EXAMPLES_TAB,
            render: ExamplesTab
        }
    ],
    docsTabButton: [
        {
            id: DOCS_TAB,
            render: TabButton,
            children: 'Свойства <span>и методы</span>'
        }
    ],
    docsTab: [
        {
            id: DOCS_TAB,
            render: DocsTab
        }
    ],
    rulesTabButton: [
        {
            id: RULES_TAB,
            render: TabButton,
            children: 'Правила <span>использования</span>'
        }
    ],
    rulesTab: [
        {
            id: RULES_TAB,
            render: RulesTab
        }
    ]
};
