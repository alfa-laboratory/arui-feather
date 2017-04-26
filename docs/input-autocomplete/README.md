# InputAutocomplete

Компонент поля для ввода с автокомплитом.

```javascript
import InputAutocomplete from 'arui-feather/input-autocomplete';
```




## Props
Расширяет props [Input](../input)

| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| options | Array.<[OptionsType](#OptionsType)> | `[]`  |  | Список вариантов выбора |
| disabled | Boolean | `false`  |  | Управление возможностью изменения атрибута компонента, установка соответствующего класса-модификатора для оформления |
| opened | Boolean |  |  | Управление видимостью выпадающего списка |
| size | [SizeEnum](#SizeEnum) | `'m'`  |  | Размер компонента |
| width | [WidthEnum](#WidthEnum) | `'default'`  |  | Управление возможностью компонента занимать всю ширину родителя |
| onItemSelect | Function |  |  | Обработчик выбора пункта в выпадающем меню |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Устанавливает фокус на поле ввода. |
| blur() | Убирает фокус с поля ввода. |
| scrollTo() | Скроллит страницу до поля ввода. |





## Типы




### <a id="OptionsType"></a>OptionsType

| Prop  | Тип  | Описание |
| ----- | ---- |----------|
| type | [TypeEnum](#TypeEnum) | Тип списка вариантов |
| value | String | Уникальное значение, которое будет отправлено на сервер, если вариант выбран |
| description | Node | Отображение варианта |
| content | Array | Список вариантов, только для type='group' |







### <a id="TypeEnum"></a>TypeEnum

 * `'item'`
 * `'group'`


### <a id="SizeEnum"></a>SizeEnum

 * `'s'`
 * `'m'`
 * `'l'`
 * `'xl'`


### <a id="WidthEnum"></a>WidthEnum

 * `'default'`
 * `'available'`



