# Icon

Компонент иконки. Содержит в себе только неодходимые для компонентов иконки.
Все иконки доступны в двух цветовых темах `alfa-on-color` и `alfa-on-white`.

Для иконок `error` и `ок` также есть цветной вариант,
реализуемый темой `alfa-on-colored`.

```javascript
import Icon from 'arui-feather/icon';
```




## Props


| Prop  | Тип  | По умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| icon | [IconEnum](#IconEnum) |  |  | Тип иконки |
| size | [SizeEnum](#SizeEnum) | `'m'`  |  | Размер компонента |
| children | Array.<Node>\|Node |  |  | Дочерние элементы `Icon` |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |
| onClick | Function |  |  | Обработчик клика по иконке |







## Типы






### <a id="IconEnum"></a>IconEnum

 * `'error'`
 * `'fail'`
 * `'ok'`
 * `'ok_filled'`
 * `'calendar'`
 * `'search'`
 * `'close'`
 * `'user'`


### <a id="SizeEnum"></a>SizeEnum

 * `'s'`
 * `'m'`
 * `'l'`
 * `'xl'`
 * `'xxl'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`
 * `'alfa-on-colored'`



