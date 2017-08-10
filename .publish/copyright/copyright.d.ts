
import { Component, ReactNode } from 'react';

export type CopyrightChildrenFieldType = Array<ReactNode> | ReactNode;
export type CopyrightClassNameFieldType = Function | string;
export type CopyrightThemeFieldType = 'alfa-on-color' | 'alfa-on-white';


export interface CopyrightProps {

    /**
     * Дочерние элементы `Copyright`, заменяют собой стандартный текст copyright'а
     */
    children?: CopyrightChildrenFieldType;
    /**
     * Дополнительный класс
     */
    className?: CopyrightClassNameFieldType;
    /**
     * Отображение годов
     */
    showYears?: boolean;
    /**
     * Тема компонента
     */
    theme?: CopyrightThemeFieldType;
}



/**
 * Компонент копирайта: отображает данные о лицензии Альфа-Банка.
 */

export default class Copyright extends Component<CopyrightProps, any> {

}
