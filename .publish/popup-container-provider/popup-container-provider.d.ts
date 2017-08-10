
import { Component, ReactNode } from 'react';

export type PopupContainerProviderChildrenFieldType = Array<ReactNode> | ReactNode;
export type PopupContainerProviderClassNameFieldType = Function | string;
export type PopupContainerProviderThemeFieldType = 'alfa-on-color' | 'alfa-on-white';


export interface PopupContainerProviderProps {

    /**
     * Дочерние элементы контейнера
     */
    children?: PopupContainerProviderChildrenFieldType;
    /**
     * Дополнительный класс
     */
    className?: PopupContainerProviderClassNameFieldType;
    /**
     * Объект со стилями
     */
    style?: any/* Не нашелся встроенный тип для типа {"name":"custom","raw":"styleType"}
                 * https://github.com/alfa-laboratory/library-utils/issues/new 
                 */;
    /**
     * Тема компонента
     */
    theme?: PopupContainerProviderThemeFieldType;
}



/**
 * Становится родительским элементом для всех дочерних блоков `Popup`.
Предполагается задавать этому элементу `position: fixed` в стилях.

@example
```javascript
import PopupContainerProvider from 'arui-feather/popup-container-provider';
import Popup from 'arui-feather/popup';
import Page from 'arui-feather/page';

<Page>
<PopupContainerProvider
    style={
        {
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '400px',
            overflow: 'auto'
        }
    }
>
    <Popup>
        Попап отрендерился в PopupContainerProvider, а не в body
        При скролле внутри блока, попап ездит вместе с остальным контентом.
    </Popup>
</PopupContainerProvider>
</Page>
```
 */

export default class PopupContainerProvider extends Component<PopupContainerProviderProps, any> {

}
