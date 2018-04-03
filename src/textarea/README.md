```jsx
<Textarea placeholder='Введите назначение платежа' />
```

```jsx
<Textarea
    placeholder='Введите назначение платежа'
    error='Нужно указать назначение платежа'
/>
```

```jsx
<Textarea
    placeholder='Введите назначение платежа'
    autosize={ true }
/>
```

## Use as controlled
Данный пример эмулирует задержку обновления при хранении состояния поля в сторе приложения.
Можно заметить, что если начать печатать в середине textarea - курсор перескакивает в конец
```jsx
initialState = {
    value: 'Благотворительный взнос в фонд «Бедные дизайнеры»'
};
function handleChangeAsync(value) {
    setTimeout(() => {
        setState({ value });
    }, 200);
}
<div>
    <Textarea
        hint={ `Текущее значение в поле: ${state.value}` }
        placeholder='Введите назначение платежа'
        value={ state.value }
        onChange={ handleChangeAsync }
    />
</div>
```
Если вам не нужно модифицировать введенные пользователем данные -
используйте параметр defaultValue для того чтобы задать начальное значение
и синхронизируйте значение компонента с нужным хранилищем
```jsx
initialState = {
    value: 'Благотворительный взнос в фонд «Бедные дизайнеры»'
};
function handleChangeAsync(value) {
    setTimeout(() => {
        setState({ value });
    }, 200);
}
<div>
    <Textarea
        defaultValue={ state.value }
        hint={ `Текущее значение в поле: ${state.value}` }
        placeholder='Введите назначение платежа'
        onChange={ handleChangeAsync }
    />
</div>
```
