# List

Компонент списка.

```javascript
import List from 'arui-feather/list';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| items | Type.arrayOf(Type.shape({ /** Уникальный ключ элемента */ key: Type.string.isRequired, /** Содержание элемента */ value: Type.node.isRequired })) |  |  | Список элементов |
| type | Type.oneOf(['default', 'ordered']) |  |  | Тип списка |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |











