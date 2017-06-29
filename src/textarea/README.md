```
<Textarea placeholder='Textarea...' />
```

```
<Textarea
    placeholder='Textarea...'
    error='something went wrong'
/>
```

```
<Textarea
    placeholder='Textarea autosize...'
    autosize={ true }
/>
```

## Use as controlled
Данный пример эмулирует задержку обновления при хранении состояния поля в сторе приложения.
Можно заметить, что если начать печатать в середине textarea - курсор перескакивает в конец
```
initialState = {
    value: 'default'
};
function handleChangeAsync(value) {
    setTimeout(() => {
        setState({ value });
    }, 200);
}
<div>
    <Textarea
        hint={ `Current value in textarea: ${state.value}` }
        placeholder='Textarea...'
        value={ state.value }
        onChange={ handleChangeAsync }
    />
</div>
```
Если вам не нужно модифицировать введенные пользователем данные -
используйте параметр defaultValue для того чтобы задать начальное значение
и синхронизируйте значение компонента с нужным хранилищем
```
initialState = {
    value: 'default'
};
function handleChangeAsync(value) {
    setTimeout(() => {
        setState({ value });
    }, 200);
}
<div>
    <Textarea
        defaultValue={ state.value }
        hint={ `Current value in textarea: ${state.value}` }
        placeholder='Textarea...'
        onChange={ handleChangeAsync }
    />
</div>
```
