# Popup

Компонент popup'а.

```javascript
import Popup from 'arui-feather/popup';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| children | Type.oneOfType([Type.arrayOf(Type.node), Type.node]) |  |  | Дочерние элементы `Popup` |
| type | Type.oneOf(['default', 'tooltip']) |  |  | Тип попапа |
| height | Type.oneOf(['default', 'available', 'adaptive']) |  |  | Подстраивание высоты попапа под край окна ('adaptive'), занятие попапом всей возможной высоты ('available'), 'default' |
| directions | Type.arrayOf(Type.oneOf([ 'anchor', 'top-left', 'top-center', 'top-right', 'left-top', 'left-center', 'left-bottom', 'right-top', 'right-center', 'right-bottom', 'bottom-left', 'bottom-center', 'bottom-right' ])) |  |  | Только для target='anchor', расположение (в порядке приоритета) относительно точки открытия. Первым указывается главное направление, через дефис - второстепенное направление |
| target | Type.oneOf(['anchor', 'position']) | `'anchor'`  |  | Привязка компонента к другому элементу на странице, или его расположение независимо от остальных: 'anchor', 'position' |
| mainOffset | Type.number |  |  | Только для target='anchor'. Смещение в пикселях всплывающего окна относительно основного направления |
| secondaryOffset | Type.number | `0`  |  | Только для target='anchor'. Смещение в пикселях всплывающего окна относительно второстепенного направления |
| fitContaiterOffset | Type.number | `0`  |  | Только для target='anchor'. Минимально допустимое смещение в пикселях всплывающего окна от края его контейнера |
| invalid | Type.bool | `false`  |  | Отображение попапа как сообщения об ошибке |
| visible | Type.bool | `false`  |  | Управление видимостью компонента |
| autoclosable | Type.bool | `false`  |  | Управление возможностью автозакрытия компонента |
| padded | Type.bool | `true`  |  | Управление выставлением модификатора для добавления внутренних отступов в стилях |
| size | Type.oneOf(['s', 'm', 'l', 'xl']) | `'s'`  |  | Размер компонента |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| onMouseEnter | Type.func |  |  | Обработчик события наведения курсора на попап |
| onMouseLeave | Type.func |  |  | Обработчик события снятия курсора с попапа |
| onClickOutside | Type.func |  |  | Обработчик клика вне компонента |
| minWidth | Type.number |  |  | Минимальная ширина попапа |
| maxWidth | Type.number |  |  | Максимальная ширина попапа |
| for | Type.string |  |  | Указатель на родительский элемент |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| setTarget(target: HTMLElement) | Задает элемент, к которому будет привязан popup. |
| setPosition(left: Number, top: Number) | Задает положение popup. |
| getInnerNode(): HTMLElement | Возвращает внутренний DOM узел. |









