# Amount

Компонент для отображения суммы.

```javascript
import Amount from 'arui-feather/amount';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| amount | Type.shape({ /** Абсолютное значение суммы */ value: Type.number, /** Валюта */ currency: Type.shape({ /** Международный код валюты */ code: Type.string, /** Количество минорных единиц валюты */ minority: Type.number }) }).isRequired |  |  |  |
| showZeroMinorPart | Type.bool | `true`  |  | Отображение минорной части, если она нулевая |
| size | Type.oneOf(['s', 'm', 'l', 'xl']) | `'m'`  |  | Размер компонента |
| isHeading | Type.bool | `false`  |  | Использовать компонент `Heading` для вывода числа |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |











