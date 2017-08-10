
import { Component, ReactNode } from 'react';




export interface IsolatedContainerProps {

}



/**
 * Изолирует своих детей от изменений `props`-ов, и `context`-а.
Используется для визуализации элементов в кастомных контейнерах,
о которых React не должен ничего знать.
 */

export default class IsolatedContainer extends Component<IsolatedContainerProps, any> {

    /**
     * Возвращает корневой `HTMLElement` компонента.
     */
    getNode(): any;
}
