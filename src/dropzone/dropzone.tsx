/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable max-len */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

export type DropzoneProps = {

    /**
     * Дочерние компоненты
     */
    children?: React.ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;

    /**
     * Уникальный идентификатор блока
     */
    id?: string;

    /**
     * Уникальное имя блока
     */
    name?: string;

    /**
     * Обработчик события 'drop'
     */
    onDrop?: (files?: any[]) => void;

    /**
     * Обработчик события 'dragover'
     */
    onDragOver?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик события 'dragleave'
     */
    onDragLeave?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик события 'dragenter'
     */
    onDragEnter?: (event?: React.FocusEvent<any>) => void;

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Текст-подсказка поверх drop-зоны
     */
    text?: string;

};

/**
 * Компонент drag-and-drop контейнер для прикрепления файлов.
 */
export class Dropzone extends React.PureComponent<DropzoneProps> {
    cn = createCn('dropzone');

    static defaultProps: Partial<DropzoneProps> = {
        theme: 'alfa-on-white',
        text: 'Поместите файлы сюда'
    };

    state = {
        dragging: false
    };

    root: HTMLSpanElement;

    dragCounter: number;

    private handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (this.props.onDragOver) {
            this.props.onDragOver(event);
        }
    }

    private handleDragEnter = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.dragCounter += 1;
        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
            this.setState({ dragging: true });
        }

        if (this.props.onDragEnter) {
            this.props.onDragEnter(event);
        }
    };

    private handleDragLeave = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.dragCounter -= 1;
        if (this.dragCounter > 0) {
            return;
        }
        this.setState({ dragging: false });

        if (this.props.onDragLeave) {
            this.props.onDragLeave(event);
        }
    };

    private handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.setState({ dragging: false });

        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            if (this.props.onDrop) {
                this.props.onDrop(event.dataTransfer.files);
            }

            event.dataTransfer.clearData();
            this.dragCounter = 0;
        }
    };

    componentDidMount() {
        this.dragCounter = 0;
    }

    render() {
        return (
            <div
                ref={ (root) => {
                    this.root = root;
                } }
                id={ this.props.id }
                data-test-id={ this.props['data-test-id'] }
                className={ this.cn() }
                onDragEnter={ this.handleDragEnter }
                onDragLeave={ this.handleDragLeave }
                onDragOver={ this.handleDragOver }
                onDrop={ this.handleDrop }
            >
                <div className={ this.cn('view', { active: this.state.dragging }) }>
                    { this.props.text }
                </div>
                { this.props.children }
            </div>
        );
    }
}

export default withTheme(Dropzone);
