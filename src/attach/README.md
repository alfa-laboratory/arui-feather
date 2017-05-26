```
<div>
    <div>
        {['s', 'm', 'l', 'xl'].map(size => (
            <div className='layout' key={ size }>
                <Attach
                    size={size}
                />
            </div>
        ))}
    </div>
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
</div>
```
```
<div>
    <div>
        {['s', 'm', 'l', 'xl'].map(size => (
            <div className='layout' key={ size }>
                <Attach
                    size={size}
                    buttonContent='Please, choose a file'
                    noFileText='file in pdf format'
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

### accept mime-type

```
function handleChange(value) {
   setState({value});
}

<div>
    <div className='layout'>
        <Attach
            accept='text/plain'
            size='s'
            buttonContent={ state.value ? 'Choose another text file' : 'Choose a text file' }
            onChange={ handleChange }
            value={ state.value }
        />
    </div>
</div>
```