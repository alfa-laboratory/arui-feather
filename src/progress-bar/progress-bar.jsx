import { Component } from 'react';
import Type from 'prop-types';

import cn from '../cn';

/**
 * Компонент прогресс-бара.
 */
@cn('progress-bar')
class ProgressBar extends Component {
    static propTypes = {
        /** Прогресс в процентах */
        percent: Type.number,
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
    };

    render(cn) {
        const percent = this.props.percent;
        const styles = { width: `${percent}%` };

        return (
            <div className={ cn }>
                <div
                    style={ styles }
                    className={ cn('current-value') }
                    name={ 'progress-bar-current-value' }
                />
            </div>
        );
    }
}

export default ProgressBar;
