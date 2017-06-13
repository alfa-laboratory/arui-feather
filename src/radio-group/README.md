Стандартная группа радиокнопок
```
const RADIOS = [
    { text: 'Один', value: 'radio-1-1' },
    { text: 'Два', value: 'radio-1-2' },
    { text: 'Три', value: 'radio-1-3' },
    { text: 'Четыре', value: 'radio-1-4' }
];
<RadioGroup>
    { RADIOS.map(radio =>
        <Radio
            text={ radio.text }
            key={ radio.value }
            value={ radio.value }
        />
    ) }
</RadioGroup>
```

Стандартная группа радиокнопок (error)
```
const RADIOS = [
    { text: 'Один', value: 'radio-2-1' },
    { text: 'Два', value: 'radio-2-2' },
    { text: 'Три', value: 'radio-2-3' },
    { text: 'Четыре', value: 'radio-2-4' }
];
<RadioGroup error='Обязательно'>
    { RADIOS.map(radio =>
        <Radio
            text={ radio.text }
            key={ radio.value }
            value={ radio.value }
        />
    ) }
</RadioGroup>
```

Стандартная группа радиокнопок (disabled)
```
const RADIOS = [
    { text: 'Один', value: 'radio-7-1', disabled: true },
    { text: 'Два', value: 'radio-7-2', disabled: true },
    { text: 'Три', value: 'radio-7-3', disabled: true },
    { text: 'Четыре', value: 'radio-7-4', disabled: true }
];
<RadioGroup>
    { RADIOS.map(radio =>
        <Radio
            text={ radio.text }
            key={ radio.value }
            value={ radio.value }
            disabled={ radio.disabled }
        />
    ) }
</RadioGroup>
```

Стандартная группа радиокнопок (частично disabled)
```
const RADIOS = [
    { text: 'Один', value: 'radio-7-1', disabled: true },
    { text: 'Два', value: 'radio-7-2', disabled: false },
    { text: 'Три', value: 'radio-7-3', disabled: true },
    { text: 'Четыре', value: 'radio-7-4', disabled: false },
    { text: 'Пять', value: 'radio-7-5', disabled: true },
    { text: 'Шесть', value: 'radio-7-6', disabled: false }
];
<RadioGroup>
    { RADIOS.map(radio =>
        <Radio
            text={ radio.text }
            key={ radio.value }
            value={ radio.value }
            disabled={ radio.disabled }
        />
    ) }
</RadioGroup>
```

Группа радиокнопок в виде кнопок
```
const RADIOS = [
    { text: 'Один', value: 'radio-3-1' },
    { text: 'Два', value: 'radio-3-2' },
    { text: 'Три', value: 'radio-3-3' },
    { text: 'Четыре', value: 'radio-3-4' }
];
<RadioGroup type='button'>
    { RADIOS.map(radio =>
        <Radio
            text={ radio.text }
            key={ radio.value }
            value={ radio.value }
            type='button'
        />
    ) }
</RadioGroup>
```

Группа радиокнопок в виде кнопок (error)
```
const RADIOS = [
    { text: 'Один', value: 'radio-3-1' },
    { text: 'Два', value: 'radio-3-2' },
    { text: 'Три', value: 'radio-3-3' },
    { text: 'Четыре', value: 'radio-3-4' }
];
<RadioGroup type='button' error={ 'Обязательно' }>
    { RADIOS.map(radio =>
        <Radio
            text={ radio.text }
            key={ radio.value }
            value={ radio.value }
            type='button'
        />
    ) }
</RadioGroup>
```

Группа радиокнопок в виде кнопок (disabled)
```
const RADIOS = [
    { text: 'Один', value: 'radio-7-1', disabled: true },
    { text: 'Два', value: 'radio-7-2', disabled: true },
    { text: 'Три', value: 'radio-7-3', disabled: true },
    { text: 'Четыре', value: 'radio-7-4', disabled: true }
];
<RadioGroup type='button'>
    { RADIOS.map(radio =>
        <Radio
            text={ radio.text }
            key={ radio.value }
            value={ radio.value }
            disabled={ radio.disabled }
            type='button'
        />
    ) }
</RadioGroup>
```

Группа радиокнопок в виде кнопок (частично disabled)
```
const RADIOS = [
    { text: 'Один', value: 'radio-7-1', disabled: true },
    { text: 'Два', value: 'radio-7-2', disabled: false },
    { text: 'Три', value: 'radio-7-3', disabled: true },
    { text: 'Четыре', value: 'radio-7-4', disabled: false },
    { text: 'Пять', value: 'radio-7-5', disabled: true },
    { text: 'Шесть', value: 'radio-7-6', disabled: false }
];
<RadioGroup type='button'>
    { RADIOS.map(radio =>
        <Radio
            text={ radio.text }
            key={ radio.value }
            value={ radio.value }
            disabled={ radio.disabled }
            type='button'
        />
    ) }
</RadioGroup>
```
