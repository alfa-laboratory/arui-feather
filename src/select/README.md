Режим "radio"
```
const options = [
    { value: 'Vkontakte', text: 'Vkontakte' },
    { value: 'Facebook', text: 'Facebook' },
    { value: 'Twitter', text: 'Twitter' }
];
<div>
    {['s'].map(size => (
        <div className='layout' >
            <Select
                size={ size }
                mode='radio'
                options={ options }
            />
            <p/>
            <Select
                size={ size }
                mode='radio'
                options={ options }
                disabled={ true }
            />
        </div>
    ))}
</div>
```

Режим "check"
```
const options = [
    { value: 'Vkontakte', text: 'Vkontakte' },
    { value: 'Facebook', text: 'Facebook' },
    { value: 'Twitter', text: 'Twitter' }
];
<div>
    {['m'].map(size => (
        <div className='layout' >
            <Select
                size={ size }
                mode='check'
                options={ options }
            />
            <p/>
            <Select
                size={ size }
                mode='check'
                options={ options }
                disabled={ true }
            />
        </div>
    ))}
</div>
```

Режим "radio-check"
```
const options = [
    { value: 'Vkontakte', text: 'Vkontakte' },
    { value: 'Facebook', text: 'Facebook' },
    { value: 'Twitter', text: 'Twitter' }
];
<div>
    {['xl'].map(size => (
        <div className='layout' >
            <Select
                size={ size }
                mode='radio-check'
                options={ options }
            />
            <p/>
            <Select
                size={ size }
                mode='radio-check'
                options={ options }
                disabled={ true }
            />
        </div>
    ))}
</div>
```

Select с тянущейся шириной
```
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
        <div className='layout' >
            <Select
                width='available'
                size={ size }
                mode='check'
                options={ options }
            />
            <p/>
            <Select
                width='available'
                size={ size }
                mode='check'
                options={ options }
                disabled={ true }
            />
        </div>
    ))}
</div>
```
