```
<div>
    <div className='layout'>
        <Attach
            size='s'
        />
    </div>
    <div className='layout'>
        <Attach
            size='m'
        />
    </div>
    <div className='layout'>
        <Attach
            size='l'
        />
    </div>
    <div className='layout'>
        <Attach
            size='xl'
        />
    </div>
    <div className='layout'>
        <Attach
            size='xl'
            disabled={ true }
        />
    </div>
</div>
```
```
<div>
    <div className='layout'>
        <Attach
            size='s'
            buttonContent='Please, choose a file'
            noFileText='file in pdf format'
            buttonProps={ {
                pseudo: true,
                icon: <Icon size='s' icon='search' />
            } }
        />
    </div>
    <div className='layout'>
        <Attach
            size='m'
            buttonContent='Please, choose a file'
            noFileText='file in pdf format'
            buttonProps={ {
                pseudo: true,
                icon: <Icon size='m' icon='search' />
            } }
        />
    </div>
    <div className='layout'>
        <Attach
            size='l'
            buttonContent='Please, choose a file'
            noFileText='file in pdf format'
            buttonProps={ {
                pseudo: true,
                icon: <Icon size='l' icon='search' />
            } }
        />
    </div>
    <div className='layout'>
        <Attach
            size='xl'
            buttonContent='Please, choose a file'
            noFileText='file in pdf format'
            buttonProps={ {
                pseudo: true,
                icon: <Icon size='xl' icon='search' />
            } }
        />
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
