import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент прогресс-бара.
 */
@cn('progress-bar')
@performance()
class ProgressBar extends React.Component {
    static propTypes = {
        /** Прогресс в процентах */
        percent: Type.number,
        /** Размер компонента */
        size: Type.oneOf(['m']),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    static defaultProps = {
        percent: 0,
        size: 'm'
    }

    render(cn) {
        const styles = { width: `${this.props.percent}%` };

        return (
            <div
                className={ cn({ size: this.props.size }) }
                data-test-id={ this.props['data-test-id'] }
            >
                <div
                    style={ styles }
                    className={ cn('current-value') }
                />
            </div>
        );
    }
}

export default ProgressBar;
