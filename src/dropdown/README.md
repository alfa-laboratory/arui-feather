```
<div>
    <div className='layout' >
        <Dropdown
            size='s'
            popupContent='Popup with default props'
        >
            Click me
        </Dropdown>
    </div>
    <div className='layout' >
        <Dropdown
            size='m'
            popupContent='Dropdown popup width custom props'
            popupProps={ {
                directions: ['right-center'],
                mainOffset: 13,
                type: 'tooltip'
            } }
        >
            Click me
        </Dropdown>
    </div>
    <div className='layout' >
        <Dropdown
            size='l'
            popupContent='Dropdown popup'
            switcherText='I am disabled'
            disabled={ true }
            popupProps={ {
                directions: ['right-center'],
                mainOffset: 13,
                type: 'tooltip'
            } }
        />
    </div>
    <div className='layout' >
        <Dropdown
            size='xl'
            popupContent={
                <span>Content inside popup</span>
            }
            popupProps={ {
                directions: ['bottom-center'],
                mainOffset: 13,
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
    <div className='layout' >
        <Dropdown
            size='s'
            switcherType='button'
            togglable='check'
            popupContent='Popup with default props'
        >
            Click me
        </Dropdown>
    </div>
    <div className='layout' >
        <Dropdown
            size='m'
            switcherType='button'
            popupContent='Dropdown popup width custom props'
            popupProps={ {
                directions: ['right-center'],
                mainOffset: 13,
                type: 'tooltip'
            } }
        >
            Click me
        </Dropdown>
    </div>
    <div className='layout' >
        <Dropdown
            size='l'
            switcherType='button'
            switcherText='I am disabled'
            disabled={ true }
            popupContent='Dropdown popup'
            popupProps={ {
                directions: ['right-center'],
                mainOffset: 13,
                type: 'tooltip'
            } }
        />
    </div>
    <div className='layout' >
        <Dropdown
            size='xl'
            switcherType='button'
            popupContent={
                <span>Content inside popup</span>
            }
            popupProps={ {
                directions: ['bottom-center'],
                mainOffset: 13,
                type: 'tooltip'
            } }
        >
            Click me
        </Dropdown>
    </div>
</div>
```
