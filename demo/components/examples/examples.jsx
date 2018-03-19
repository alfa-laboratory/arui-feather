/* eslint react/forbid-prop-types: 0 */
/* eslint react/no-array-index-key: 0 */

import React from 'react';
import Type from 'prop-types';
import Playground from '../playground';
import Markdown from '../markdown';
import ExamplesRenderer from './examples-renderer';

export default function Examples({ examples, name }, { codeRevision }) {
    return (
        <ExamplesRenderer>
            { examples.map((example, index) => {
                switch (example.type) {
                    case 'code':
                        return (
                            <Playground
                                code={ example.content }
                                evalInContext={ example.evalInContext }
                                key={ `${codeRevision}/${index}` }
                                name={ name }
                                index={ index }
                                settings={ example.settings }
                            />
                        );
                    case 'markdown':
                        return <Markdown text={ example.content } key={ index } />;
                    default:
                        return null;
                }
            }) }
        </ExamplesRenderer>
    );
}
Examples.propTypes = {
    examples: Type.array.isRequired,
    name: Type.string.isRequired
};

Examples.contextTypes = {
    codeRevision: Type.number.isRequired
};
