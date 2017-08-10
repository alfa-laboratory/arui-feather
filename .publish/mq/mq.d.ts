
import { Component, ReactNode } from 'react';

export type MqChildrenFieldType = Array<ReactNode> | ReactNode;


export interface MqProps {

    /**
     * Медиа запрос
     */
    query?: string;
    /**
     * Запрос на поддержку тач-событий
     */
    touch?: boolean;
    /**
     * Дочерние элементы `Mq`
     */
    children?: MqChildrenFieldType;
    /**
     * Обработчик изменений в совпадении запросов
     */
    onMatchChange?: Function;
}



/**
 * Компонент, имплементирующий поддержку медиа запросов в шаблонах.
Рендерит внутренние компоненты/разметку исходя из соответствия условиям запроса.
Для `query` используется window.matchMedia с полифиллом для IE9.
Можно использовать кастомные запросы из `src/mq/mq.json`, например `--small`.
Пока браузеры не поддерживают CSS4 Media Queries, поддержка тач-событий определяется через `touch`.
 */

export default class Mq extends Component<MqProps, any> {

}
