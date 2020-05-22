import React from 'react';
import { DeepReadonly } from 'utility-types';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

export type ProgressBarProps = DeepReadonly<{

    /**
     * Прогресс в процентах
     */
    percent?: number;

    /**
     * Размер компонента
     */
    size?: 'm';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;

}>;

/**
 * Компонент прогресс-бара.
 */
export class ProgressBar extends React.PureComponent<ProgressBarProps> {
    protected cn = createCn('progress-bar');

    static defaultProps: Partial<ProgressBarProps> = {
        percent: 0,
        size: 'm',
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

class ThemedProgressBar extends ProgressBar {}
(ThemedProgressBar as any) = withTheme(ProgressBar);
export default ThemedProgressBar;
