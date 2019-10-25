```jsx
<div>
    {
        ['s', 'm', 'l', 'xl'].map(size => (
            <div className='row' key={ size }>
                <div className='column'>
                    <Attach size={ size } noFileText='' />
                </div>
                <div className='column'>
                    <Attach size={ size } noFileText='' disabled={ true } />
                </div>
            </div>
        ))
    }
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
            buttonProps={ { pseudo: true } }
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
            buttonContent='Выберите файл'
            size='s'
            onChange={ handleChange }
            value={ state.value }
        />
    </div>
</div>
```

С отображением прогресса загрузки файла
```jsx
function handleChange(value) {
    setState({ value });
}

<div>
    <div className='row'>
        <Attach
            progressBarPercent={ 50 }
            buttonContent='Выберите файл'
            size='s'
            onChange={ handleChange }
            value={ state.value }
        />
    </div>
</div>
```