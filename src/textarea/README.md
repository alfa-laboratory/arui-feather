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
        placeholder='Textarea autosize...'
        autosize={ true }
        value={ state.value }
        onChange={ handleChangeAsync }
    />
    <Message visible={ true } >
       {`current value in textarea: ${state.value}`}
    </Message>
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
        placeholder='Textarea autosize...'
        autosize={ true }
        defaultValue={ state.value }
        onChange={ handleChangeAsync }
    />
    <Message visible={ true }>
       {`current value in textarea: ${state.value}`}
    </Message>
</div>
```
