/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

import Modernizr from '../modernizr';
import MqList from './mq.json';

const IS_BROWSER = typeof window !== 'undefined';
const SUPPORTS_TOUCH = IS_BROWSER && (Modernizr.pointerevents || Modernizr.touchevents);

let pool = {};
let refCounters = {};

function getMatchMedia(queryProp) {
    let query = MqList[queryProp] || queryProp;

    if (!pool[query]) {
        pool[query] = window.matchMedia(query);
        refCounters[query] = 1;
    } else {
        refCounters[query] += 1;
    }

    return pool[query];
}

function releaseMatchMedia(queryProp) {
    let query = MqList[queryProp] || queryProp;

    refCounters[query] -= 1;

    if (pool[query] && refCounters[query] === 0) {
        delete pool[query];
        delete refCounters[query];
    }
}

/**
 * Компонент, имплементирующий поддержку медиа запросов в шаблонах.
 * Рендерит внутренние компоненты/разметку исходя из соответствия условиям запроса.
 * Для `query` используется window.matchMedia с полифиллом для IE9.
 * Можно использовать кастомные запросы из `src/mq/mq.json`, например `--small`.
 * Пока браузеры не поддерживают CSS4 Media Queries, поддержка тач-событий определяется через `touch`.
 */
class Mq extends React.Component {
    static propTypes = {
        /** Медиа запрос */
        query: Type.string,
        /** Запрос на поддержку тач-событий */
        touch: Type.bool,
        /** Дочерние элементы `Mq` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Обработчик изменений в совпадении запросов */
        onMatchChange: Type.func
    };

    state = {
        isMatched: false
    };

    mql = null;

    componentDidMount() {
        this.mql = getMatchMedia(this.props.query);
        this.mql.addListener(this.handleMatch);
        this.handleMatch(this.mql);
    }

    componentWillUnmount() {
        releaseMatchMedia(this.props.query);
        this.mql.removeListener(this.handleMatch);
        this.mql = null;
    }

    render() {
        if (!this.props.children || !IS_BROWSER || !this.state.isMatched) return false;

        return this.props.children;
    }

    /**
     * @param {Object} [mql] MediaQueryList или MediaQueryListEvent
     */
    @autobind
    handleMatch(mql) {
        let queryPass = true;
        let touchPass = true;

        if (this.props.query) {
            queryPass = mql.matches;
        }
        if (this.props.touch) {
            touchPass = SUPPORTS_TOUCH;
        } else if (this.props.touch === false) {
            touchPass = !SUPPORTS_TOUCH;
        }

        this.setState({
            isMatched: (queryPass && touchPass)
        }, () => {
            if (this.props.onMatchChange) {
                this.props.onMatchChange(this.state.isMatched);
            }
        });
    }
}

export default Mq;
