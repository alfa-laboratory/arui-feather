# Page

Компонент страницы.
Как правило является корневым компонентов страницы.
Обычно используется совместно с компонентами `Header`, `Footer`
и компонентами `AppTitle`, `AppMenu` и `AppContent`.

```javascript
import Page from 'arui-feather/page';
```




## Props


| Prop  | Тип  | По умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| header | Node |  |  | Шапка страницы |
| children | Array.<Node>\|Node |  |  | Дочерние элементы `Page` |
| footer | Node |  |  | Футер страницы |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |







## Типы






### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



