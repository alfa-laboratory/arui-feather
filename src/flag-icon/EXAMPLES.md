Режим загрузки отдельными флагами
```jsx
<div>
    <div className='row'>
        {
            ['by', 'kz', 'ru', 'ua'].map(item => (
                <div
                    key={ item }
                    className='column'
                >
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
                'nu', 'nz', 'sh', 'ck', 'tc', 'tv', 'fj', 'fk'].map(item => (
                <div
                    key={ item }
                    className='column'
                >
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
                <div
                    key={ item }
                    className='column'
                >
                    <FlagIcon
                        country={ item }
                        size='l'
                    />
                </div>
            ))
        }
    </div>
    <div className='row' style={ { alignItems: 'flex-start', flexWrap: 'wrap' } }>
        {
            ['ar', 'hk', 'mq', 'pm', 'ki', 'kr'].map(item => (
                <div
                    key={ item }
                    className='column'
                >
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
const countries = require('../../src/lib/countries').default;

const countriesList = countries.getCountries();

<div>
    {
        ['s', 'm', 'l', 'xl'].map(size => (
            <div
                key={ size }
                className='row'
                style={ { alignItems: 'flex-start', flexWrap: 'wrap' } }
            >
                {
                    countriesList.map(item => (
                        <FlagIcon
                            key={ item.iso2 }
                            country={ item.iso2 }
                            mode='sprite'
                            size={ size }
                        />
                    ))
                }
            </div>
        ))
    }
</div>
```
