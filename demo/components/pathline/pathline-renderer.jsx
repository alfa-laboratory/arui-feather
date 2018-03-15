import { PureComponent } from 'react';
import Type from 'prop-types';
import copy from 'clipboard-copy';
import MdContentCopy from 'react-icons/lib/md/content-copy';

import IconButton from '../../../src/icon-button';

import cn from '../../../src/cn';

@cn('pathline')
class PathlineRenderer extends PureComponent {
    render(cn) {
        return (
            <div className={ cn() }>
                { this.props.children }
                <IconButton
                    size='s'
                    className={ cn('copy-button') }
                    title='Copy to clipboard'
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
