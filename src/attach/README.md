```jsx
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div className='row' key={ size }>
            <div className='column'>
                <Attach size={ size } noFileText='' />
            </div>
            <div className='column'>
                <Attach size={ size } noFileText='' disabled={ true } />
            </div>
        </div>
    ))}
</div>
```

C Иконкой
```jsx
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div className='row' key={ size }>
            <Attach
                size={ size }
                buttonContent='Пожалуйста, выберите файл'
                noFileText=''
                buttonProps={ {
                    pseudo: true,
                    icon: <Icon size={ size } icon='search' />
                } }
            />
        </div>
    ))}
</div>
```

С изменяемым текстом
```jsx
function handleChange(value) {
    setState({ value });
}

<div>
    <div className='row'>
        <Attach
            size='s'
            noFileText=''
            buttonContent={ state.value ? 'Выберите другой файл' : 'Выберите файл' }
            onChange={ handleChange }
            value={ state.value }
        />
    </div>
</div>
```

С установлеными типами файлов, доступными для выбора
```jsx
function handleChange(value) {
    setState({ value });
}

<div>
    <div className='row'>
        <Attach
            accept='text/plain,'
            noFileText='.pdf, .xls'
            buttonContent={ 'Выберите файл' }
            size='s'
            onChange={ handleChange }
            value={ state.value }
        />
    </div>
</div>
```