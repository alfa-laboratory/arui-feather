# PopupContainerProvider

Становится родительским элементом для всех дочерних блоков `Popup`.
Предполагается задавать этому элементу `position: fixed` в стилях.

```javascript
import PopupContainerProvider from 'arui-feather/popup-container-provider';
```

## Примеры


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



## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| children | Array.<Node>\|Node |  |  | Дочерние элементы контейнера |
| className | Function\|String |  |  | Дополнительный класс |
| style | CSSStyleDeclaration |  |  | Объект со стилями |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |







## Типы






### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



