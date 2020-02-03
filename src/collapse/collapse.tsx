/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import IconArrowDown from '../icon/ui/arrow-down';
import IconArrowUp from '../icon/ui/arrow-up';
import Link from '../link/link';
import { ResizeSensor } from '../resize-sensor/resize-sensor';

export type CollapseProps = {
    /**
     * Управление `expanded` состоянием компонента
     * */
    isExpanded?: boolean;

    /**
     * Текст ссылки в `expanded` состоянии
     * */
    collapsedLabel?: string;

    /**
     * Текст ссылки в `collapsed` состоянии
     * */
    expandedLabel?: string;

    /**
     * Дочерние элементы `Collapse`
     */
    children?: ReadonlyArray<React.ReactNode> | React.ReactNode;

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Обработчик смены состояний `expanded/collapsed`
     */
    onExpandedChange?: (isExpanded?: boolean) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

/**
 * Компонент «подката» позволяет спрятать кусок текста за ссылку «Еще...».
 */
export class Collapse extends React.PureComponent<CollapseProps> {
    cn = createCn('collapse');

    static defaultProps: Partial<CollapseProps> = {
        expandedLabel: 'Collapse',
        collapsedLabel: 'Expand'
    };

    state = {
        isExpanded: false
    };

    content;
    contentCase;

    componentDidMount() {
        this.updateContentHeight();
    }

    componentDidUpdate() {
        this.updateContentHeight();
    }

    render() {
        let ToggledIcon;
        const expanded = this.props.isExpanded === undefined ? this.state.isExpanded : this.props.isExpanded;

        switch (expanded) {
            case true: ToggledIcon = IconArrowUp; break;
            case false: ToggledIcon = IconArrowDown; break;
        }

        return (
            <div
                className={ this.cn({
                    expanded
                }) }
                id={ this.props.id }
                data-test-id={ this.props['data-test-id'] }
            >
                <div
                    ref={ (content) => {
                        this.content = content;
                    } }
                    className={ this.cn('content') }
                >
                    <div ref={ (contentCase) => {
                        this.contentCase = contentCase;
                    } }
                    >
                        { this.props.children }
                    </div>
                    <ResizeSensor onResize={ this.updateContentHeight } />
                </div>
                <Link
                    className={ this.cn('link') }
                    pseudo={ true }
                    icon={
                        <ToggledIcon size='s' />
                    }
                    iconPosition='right'
                    onClick={ this.handleExpandedChange }
                    text={
                        expanded
                            ? this.props.expandedLabel
                            : this.props.collapsedLabel
                    }
                />
            </div>
        );
    }

    private handleExpandedChange = () => {
        const newExpandedValue = this.props.isExpanded === undefined ? !this.state.isExpanded : !this.props.isExpanded;

        this.setState({
            isExpanded: newExpandedValue
        });

        if (this.props.onExpandedChange) {
            this.props.onExpandedChange(newExpandedValue);
        }
    };

    private updateContentHeight = () => {
        const expanded = this.props.isExpanded === undefined ? this.state.isExpanded : this.props.isExpanded;

        let contentHeight;

        if (expanded) {
            contentHeight = this.contentCase.offsetHeight;
        } else {
            contentHeight = 0;
        }

        if (this.content) {
            this.content.style.height = `${contentHeight}px`;
        }
    }
}

export default withTheme(Collapse);
