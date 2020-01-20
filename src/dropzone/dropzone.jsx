/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable max-len */

import React from 'react';
import Type from 'prop-types';
import { createCn } from 'bem-react-classname';

/**
 * Компонент drag-and-drop контейнер для прикрепления файлов.
 */
class Dropzone extends React.PureComponent {
    cn = createCn('dropzone');
    static propTypes = {
        /** Дочерние компоненты */
        children: Type.node,

        /** Дополнительный класс */
        className: Type.string,

        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string,

        /** Уникальный идентификатор блока */
        id: Type.string,

        /** Уникальное имя блока */
        name: Type.string,

        /**
         * Обработчик события 'drop'
         * @param {Array} files
         */
        onDrop: Type.func,

        /**
         * Обработчик события 'dragover'
         * @param {React.FocusEvent} event
         */
        onDragOver: Type.func,

        /**
         * Обработчик события 'dragleave'
         * @param {React.FocusEvent} event
         */
        onDragLeave: Type.func,

        /**
         * Обработчик события 'dragenter'
         * @param {React.FocusEvent} event
         */
        onDragEnter: Type.func,

        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),

        /** Текст-подсказка поверх drop-зоны */
        text: Type.string
    }

    static defaultProps = {
        theme: 'alfa-on-white',
        text: 'Поместите файлы сюда'
    };

    state = {
        dragging: false
    };

    /**
     * @type {HTMLSpanElement}
     */
    root;

    /**
     * @type {Number}
     */
    dragCounter;

    handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (this.props.onDragOver) {
            this.props.onDragOver(event);
        }
    }

    handleDragEnter = (event) => {
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

    handleDragLeave = (event) => {
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

    handleDrop = (event) => {
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
                name={ this.props.name }
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

export default Dropzone;
