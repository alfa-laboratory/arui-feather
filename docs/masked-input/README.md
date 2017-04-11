# MaskedInput

Компонент поля ввода с поддержкой масок.
Расширяет стандратный <input /> React-а.

```javascript
import MaskedInput from 'arui-feather/masked-input';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| mask | Type.string.isRequired |  |  | Маска для поля ввода, использует формат https://github.com/insin/inputmask-core |
| formatCharacters | Type.objectOf( Type.shape({ validate: Type.func.isRequired, transform: Type.func }) ) |  |  | Кастомные форматтеры символов маски, использует формат formatCharacters из `inputmask-core` |
| maxLength | Type.number |  |  | Максимальное число символов |
| onProcessInputEvent | Type.func |  |  | Обработчик, вызываемый перед началом ввода в поле |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Устанавливает фокус на поле ввода. |
| blur() | Снимает фокус с поля ввода. |
| setMask(newMask: String, formatCharacters) | Синхронно обновляет маску на поле ввода. |









