
import { Component, ReactNode } from 'react';




export interface ResizeSensorProps {

    /**
     * Callback на изменение размера родителя
     */
    onResize?: Function;
}



/**
 * Компонент позволяющий слушать изменения размера родительского элемента.
Для использования разместите его в элементе об изменении размера, которого
вы хотите знать и добавьте внешний обработчик `onResize`.

Важно! Элемент, размер которого вы хотите измерять, должен обладать
css свойством `position: relative;`.
 */

export default class ResizeSensor extends Component<ResizeSensorProps, any> {

}
