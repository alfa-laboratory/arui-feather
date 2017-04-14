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
| children | Array.<Node>\|Node |  |  | Дочерние элементы `FormField` |
| label | Node |  |  | Заголовок для контрола |
| size | [SizeEnum](#SizeEnum) | `'m'`  |  | Размер компонента |
| view | String |  |  | Расположение элемента label: 'line' |
| theme | [ThemeEnum](#ThemeEnum) |  |  | Тема компонента |
| className | Function\|String |  |  | Дополнительный класс |







## Типы






### <a id="SizeEnum"></a>SizeEnum

 * `'s'`
 * `'m'`
 * `'l'`
 * `'xl'`


### <a id="ThemeEnum"></a>ThemeEnum

 * `'alfa-on-color'`
 * `'alfa-on-white'`



