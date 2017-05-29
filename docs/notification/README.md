# Notification

Компонент всплывающего окна.

```javascript
import Notification from 'arui-feather/notification';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| status | [StatusEnum](#StatusEnum) |  |  | Тип компонента |
| visible | Boolean |  |  | Управление видимостью компонента |
| offset | Number | `0`  |  | Отступ от верхнего края |
| stickTo | [StickToEnum](#StickToEnum) | `'left'`  |  | К какому краю прижат попап |
| hasCloser | Boolean | `true`  |  | Управляет отображением кнопки закрытия уведомления |
| children | Array.<Node>\|Node |  |  | Дочерние элементы `Notification` |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |
| title | Node |  |  | Заголовок сообщения |
| icon | Node |  |  | Замена стандартной иконки |
| autoCloseDelay | Number | `5000`  |  | Время до закрытия компонента |
| outsideClickClosable | Boolean |  |  | Управление возможностью закрытия компонента по клику вне его |
| onCloseTimeout | Function |  |  | Обработчик события истечения времени до закрытия компонента |
| onCloserClick | Function |  |  | Обработчик клика по крестику компонента |
| onMouseEnter | Function |  |  | Обработчик события наведения курсора на попап |
| onMouseLeave | Function |  |  | Обработчик события снятия курсора с попапа |
| onClickOutside | Function |  |  | Обработчик клика вне компонента |
| onClick | Function |  |  | Обработчик клика по компоненту |







## Типы






### <a id="StatusEnum"></a>StatusEnum

 * `'error'`
 * `'fail'`
 * `'ok'`


### <a id="StickToEnum"></a>StickToEnum

 * `'left'`
 * `'right'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



