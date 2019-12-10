```jsx
<div>
    <div className='row'>
        <Dropdown
            size='s'
            popupContent='Последние 3 цифры на обороте карты'
        >
            Подробнее
        </Dropdown>
    </div>
    <div className='row'>
        <Dropdown
            size='m'
            popupContent='Последние 3 цифры на обороте карты'
            popupProps={ {
                directions: ['right-center'],
                type: 'tooltip'
            } }
        >
            Подробнее
        </Dropdown>
    </div>
    <div className='row'>
        <Dropdown
            size='l'
            popupContent='Последние 3 цифры на обороте карты'
            switcherText='Подробнее'
            disabled={ true }
            popupProps={ {
                directions: ['right-center'],
                type: 'tooltip'
            } }
        />
    </div>
    <div className='row'>
        <Dropdown
            size='xl'
            popupContent='Последние 3 цифры на обороте карты'
            popupProps={ {
                directions: ['bottom-center'],
                type: 'tooltip'
            } }
        >
            Подробнее
        </Dropdown>
    </div>
</div>
```