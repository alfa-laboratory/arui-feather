# MaskedInput

Компонент поля ввода с поддержкой масок.
Расширяет стандратный <input /> React-а.

```javascript
import MaskedInput from 'arui-feather/masked-input';
```




## Props


| Prop  | Тип  | По умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| mask | String |  | Да | Маска для поля ввода, использует формат https://github.com/insin/inputmask-core |
| formatCharacters | objectOf |  |  | Кастомные форматтеры символов маски, использует формат formatCharacters из `inputmask-core` |
| maxLength | Number |  |  | Максимальное число символов |
| onProcessInputEvent | Function |  |  | Обработчик, вызываемый перед началом ввода в поле |





## Публичные методы
| Метод  | Описание |
| ------ | -------- |
| focus() | Устанавливает фокус на поле ввода. |
| blur() | Снимает фокус с поля ввода. |
| getControl(): HTMLInputElement | Возвращает ссылку на HTMLElement инпута. |
| setMask(newMask: String, formatCharacters) | Синхронно обновляет маску на поле ввода. |









