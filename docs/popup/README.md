# Popup

Компонент popup'а.

```javascript
import Popup from 'arui-feather/popup';
```




## Props


| Prop  | Тип  | По умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| className | Function\|String |  |  | Дополнительный класс |
| children | Array.<Node>\|Node |  |  | Дочерние элементы `Popup` |
| type | [TypeEnum](#TypeEnum) |  |  | Тип попапа |
| height | [HeightEnum](#HeightEnum) |  |  | Подстраивание высоты попапа под край окна ('adaptive'), занятие попапом всей возможной высоты ('available'), 'default' |
| directions | Array.<[DirectionsEnum](#DirectionsEnum)> |  |  | Только для target='anchor', расположение (в порядке приоритета) относительно точки открытия. Первым указывается главное направление, через дефис - второстепенное направление |
| target | [TargetEnum](#TargetEnum) | `'anchor'`  |  | Привязка компонента к другому элементу на странице, или его расположение независимо от остальных: 'anchor', 'position' |
| mainOffset | Number |  |  | Только для target='anchor'. Смещение в пикселях всплывающего окна относительно основного направления |
| secondaryOffset | Number | `0`  |  | Только для target='anchor'. Смещение в пикселях всплывающего окна относительно второстепенного направления |
| fitContaiterOffset | Number | `0`  |  | Только для target='anchor'. Минимально допустимое смещение в пикселях всплывающего окна от края его контейнера |
| invalid | Boolean | `false`  |  | Отображение попапа как сообщения об ошибке |
| visible | Boolean | `false`  |  | Управление видимостью компонента |
| autoclosable | Boolean | `false`  |  | Управление возможностью автозакрытия компонента |
| padded | Boolean | `true`  |  | Управление выставлением модификатора для добавления внутренних отступов в стилях |
| size | [SizeEnum](#SizeEnum) | `'s'`  |  | Размер компонента |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| onMouseEnter | Function |  |  | Обработчик события наведения курсора на попап |
| onMouseLeave | Function |  |  | Обработчик события снятия курсора с попапа |
| onClickOutside | Function |  |  | Обработчик клика вне компонента |
| minWidth | Number |  |  | Минимальная ширина попапа |
| maxWidth | Number |  |  | Максимальная ширина попапа |
| for | String |  |  | Указатель на родительский элемент |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| setTarget(target: HTMLElement) | Задает элемент, к которому будет привязан popup. |
| setPosition(left: Number, top: Number) | Задает положение popup. |
| getInnerNode(): HTMLElement | Возвращает внутренний DOM узел. |





## Типы






### <a id="TypeEnum"></a>TypeEnum

 * `'default'`
 * `'tooltip'`


### <a id="HeightEnum"></a>HeightEnum

 * `'default'`
 * `'available'`
 * `'adaptive'`


### <a id="DirectionsEnum"></a>DirectionsEnum

 * `'anchor'`
 * `'top-left'`
 * `'top-center'`
 * `'top-right'`
 * `'left-top'`
 * `'left-center'`
 * `'left-bottom'`
 * `'right-top'`
 * `'right-center'`
 * `'right-bottom'`
 * `'bottom-left'`
 * `'bottom-center'`
 * `'bottom-right'`


### <a id="TargetEnum"></a>TargetEnum

 * `'anchor'`
 * `'position'`


### <a id="SizeEnum"></a>SizeEnum

 * `'s'`
 * `'m'`
 * `'l'`
 * `'xl'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



