import React from 'react';
import Type from 'prop-types';

import ThemeProvider from '../src/theme-provider';
import cn from '../src/cn';

/**
 * Assistant component for testing suites.
 * Inverts the background, adds indents.
 */
@cn('test-box')
export class TestBox extends React.Component {
    static propTypes = {
        /** Child components */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),

        /** Component style */
        style: Type.object, // eslint-disable-line react/forbid-prop-types

        /** Component theme */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),

        /**
         * Width control. When set to 'available' stretches the element to
         * the width of the parent
         */
        width: Type.oneOf(['default', 'available'])
    };

    render(cn) {
        return (
            <div className={ cn({ width: this.props.width }) } style={ this.props.style }>
                <ThemeProvider theme={ this.props.theme }>{ this.props.children }</ThemeProvider>
            </div>
        );
    }
}
