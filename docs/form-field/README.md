# FormField

Компонент поля формы: cодержит заголовок контрола и сам контрол.
Контрол должен быть передан дочерним компонентов.

```javascript
import FormField from 'arui-feather/form-field';
```

## Примеры


```javascript
import FormField from 'arui-feather/form-field';
import Input from 'arui-feather/input';

<FormField label="Текстовое поле">
    <Input />
</FormField>
```

Компонент может использоваться для отображения заголовков слева от блока.
Используется совместно с компонентом `AppContent`.

```javascript
import AppContent from 'arui-feather/src/app-content/app-content';
import FormField from 'arui-feather/src/form-field/form-field';
import Label from 'arui-feather/src/label/label';

<AppContent>
   <FormField view="line" label={ <Label>Заголовок блока</Label> }>
      Содержимое блока
   </FormField>
   <FormField view="line" label={ <Label>Заголовок блока</Label> }>
      Содержимое блока
   </FormField>
</AppContent>
```



## Props


| Prop  | Тип  | По-умолчанию | Обязательный | Описание |
| ----- | ---- | ------------ | ------------ |----------|
| children | Type.oneOfType([Type.arrayOf(Type.node), Type.node]) |  |  | Дочерние элементы `FormField` |
| label | Type.node |  |  | Заголовок для контрола |
| size | Type.oneOf(['s', 'm', 'l', 'xl']) | `'m'`  |  | Размер компонента |
| view | Type.string |  |  | Расположение элемента label: 'line' |
| theme | Type.oneOf(['alfa-on-color', 'alfa-on-white']) |  |  | Тема компонента |
| className | Type.oneOfType([Type.func, Type.string]) |  |  | Дополнительный класс |











