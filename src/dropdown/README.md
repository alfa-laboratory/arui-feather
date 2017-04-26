```
<div>
    <Dropdown
        size='s'
        popupContent='Popup with default props'
    >
        Click me
    </Dropdown>
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
    <Dropdown
        size='xl'
        popupContent={
            <Label size='l'>Label inside popup</Label>
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
```

```
<div>
    <Dropdown
        size='s'
        switcherType='button'
        togglable='check'
        popupContent='Popup with default props'
    >
        Click me
    </Dropdown>
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
    <Dropdown
        size='xl'
        switcherType='button'
        popupContent={
            <Label size='l'>Label inside popup</Label>
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
```
