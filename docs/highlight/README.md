# Highlight

Компонент подсветки текста. Используйте его, чтобы выделить текст на странице.
Текст необходимо передать в виде дочерних компонентов.

```javascript
import Highlight from 'arui-feather/highlight';
```

## Примеры


```javascript
Слоган <Highlight>«Найдётся всё»</Highlight> придумали в 2000 году.
```



## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| children | Array.<Node>\|Node |  |  | Дочерние элементы `Highlight` |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |







## Типы






### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



