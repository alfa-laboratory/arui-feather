# Dropdown

Компонент "выпадашка": ссылка или кнопка. По клику показывается Popup.

```javascript
import Dropdown from 'arui-feather/dropdown';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| switcherType | Type.oneOf(['link', 'button']) | `'link'`  |  | Тип компонента |
| switcherText | Type.node | `'Switcher'`  |  | Текст кнопки компонента |
| popupContent | Type.node |  |  | Компонент [Popup](../popup/) |
| popupProps | Type.shape({ className: Type.oneOfType([Type.func, Type.string]), type: Type.oneOf(['default', 'tooltip']), height: Type.oneOf(['default', 'available', 'adaptive']), directions: Type.arrayOf(Type.oneOf([ 'anchor', 'top-left', 'top-center', 'top-right', 'left-top', 'left-center', 'left-bottom', 'right-top', 'right-center', 'right-bottom', 'bottom-left', 'bottom-center', 'bottom-right' ])), target: Type.oneOf(['anchor', 'position']), mainOffset: Type.number, secondaryOffset: Type.number, fitContaiterOffset: Type.number, invalid: Type.bool, visible: Type.bool, autoclosable: Type.bool, padded: Type.bool, size: Type.oneOf(['s', 'm', 'l', 'xl']), theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']), onMouseEnter: Type.func, onMouseLeave: Type.func, onClickOutside: Type.func, minWidth: Type.number, maxWidth: Type.number }) |  |  | Свойства для компонента [Popup](../popup/) |
| mode | Type.oneOf(['hover', 'normal']) |  |  | Управление возможностью отображать попап при наведении курсора |
| disabled | Type.bool | `false`  |  | Управление возможностью открытия попапа |
| opened | Type.bool |  |  | Управление состоянием открыт/закрыт попапа |
| togglable | Type.oneOf(['button', 'check']) |  |  | Только для switcherType='button'. Тип переключателя для кнопки, 'check' |
| size | Type.oneOf(['s', 'm', 'l', 'xl']) | `'m'`  |  | Размер компонента |
| children | Type.oneOfType([Type.arrayOf(Type.node), Type.node]) |  |  | Дочерние элементы `Dropdown` |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| onSwitcherClick | Type.func |  |  | Обработчик клика по кнопке компонента |
| onSwitcherMouseEnter | Type.func |  |  | Обработчик события наведения курсора на кнопку компонента |
| onSwitcherMouseLeave | Type.func |  |  | Обработчик события снятия курсора с кнопки компонента |
| onPopupMouseEnter | Type.func |  |  | Обработчик события наведения курсора на попап |
| onPopupMouseLeave | Type.func |  |  | Обработчик события снятия курсора с попапа |
| onPopupClickOutside | Type.func |  |  | Обработчик события клика попапа за пределами попапа |











