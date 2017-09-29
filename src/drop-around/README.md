```jsx
<div>
    <div className='row' >
        <DropAround
            size='s'
            popupContent='Последние 3 цифры на обороте карты'
        >
            Подробнее
        </DropAround>
    </div>
    <div className='row' >
        <DropAround
            size='m'
            popupContent='Последние 3 цифры на обороте карты'
            popupProps={ {
                directions: ['right-center'],
                type: 'tooltip'
            } }
        >
            Подробнее
        </DropAround>
    </div>
    <div className='row' >
        <DropAround
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
    <div className='row' >
        <DropAround
            size='xl'
            popupContent='Последние 3 цифры на обороте карты'
            popupProps={ {
                directions: ['bottom-center'],
                type: 'tooltip'
            } }
        >
            Подробнее
        </DropAround>
    </div>
</div>
```
