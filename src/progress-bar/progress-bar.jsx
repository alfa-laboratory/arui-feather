import React from 'react';
import Type from 'prop-types';
import { createCn } from 'bem-react-classname';

/**
 * Компонент прогресс-бара.
 */
class ProgressBar extends React.PureComponent {
    cn = createCn('progress-bar');
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

    render() {
        const styles = { width: `${this.props.percent}%` };

        return (
            <div
                className={ this.cn({ size: this.props.size }) }
                data-test-id={ this.props['data-test-id'] }
            >
                <div
                    style={ styles }
                    className={ this.cn('current-value') }
                />
            </div>
        );
    }
}

export default ProgressBar;
