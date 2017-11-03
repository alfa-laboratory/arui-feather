Режим загрузки отдельными флагами
```jsx
<div>
    <div className='row'>
        {
            ['by', 'kz', 'ru', 'ua'].map(item => (
<<<<<<< HEAD
                <div className='col' style={ { marginRight: '6px' } }>
=======
                <div className='col' style={{ marginRight: '6px' }}>
>>>>>>> b74877f2... feat(*): add flag-icon component
                    <FlagIcon
                        country={ item }
                        size='s'
                    />
                </div>
            ))
        }
    </div>
    <div className='row'>
        {
            ['au', 'ai', 'bm', 'io', 'vg', 'gb', 'ky', 'ms',
<<<<<<< HEAD
                'nu', 'nz', 'sh', 'ck', 'tc', 'tv', 'fj', 'fk'].map(item => (
                <div className='col' style={ { marginRight: '6px' } }>
=======
            'nu', 'nz', 'sh', 'ck', 'tc', 'tv', 'fj', 'fk'].map(item => (
                <div className='col' style={{ marginRight: '6px' }}>
>>>>>>> b74877f2... feat(*): add flag-icon component
                    <FlagIcon
                        country={ item }
                        size='m'
                    />
                </div>
            ))
        }
    </div>
    <div className='row'>
        {
            ['cy', 'gr', 'il', 'it', 'pl', 'rs', 'se'].map(item => (
<<<<<<< HEAD
                <div className='col' style={ { marginRight: '6px' } }>
=======
                <div className='col' style={{ marginRight: '6px' }}>
>>>>>>> b74877f2... feat(*): add flag-icon component
                    <FlagIcon
                        country={ item }
                        size='l'
                    />
                </div>
            ))
        }
    </div>
<<<<<<< HEAD
    <div className='row' style={ { alignItems: 'flex-start', flexWrap: 'wrap' } }>
        {
            ['ar', 'hk', 'mq', 'pm', 'ki', 'kr'].map(item => (
                <div className='col' style={ { marginRight: '6px' } }>
=======
    <div className='row' style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {
            ['ar', 'hk', 'mq', 'pm', 'ki', 'kr'].map(item => (
                <div className='col' style={{ marginRight: '6px' }}>
>>>>>>> b74877f2... feat(*): add flag-icon component
                    <FlagIcon
                        country={ item }
                        size='xl'
                    />
                </div>
            ))
        }
    </div>
</div>
```

Режим загрузки через спрайт
```jsx
const countries = require('../lib/countries').default;
<<<<<<< HEAD

=======
>>>>>>> b74877f2... feat(*): add flag-icon component
const countriesList = countries.getCountries();

<div>
    {
        ['s', 'm', 'l', 'xl'].map(size => (
<<<<<<< HEAD
            <div className='row' style={ { alignItems: 'flex-start', flexWrap: 'wrap' } }>
=======
            <div className='row' style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
>>>>>>> b74877f2... feat(*): add flag-icon component
                {countriesList.map(item => (
                    <FlagIcon
                        country={ item.iso2 }
                        mode='sprite'
                        size={ size }
                    />
                ))}
            </div>
        ))
    }
</div>
```
