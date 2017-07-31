Режим "radio"
```jsx
const options = [
    { value: 'Vkontakte', text: 'Vkontakte' },
    { value: 'Facebook', text: 'Facebook' },
    { value: 'Twitter', text: 'Twitter' }
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
    { value: 'Vkontakte', text: 'Vkontakte' },
    { value: 'Facebook', text: 'Facebook' },
    { value: 'Twitter', text: 'Twitter' }
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
    { value: 'Vkontakte', text: 'Vkontakte' },
    { value: 'Facebook', text: 'Facebook' },
    { value: 'Twitter', text: 'Twitter' }
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
    { value: '1', text: 'i saw the ghost of lena zavaroni' },
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
    { value: '00', text: 'Vkontakte' },
    { value: '01', text: 'Facebook' },
    { value: '02', text: 'Twitter' },
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
    { value: '14', text: 'Twitter' },
    { value: '15', text: 'Vkontakte' },
    { value: '16', text: 'Facebook' },
    { value: '17', text: 'Twitter' },
    { value: '18', text: 'Vkontakte' },
    { value: '19', text: 'Facebook' },
    { value: '20', text: 'Twitter' },
    { value: '21', text: 'Vkontakte' },
    { value: '22', text: 'Facebook' },
    { value: '23', text: 'Twitter' },
    { value: '24', text: 'Vkontakte' },
    { value: '25', text: 'Facebook' },
    { value: '26', text: 'Twitter' },
    { value: '27', text: 'Vkontakte' },
    { value: '28', text: 'Facebook' },
    { value: '29', text: 'Twitter' },
    { value: '30', text: 'Vkontakte' },
    { value: '31', text: 'Facebook' },
    { value: '32', text: 'Twitter' },
    { value: '33', text: 'Vkontakte' },
    { value: '34', text: 'Facebook' },
    { value: '35', text: 'Twitter' },
    { value: '36', text: 'Vkontakte' },
    { value: '37', text: 'Facebook' },
    { value: '38', text: 'Twitter' },
    { value: '39', text: 'Vkontakte' },
    { value: '40', text: 'Facebook' },
    { value: '41', text: 'Twitter' },
    { value: '42', text: 'Vkontakte' },
    { value: '43', text: 'Facebook' },
    { value: '44', text: 'Twitter' },
    { value: '45', text: 'Vkontakte' },
    { value: '46', text: 'Facebook' },
    { value: '47', text: 'Twitter' },
    { value: '48', text: 'Vkontakte' },
    { value: '49', text: 'Facebook' }
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
