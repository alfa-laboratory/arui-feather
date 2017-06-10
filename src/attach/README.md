```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div className='layout' key={ size }>
            <Attach
                size={size}
            />
        </div>
    ))}
</div>
```

C Иконкой
```
<div>
    <div>
        {['s', 'm', 'l', 'xl'].map(size => (
            <div className='layout' key={ size }>
                <Attach
                    size={size}
                    buttonContent='Пожалуйста, выберите файл'
                    noFileText='в формате PDF'
                    buttonProps={ {
                        pseudo: true,
                        icon: <Icon size={size} icon='search' />
                    } }
                />
            </div>
        ))}
    </div>
</div>
```

С изменяемым текстом
```
function handleChange(value) {
   setState({value});
}

<div>
    <div className='layout'>
        <Attach
            size='s'
            buttonContent={ state.value ? 'Choose another file' : 'Choose a file' }
            onChange={ handleChange }
            value={ state.value }
        />
    </div>
</div>
```

Disabled
```
 <div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div className='layout' key={ size }>
            <Attach
                size={size}
                disabled={ true }
            />
        </div>
    ))}
</div>
```


С установлеными типами файлов, доступными для выборв
```
function handleChange(value) {
   setState({value});
}

<div>
    <div className='layout'>
        <Attach
            accept='text/plain'
            buttonContent={ 'Выберите текстовый файл' }
            size='s'
            onChange={ handleChange }
            value={ state.value }
        />
    </div>
</div>
```