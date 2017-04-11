import React from 'react';
import Type from 'prop-types';

import cn from '../src/cn';
import './demo-section.css';

@cn('demo-section')
class DemoSection extends React.Component {
    static propTypes = {
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node])
    };

    render(cn) {
        return (
            <div className={ cn }>{ this.props.children }</div>
        );
    }
}

export default DemoSection;
