```jsx
import Radio from 'arui-feather/radio';
import RadioGroup from 'arui-feather/radio-group';

initialState = {
    money: ''
};
function handleMoneyChange(money) {
    setState({ money });
}
<div>
    <Input
        size='m'
        placeholder='Введите сумму'
        rightAddons={
            <RadioGroup type='button'>
                {
                    ['₽', '$', '€'].map(item => (
                        <Radio
                            key={ item }
                            size='s'
                            type='button'
                            text={ item }
                            onChange={ handleMoneyChange }
                        />
                    ))
                }
            </RadioGroup>
        }
        type='number'
    />
</div>
```

Обычные
```jsx
const sizes = ['s', 'm', 'l', 'xl'];

<div>
    {
        sizes.map(size => (
            <div className='row' key={ size }>
                <Input
                    placeholder='Введите что-нибудь'
                    view='line'
                    size={ size }
                />
            </div>
        ))
    }
</div>
```

С лейблами
```jsx
const sizes = ['s', 'm', 'l', 'xl'];

<div>
    {
        sizes.map(size => (
            <div className='row' key={ size }>
                <Input
                    label='Имя'
                    placeholder='Введите ваше имя'
                    view='line'
                    size={ size }
                />
            </div>
        ))
    }
</div>
```

С крестиком «Очистить»
```jsx
const sizes = ['s', 'm', 'l', 'xl'];

<div>
    {
        sizes.map(size => (
            <div className='row' key={ size }>
                <Input
                    placeholder='Введите что-нибудь'
                    defaultValue='Корм для кота'
                    clear={ true }
                    view='line'
                    size={ size }
                />
            </div>
        ))
    }
</div>
```

С шириной 100%
```jsx
const sizes = ['s', 'm', 'l', 'xl'];

<div>
    {
        sizes.map(size => (
            <div className='row' key={ size }>
                <Input
                    placeholder='Введите что-нибудь длинное'
                    width='available'
                    view='line'
                    size={ size }
                />
            </div>
        ))
    }
</div>
```

С ошибкой
```jsx
const sizes = ['s', 'm', 'l', 'xl'];

initialState = {
    value: 'Конsтантин',
    error: true
};
<div>
    {
        sizes.map(size => (
            <div className='row' key={ size }>
                <Input
                    placeholder='Введите что-нибудь'
                    error={ state.error ? 'Только кириллические символы' : null }
                    view='line'
                    size={ size }
                    value={ state.value }
                    onChange={ value => setState({
                        value,
                        error: value.search(/[a-z]/i) !== -1
                    }) }
                />
            </div>
        ))
    }
</div>
```

С произвольной иконкой
```jsx
import IconOk from 'arui-feather/icon/ui/ok';

const sizes = ['s', 'm', 'l', 'xl'];

<div>
    {
        sizes.map(size => (
            <div className='row' key={ size }>
                <Input
                    placeholder='Введите ваше имя'
                    view='line'
                    size={ size }
                    icon={
                        <IconOk
                            colored={ true }
                            size={ size }
                        />
                    }
                />
            </div>
        ))
    }
</div>
```

В неактивном состоянии
```jsx
const sizes = ['s', 'm', 'l', 'xl'];

<div>
    {
        sizes.map(size => (
            <div className='row' key={ size }>
                <Input
                    placeholder='Введите ваше имя'
                    disabled={ true }
                    view='line'
                    size={ size }
                />
            </div>
        ))
    }
</div>
```

Новые экспериментальные (type="filled")
```jsx
const InputIcon = require('../../src/icon/ui/info').default;

const autocompleteOptions = [
    { value: 'Facebook' },
    { value: 'Twitter' },
    { value: 'LinkedIn' },
    { value: 'Pinterest' },
    { value: 'VKontakte' },
    { value: 'Instagram' },
    { value: 'Odnoklassniki' }
];
const selectOptions = [
    { value: '01', text: 'ИП Фридман М.М.' },
    { value: '02', text: 'ООО «Виктори»' },
    { value: '03', text: 'ФГУП НПП ВНИИЭМ', props: { disabled: true } }
];

<div>
    <div className='row' style={ { width: '374px' } }>
        <Input
            placeholder='Введите что-нибудь'
            view='filled'
            size='m'
            width='available'
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='m'
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='m'
            hint='Текст подсказки'
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='m'
            error='Текст ошибки'
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='m'
            icon={
                <InputIcon />
            }
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='m'
            rightAddons={
                <InputIcon />
            }
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='m'
            leftAddons={
                <InputIcon />
            }
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='m'
            leftAddons={
                <InputIcon />
            }
            rightAddons={
                <InputIcon />
            }
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='m'
            leftAddons={
                <InputIcon />
            }
            rightAddons={
                <InputIcon />
            }
            icon={
                <InputIcon />
            }
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='m'
            clear={ true }
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='m'
            disabled={ true }
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='m'
            value='Евгений'
            disabled={ true }
        />
    </div>
    <div className='row'>
        <MoneyInput
            showCurrency={ true }
            currencyCode='USD'
            bold={ true }
            view='filled'
        />
    </div>
    <div className='row'>
        <MoneyInput
            showCurrency={ true }
            currencyCode='USD'
            bold={ true }
            view='filled'
            label='Лейбл'
        />
    </div>
    <div className='row' style={ { width: '374px' } }>
        <CalendarInput
            defaultValue='01.02.2019'
            width='available'
            view='filled'
        />
    </div>
    <div className='row' style={ { width: '374px' } }>
        <InputAutocomplete
            placeholder='Выберите категорию'
            options={ autocompleteOptions }
            width='available'
            view='filled'
        />
    </div>
    <div className='row'>
        <IntlPhoneInput
            view='filled'
        />
    </div>

    <div className='row' style={ { width: '374px' } }>
        <Textarea
            placeholder='Введите назначение платежа'
            width='available'
            view='filled'
        />
    </div>
    <div className='row' style={ { width: '374px' } }>
        <Textarea
            label='Назначение платежа'
            placeholder='Введите назначение платежа'
            error='Нужно указать назначение платежа'
            width='available'
            view='filled'
        />
    </div>
    <div className='row' style={ { width: '374px' } }>
        <Textarea
            label='Назначение платежа'
            placeholder='Введите назначение платежа'
            minRows={ 5 }
            width='available'
            view='filled'
        />
    </div>

    <div className='row' style={ { width: '374px' } }>
        <Select
            mode='radio'
            options={ selectOptions }
            width='available'
            view='filled'
        />
    </div>
    <div className='row' style={ { width: '374px' } }>
        <Select
            mode='check'
            options={ selectOptions }
            label='Лейбл'
            error='Ошибочка вышла'
            width='available'
            view='filled'
        />
    </div>
</div>
```


Новые экспериментальные (type="filled", size="s")
```jsx
const InputIcon = require('../../src/icon/ui/info').default;

const autocompleteOptions = [
    { value: 'Facebook' },
    { value: 'Twitter' },
    { value: 'LinkedIn' },
    { value: 'Pinterest' },
    { value: 'VKontakte' },
    { value: 'Instagram' },
    { value: 'Odnoklassniki' }
];
const selectOptions = [
    { value: '01', text: 'ИП Фридман М.М.' },
    { value: '02', text: 'ООО «Виктори»' },
    { value: '03', text: 'ФГУП НПП ВНИИЭМ', props: { disabled: true } }
];

<div>
    <div className='row' style={ { width: '374px' } }>
        <Input
            placeholder='Введите что-нибудь'
            view='filled'
            size='s'
            width='available'
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='s'
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='s'
            hint='Текст подсказки'
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='s'
            error='Текст ошибки'
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='s'
            icon={
                <InputIcon />
            }
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='s'
            rightAddons={
                <InputIcon />
            }
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='s'
            leftAddons={
                <InputIcon size='s' />
            }
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='s'
            leftAddons={
                <InputIcon size='s' />
            }
            rightAddons={
                <InputIcon />
            }
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='s'
            leftAddons={
                <InputIcon size='s' />
            }
            rightAddons={
                <InputIcon />
            }
            icon={
                <InputIcon />
            }
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='s'
            clear={ true }
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='s'
            disabled={ true }
        />
    </div>
    <div className='row'>
        <Input
            label='Имя'
            placeholder='Введите ваше имя'
            view='filled'
            size='s'
            value='Евгений'
            disabled={ true }
        />
    </div>
    <div className='row'>
        <MoneyInput
            showCurrency={ true }
            currencyCode='USD'
            bold={ true }
            view='filled'
            size='s'
        />
    </div>
    <div className='row'>
        <MoneyInput
            showCurrency={ true }
            currencyCode='USD'
            bold={ true }
            view='filled'
            label='Лейбл'
            size='s'
        />
    </div>
    <div className='row' style={ { width: '374px' } }>
        <CalendarInput
            defaultValue='01.02.2019'
            width='available'
            view='filled'
            size='s'
        />
    </div>
    <div className='row' style={ { width: '374px' } }>
        <InputAutocomplete
            placeholder='Выберите категорию'
            options={ autocompleteOptions }
            width='available'
            view='filled'
            size='s'
        />
    </div>
    <div className='row'>
        <IntlPhoneInput
            view='filled'
            size='s'
        />
    </div>

    <div className='row' style={ { width: '374px' } }>
        <Textarea
            placeholder='Введите назначение платежа'
            width='available'
            view='filled'
            size='s'
        />
    </div>
    <div className='row' style={ { width: '374px' } }>
        <Textarea
            label='Назначение платежа'
            placeholder='Введите назначение платежа'
            error='Нужно указать назначение платежа'
            width='available'
            view='filled'
            size='s'
        />
    </div>
    <div className='row' style={ { width: '374px' } }>
        <Textarea
            label='Назначение платежа'
            placeholder='Введите назначение платежа'
            minRows={ 5 }
            width='available'
            view='filled'
            size='s'
        />
    </div>

    <div className='row' style={ { width: '374px' } }>
        <Select
            mode='radio'
            options={ selectOptions }
            width='available'
            view='filled'
            size='s'
        />
    </div>
    <div className='row' style={ { width: '374px' } }>
        <Select
            mode='check'
            options={ selectOptions }
            label='Лейбл'
            error='Ошибочка вышла'
            width='available'
            view='filled'
            size='s'
        />
    </div>
</div>
```
