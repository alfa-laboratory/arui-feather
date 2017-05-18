# List

Компонент списка.

```javascript
import List from 'arui-feather/list';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| items | Array.<[ItemsType](#ItemsType)> |  |  | Список элементов |
| type | [TypeEnum](#TypeEnum) |  |  | Тип списка |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |







## Типы




### <a id="ItemsType"></a>ItemsType

| Prop  | Тип  | Описание |
| ----- | ---- |----------|
| key | String | Уникальный ключ элемента |
| value | Node | Содержание элемента |







### <a id="TypeEnum"></a>TypeEnum

 * `'default'`
 * `'ordered'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



