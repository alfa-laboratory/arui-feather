/* eslint import/no-extraneous-dependencies: 0 */

import { Component } from 'react';
import Type from 'prop-types';
import copy from 'clipboard-copy'; // Via react-styleguidist package
import MdContentCopy from 'react-icons/lib/md/content-copy'; // Via react-styleguidist package

import IconButton from '../../../src/icon-button';

import cn from '../../../src/cn';

@cn('pathline')
class PathlineRenderer extends Component {
    render(cn) {
        return (
            <div className={ cn() }>
                { this.props.children }
                <IconButton
                    size='s'
                    className={ cn('copy-button') }
                    title='Скопировать в буфер'
                    onClick={ () => copy(this.props.children) }
                >
                    <MdContentCopy />
                </IconButton>
            </div>
        );
    }
}

PathlineRenderer.propTypes = {
    children: Type.node
};

export default PathlineRenderer;
