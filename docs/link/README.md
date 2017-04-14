# Link

Компонент ссылки.

```javascript
import Link from 'arui-feather/link';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| icon | Node |  |  | Иконка ссылки |
| text | Node |  |  | Текст ссылки |
| url | String | `'#'`  |  | href ссылки |
| target | [TargetEnum](#TargetEnum) |  |  | target ссылки |
| tabIndex | Number | `0`  |  | Последовательность перехода между контролами при нажатии на Tab |
| disabled | Boolean | `false`  |  | Управление возможностью клика по ссылке |
| checked | Boolean | `false`  |  | Управление состоянием ссылки выбран/не выбран |
| pseudo | Boolean | `false`  |  | Псевдо-ссылка (border-bottom: dotted) |
| size | [SizeEnum](#SizeEnum) | `'m'`  |  | Размер компонента |
| children | Array.<Node>\|Node |  |  | Дочерние элементы `Link` |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |
| onClick | Function |  |  | Обработчик клика но ссылке |
| onFocus | Function |  |  | Обработчик фокуса компонента |
| onBlur | Function |  |  | Обработчик снятия фокуса компонента |
| onMouseEnter | Function |  |  | Обработчик события наведения курсора на ссылку |
| onMouseLeave | Function |  |  | Обработчик события снятия курсора с ссылки |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| getNode(): HTMLElement | Возвращает корневой `HTMLElement` компонента. |
| focus() | Ставит фокус на ссылку. |
| blur() | Убирает фокус с ссылки. |





## Типы






### <a id="TargetEnum"></a>TargetEnum

 * `'_self'`
 * `'_blank'`
 * `'_parent'`
 * `'_top'`


### <a id="SizeEnum"></a>SizeEnum

 * `'xs'`
 * `'s'`
 * `'m'`
 * `'l'`
 * `'xl'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



