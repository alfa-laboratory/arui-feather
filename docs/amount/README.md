# Amount

Компонент для отображения суммы.

```javascript
import Amount from 'arui-feather/amount';
```




## Props


| Prop  | Тип  | По умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| amount | [AmountType](#AmountType) |  | Да |  |
| showZeroMinorPart | Boolean | `true`  |  | Отображение минорной части, если она нулевая |
| size | [SizeEnum](#SizeEnum) | `'m'`  |  | Размер компонента |
| isHeading | Boolean | `false`  |  | Использовать компонент `Heading` для вывода числа |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |







## Типы




### <a id="AmountType"></a>AmountType

| Prop  | Тип  | Описание |
| ----- | ---- |----------|
| value | Number | Абсолютное значение суммы |
| currency | [CurrencyType](#CurrencyType) | Валюта |


### <a id="CurrencyType"></a>CurrencyType

| Prop  | Тип  | Описание |
| ----- | ---- |----------|
| code | String | Международный код валюты |
| minority | Number | Количество минорных единиц валюты |







### <a id="SizeEnum"></a>SizeEnum

 * `'s'`
 * `'m'`
 * `'l'`
 * `'xl'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



