```
<RadioGroup>
    {['Один', 'Два', 'Три', 'Четыре'].map((text, index) =>
        <Radio
            text={ text }
            key={ index }
            value={ text }
        />
    )}
</RadioGroup>
```

```
<RadioGroup error='Обязательно' >
    {['Один', 'Два', 'Три', 'Четыре'].map((text, index) =>
        <Radio
            text={ text }
            key={ index }
            value={ text }
        />
    )}
</RadioGroup>
```

```
<RadioGroup type='button' error='Обязательно' >
    {['Один', 'Два', 'Три', 'Четыре'].map((text, index) =>
        <Radio
            text={ text }
            key={ index }
            value={ text }
            type='button'
        />
    )}
</RadioGroup>
```

```
<RadioGroup type='line' >
    {['Один', 'Два', 'Три', 'Четыре'].map((text, index) =>
        <Radio
            text={ text }
            key={ index }
            value={ text }
        />
    )}
</RadioGroup>
```