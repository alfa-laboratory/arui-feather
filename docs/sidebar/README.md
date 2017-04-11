# Sidebar

Компонент боковой панели aka холодильник.

```javascript
import Sidebar from 'arui-feather/sidebar';
```




## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |
| children | Type.oneOfType([Type.arrayOf(Type.node), Type.node]) |  |  | Дочерние компоненты |
| hasCloser | Type.bool | `true`  |  | Признак для отрисовки элемента закрытия |
| visible | Type.bool.isRequired |  |  | Признак появления холодильника |
| onCloserClick | Type.func |  |  | Обработчик клика на элемент закрытия |











