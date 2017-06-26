# Dropdown

Компонент «выпадашка»: ссылка или кнопка. По клику показывается Popup.

```javascript
import Dropdown from 'arui-feather/dropdown';
```




## Props


| Prop  | Тип  | По умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| switcherType | [SwitcherTypeEnum](#SwitcherTypeEnum) | `'link'`  |  | Тип компонента |
| switcherText | Node | `'Switcher'`  |  | Текст кнопки компонента |
| popupContent | Node |  |  | Компонент [Popup](../popup/) |
| popupProps | [PopupPropsType](#PopupPropsType) |  |  | Свойства для компонента [Popup](../popup/) |
| mode | [ModeEnum](#ModeEnum) |  |  | Управление возможностью отображать попап при наведении курсора |
| disabled | Boolean | `false`  |  | Управление возможностью открытия попапа |
| opened | Boolean |  |  | Управление состоянием открыт/закрыт попапа |
| togglable | [TogglableEnum](#TogglableEnum) |  |  | Только для switcherType='button'. Тип переключателя для кнопки, 'check' |
| size | [SizeEnum](#SizeEnum) | `'m'`  |  | Размер компонента |
| children | Array.<Node>\|Node |  |  | Дочерние элементы `Dropdown` |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |
| onSwitcherClick | Function |  |  | Обработчик клика по кнопке компонента |
| onSwitcherMouseEnter | Function |  |  | Обработчик события наведения курсора на кнопку компонента |
| onSwitcherMouseLeave | Function |  |  | Обработчик события снятия курсора с кнопки компонента |
| onPopupMouseEnter | Function |  |  | Обработчик события наведения курсора на попап |
| onPopupMouseLeave | Function |  |  | Обработчик события снятия курсора с попапа |
| onPopupClickOutside | Function |  |  | Обработчик события клика попапа за пределами попапа |







## Типы




### <a id="PopupPropsType"></a>PopupPropsType

| Prop  | Тип  | Описание |
| ----- | ---- |----------|
| className | Function\|String |  |
| type | [TypeEnum](#TypeEnum) |  |
| height | [HeightEnum](#HeightEnum) |  |
| directions | Array.<[DirectionsEnum](#DirectionsEnum)> |  |
| target | [TargetEnum](#TargetEnum) |  |
| mainOffset | Number |  |
| secondaryOffset | Number |  |
| fitContaiterOffset | Number |  |
| invalid | Boolean |  |
| visible | Boolean |  |
| autoclosable | Boolean |  |
| padded | Boolean |  |
| size | [SizeEnum](#SizeEnum) |  |
| theme | [ThemeEnum](#ThemeEnum) |  |
| onMouseEnter | Function |  |
| onMouseLeave | Function |  |
| onClickOutside | Function |  |
| minWidth | Number |  |
| maxWidth | Number |  |







### <a id="SwitcherTypeEnum"></a>SwitcherTypeEnum

 * `'link'`
 * `'button'`


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


### <a id="ModeEnum"></a>ModeEnum

 * `'hover'`
 * `'normal'`


### <a id="TogglableEnum"></a>TogglableEnum

 * `'button'`
 * `'check'`


### <a id="SizeEnum"></a>SizeEnum

 * `'s'`
 * `'m'`
 * `'l'`
 * `'xl'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



