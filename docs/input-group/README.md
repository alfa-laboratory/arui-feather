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


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| width | Type.oneOf(['default', 'available']) |  |  | Управление возможностью компонента занимать всю ширину родителя |
| children | Type.oneOfType([Type.arrayOf(Type.node), Type.node]) |  |  | Дочерние элементы `InputGroup`, как правило, компоненты `Input` |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |











