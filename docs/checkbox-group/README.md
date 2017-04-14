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
| type | [TypeEnum](#TypeEnum) |  |  | Тип компонента |
| children | Array.<Node>\|Node |  |  | Дочерние элементы `CheckBoxGroup`, как правило, компоненты `CheckBox` |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |







## Типы






### <a id="TypeEnum"></a>TypeEnum

 * `'normal'`
 * `'button'`
 * `'line'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



