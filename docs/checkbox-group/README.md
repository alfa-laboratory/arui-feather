# CheckboxGroup

Компонент группы чекбоксов.

```javascript
import CheckboxGroup from 'arui-feather/checkbox-group';
```

## Примеры


```
import 'CheckBox' from 'arui-feather/src/checkbox/checkbox';
import 'CheckBoxGroup' from 'arui-feather/src/checkbox-group/checkbox-group';

// Вертикальная группа чекбоксов
<CheckBoxGroup>
   <CheckBox text="Раз" />
   <CheckBox text="Два" />
   <CheckBox text="Три" />
</CheckBoxGroup>

// Горизонтальная группа чекбоксов, состоящая из обычных кнопок
<CheckBoxGroup type="button">
   <CheckBox type="button" text="Раз" />
   <CheckBox type="button" text="Два" />
   <CheckBox type="button" text="Три" />
</CheckBoxGroup>

// Горизонтальная группа чекбоксов
<CheckBoxGroup type="line">
   <CheckBox text="Раз" />
   <CheckBox text="Два" />
   <CheckBox text="Три" />
</CheckBoxGroup>
```



## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| type | Type.oneOf(['normal', 'button', 'line']) |  |  | Тип компонента |
| children | Type.oneOfType([Type.arrayOf(Type.node), Type.node]) |  |  | Дочерние элементы `CheckBoxGroup`, как правило, компоненты `CheckBox` |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |











