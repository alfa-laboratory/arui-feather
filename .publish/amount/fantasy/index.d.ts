
import { Component, ReactNode } from 'react';

export type AmountAmountcurrencyFieldType = {

    /**
     * Международный код валюты
     */
    code?: string;

    /**
     * Количество минорных единиц валюты
     */
    minority?: number
};
export type AmountAmountFieldType = {

    /**
     * Абсолютное значение суммы
     */
    value?: number;

    /**
     * Валюта
     */
    currency?: AmountAmountcurrencyFieldType
};
export type AmountSizeFieldType = 's' | 'm' | 'l' | 'xl';
export type AmountThemeFieldType = 'alfa-on-color' | 'alfa-on-white';
export type AmountClassNameFieldType = Function | string;


export interface AmountProps {
    amount: AmountAmountFieldType;
    /**
     * Отображение минорной части, если она нулевая
     */
    showZeroMinorPart?: boolean;
    /**
     * Размер компонента
     */
    size?: AmountSizeFieldType;
    /**
     * Использовать компонент `Heading` для вывода числа
     */
    isHeading?: boolean;
    /**
     * Тема компонента
     */
    theme?: AmountThemeFieldType;
    /**
     * Дополнительный класс
     */
    className?: AmountClassNameFieldType;
}



/**
 * Компонент для отображения суммы.
 */

export default class Amount extends Component<AmountProps, any> {

}
