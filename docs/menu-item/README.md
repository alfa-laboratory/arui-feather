# MenuItem

Компонент элемента меню. Как правило, используется совместно с `Menu`.

```javascript
import MenuItem from 'arui-feather/menu-item';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| type | [TypeEnum](#TypeEnum) | `'link'`  |  | Тип элемента меню |
| view | [ViewEnum](#ViewEnum) |  |  | Тип ссылки, для компонента с type='link' |
| url | String |  |  | href ссылки, для компонента с type='link' |
| target | [TargetEnum](#TargetEnum) |  |  | target для ссылки |
| value | String\|Number |  |  | Уникальное значение элемента. Для использования в Menu |
| popup | Node |  |  | Попап для компонента с type='dropdown' |
| disabled | Boolean |  |  | Управление возможностью выбирать данный компонент |
| checked | Boolean |  |  | Управление состоянием выбран/не выбран компонента |
| hidden | Boolean |  |  | Управление видимостью компонента |
| hovered | Boolean |  |  | Управление визуальным выделением компонента |
| size | [SizeEnum](#SizeEnum) |  |  | Размер компонента |
| children | Array.<Node>\|Node |  |  | Дочерние элементы `MenuItem` |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |
| onClick | Function |  |  | Только для type='link', обработчик клика по компоненту |
| onFocus | Function |  |  | Обработчик фокуса компонента |
| onBlur | Function |  |  | Обработчик снятия фокуса компонента |
| onMouseEnter | Function |  |  | Обработчик события наведения курсора на элемент меню |
| onMouseLeave | Function |  |  | Обработчик события снятия курсора с элемента меню |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| getNode(): HTMLElement | Возвращает корневой `HTMLElement` компонента. |
| focus() | Устанавливает фокус на элементе меню. |
| blur() | Убирает фокус с элемента меню. |





## Типы






### <a id="TypeEnum"></a>TypeEnum

 * `'link'`
 * `'dropdown'`
 * `'block'`


### <a id="ViewEnum"></a>ViewEnum

 * `'default'`
 * `'link'`
 * `'pseudo'`


### <a id="TargetEnum"></a>TargetEnum

 * `'_self'`
 * `'_blank'`
 * `'_parent'`
 * `'_top'`


### <a id="SizeEnum"></a>SizeEnum

 * `'s'`
 * `'m'`
 * `'l'`
 * `'xl'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



