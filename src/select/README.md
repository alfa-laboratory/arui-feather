Режим "radio"
```jsx
const options = [
    { value: 'ИП Фридман М.М.', text: 'ИП Фридман М.М.' },
    { value: 'ООО «Виктори»', text: 'ООО «Виктори»' },
    { value: 'ФГУП НПП ВНИИЭМ', text: 'ФГУП НПП ВНИИЭМ' }
];
<div>
    {['s'].map(size => (
        <div className='row' >
            <div className='column'>
                <Select
                    size={ size }
                    mode='radio'
                    options={ options }
                />
            </div>
            <div className='column'>
                <Select
                    size={ size }
                    mode='radio'
                    options={ options }
                    disabled={ true }
                />
            </div>
        </div>
    ))}
</div>
```

Режим "check"
```jsx
const options = [
    { value: 'ИП Фридман М.М.', text: 'ИП Фридман М.М.' },
    { value: 'ООО «Виктори»', text: 'ООО «Виктори»' },
    { value: 'ФГУП НПП ВНИИЭМ', text: 'ФГУП НПП ВНИИЭМ' }
];
<div>
    {['m'].map(size => (
        <div className='row' >
            <div className='column'>
                <Select
                    size={ size }
                    mode='check'
                    options={ options }
                />
            </div>
            <div className='column'>
                <Select
                    size={ size }
                    mode='check'
                    options={ options }
                    disabled={ true }
                />
            </div>
        </div>
    ))}
</div>
```

Режим "radio-check"
```jsx
const options = [
    { value: 'ИП Фридман М.М.', text: 'ИП Фридман М.М.' },
    { value: 'ООО «Виктори»', text: 'ООО «Виктори»' },
    { value: 'ФГУП НПП ВНИИЭМ', text: 'ФГУП НПП ВНИИЭМ' }
];
<div>
    {['xl'].map(size => (
        <div className='row' >
            <div className='column'>
                <Select
                    size={ size }
                    mode='radio-check'
                    options={ options }
                />
            </div>
            <div className='column'>
                <Select
                    size={ size }
                    mode='radio-check'
                    options={ options }
                    disabled={ true }
                />
            </div>
        </div>
    ))}
</div>
```

Select с тянущейся шириной
```jsx
const options = [
    { value: '1', text: 'ФГУП НПП ВНИИЭМ им. Андроника Гевондовича Иосифьяна' },
    { value: '2', text: 'vanilla strawberry knickbocker glory' },
    { value: '3', text: 'hans christian andersen plays musical statues' },
    { value: '4', text: 'to don\'t take it out on this world by adams apples' },
    { value: '5', text: 'sprinkling hundreds and thousands on a knickerbocker glory' },
    { value: '6', text: 'i saw the ghost of lena zavaroni' }
];
<div>
    {['l'].map(size => (
        <div className='row' >
            <div className='column'>
                <Select
                    width='available'
                    size={ size }
                    mode='check'
                    options={ options }
                />
            </div>
            <div className='column'>
                <Select
                    width='available'
                    size={ size }
                    mode='check'
                    options={ options }
                    disabled={ true }
                />
            </div>
        </div>
    ))}
</div>
```

Без фолбэка на нативный контрол на мобильном устройстве
```jsx
const options = [
    { value: '00', text: 'ИП Фридман М.М.' },
    { value: '01', text: 'ООО «Виктори»' },
    { value: '02', text: 'ФГУП НПП ВНИИЭМ' },
    { value: '03', text: 'Vkontakte' },
    { value: '04', text: 'Facebook' },
    { value: '05', text: 'Twitter' },
    { value: '06', text: 'Vkontakte' },
    { value: '07', text: 'Facebook' },
    { value: '08', text: 'Twitter' },
    { value: '09', text: 'Vkontakte' },
    { value: '10', text: 'Facebook' },
    { value: '11', text: 'Twitter' },
    { value: '12', text: 'Vkontakte' },
    { value: '13', text: 'Facebook' },
];
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div className='row' >
            <div className='column'>
                <Select
                    size={ size }
                    mode='radio'
                    options={ options }
                    mobileMenuMode='popup'
                    mobileTitle='Очень длинный заголовок на мобильном устройстве'
                />
            </div>
            <div className='column'>
                <Select
                    size={ size }
                    mode='radio'
                    options={ options }
                    mobileMenuMode='popup'
                    disabled={ true }
                />
            </div>
        </div>
    ))}
</div>
```
