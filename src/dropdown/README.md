```
<div>
    <div className='row' >
        <Dropdown
            size='s'
            popupContent='Popup with default props'
        >
            Click me
        </Dropdown>
    </div>
    <div className='row' >
        <Dropdown
            size='m'
            popupContent='Dropdown popup width custom props'
            popupProps={ {
                directions: ['right-center'],
                type: 'tooltip'
            } }
        >
            Click me
        </Dropdown>
    </div>
    <div className='row' >
        <Dropdown
            size='l'
            popupContent='Dropdown popup'
            switcherText='I am disabled'
            disabled={ true }
            popupProps={ {
                directions: ['right-center'],
                type: 'tooltip'
            } }
        />
    </div>
    <div className='row' >
        <Dropdown
            size='xl'
            popupContent='Content inside popup'
            popupProps={ {
                directions: ['bottom-center'],
                type: 'tooltip'
            } }
        >
            Click me
        </Dropdown>
    </div>
</div>
```

```
<div>
    <div className='row' >
        <Dropdown
            size='s'
            switcherType='button'
            togglable='check'
            popupContent='Popup with default props'
        >
            Click me
        </Dropdown>
    </div>
    <div className='row' >
        <Dropdown
            size='m'
            switcherType='button'
            popupContent='Dropdown popup width custom props'
            popupProps={ {
                directions: ['right-center'],
                type: 'tooltip'
            } }
        >
            Click me
        </Dropdown>
    </div>
    <div className='row' >
        <Dropdown
            size='l'
            switcherType='button'
            switcherText='I am disabled'
            disabled={ true }
            popupContent='Dropdown popup'
            popupProps={ {
                directions: ['right-center'],
                type: 'tooltip'
            } }
        />
    </div>
    <div className='row' >
        <Dropdown
            size='xl'
            switcherType='button'
            popupContent='Content inside popup'
            popupProps={ {
                directions: ['bottom-center'],
                type: 'tooltip'
            } }
        >
            Click me
        </Dropdown>
    </div>
</div>
```
