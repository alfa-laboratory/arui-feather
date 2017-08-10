
import { Component, ReactNode } from 'react';

export type RenderInContainerChildrenFieldType = Array<ReactNode> | ReactNode;
export type RenderInContainerClassNameFieldType = Function | string;


export interface RenderInContainerProps {

    /**
     * Дочерние элементы контейнера
     */
    children?: RenderInContainerChildrenFieldType;
    /**
     * Дополнительный класс
     */
    className?: RenderInContainerClassNameFieldType;
    /**
     * Контейнер, в котором будет визуализирован компонент
     */
    container?: any/* Не нашелся встроенный тип для типа {"name":"custom","raw":"HtmlElement"}
                 * https://github.com/alfa-laboratory/library-utils/issues/new 
                 */;
    /**
     * Callback на рендер компонента
     */
    onRender?: Function;
}



/**
 * Компонент, позволяющий визуализировать другие компоненты в произвольном контейнере.
 */

export default class RenderInContainer extends Component<RenderInContainerProps, any> {

    /**
     * Возвращает HTMLElement враппера компонента.
     */
    getNode(): any;
    /**
     * Возвращает HTMLElement контейнера, в который отрендерился компонент.
     */
    getContainer(): any;
}
