import React from 'react';
import Type from 'prop-types';

import cn from '../cn';

/**
 * Компонент прогресс-бара.
 */
@cn('progress-bar')
class ProgressBar extends React.PureComponent {
    static propTypes = {
        /** Прогресс в процентах */
        percent: Type.number,
        /** Размер компонента */
        size: Type.oneOf(['m']),
        /** Дополнительный класс */
        className: Type.string
    };

    static defaultProps = {
        percent: 0,
        size: 'm'
    }

    render(cn) {
        const styles = { width: `${this.props.percent}%` };

        return (
            <div className={ cn({ size: this.props.size }) }>
                <div
                    style={ styles }
                    className={ cn('current-value') }
                />
            </div>
        );
    }
}

export default ProgressBar;
