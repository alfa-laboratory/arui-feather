# InputGroup

Компонент группы полей для текстового ввода.

```javascript
import InputGroup from 'arui-feather/input-group';
```

## Примеры


```
import 'Input' from 'arui-feather/input';
import 'InputGroup' from 'arui-feather/input-group';

// Группа полей для ввода
<InputGroup>
   <Input />
   <Input />
   <Input />
</InputGroup>

// Группа полей для ввода, растягивающаяся на всю ширину
<InputGroup width='available'>
   <Input />
   <Input />
   <Input />
</InputGroup>
```



## Props


| Prop  | Тип  | По умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| width | [WidthEnum](#WidthEnum) |  |  | Управление возможностью компонента занимать всю ширину родителя |
| children | Array.<Node>\|Node |  |  | Дочерние элементы `InputGroup`, как правило, компоненты `Input` |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |







## Типы






### <a id="WidthEnum"></a>WidthEnum

 * `'default'`
 * `'available'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



