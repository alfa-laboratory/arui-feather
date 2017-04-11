# Icon

Компонент иконки. Содержит в себе только неодходимые для компонентов иконки.
Все иконки доступны в двух цветовых темах `alfa-on-color` и `alfa-on-white`.

Для иконок `error` и `ок` также есть цветной вариант,
реализуемый темой `alfa-on-colored`.

```javascript
import Icon from 'arui-feather/icon';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| icon | Type.oneOf([ 'error', 'fail', 'ok', 'ok_filled', 'calendar', 'search', 'close', 'user' ]) |  |  | Тип иконки |
| size | Type.oneOf(['s', 'm', 'l', 'xl', 'xxl']) | `'m'`  |  | Размер компонента |
| children | Type.oneOfType([Type.arrayOf(Type.node), Type.node]) |  |  | Дочерние элементы `Icon` |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white', 'alfa-on-colored']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| onClick | Type.func |  |  | Обработчик клика по иконке |











