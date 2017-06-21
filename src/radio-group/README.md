```
<RadioGroup>
    {['Один', 'Два', 'Три', 'Четыре'].map(text =>
        <Radio
            text={ text }
            key={ text }
            value={ text }
        />
    )}
</RadioGroup>
```

```
<RadioGroup error='Обязательно' >
    {['Один', 'Два', 'Три', 'Четыре'].map(text =>
        <Radio
            text={ text }
            key={ text }
            value={ text }
        />
    )}
</RadioGroup>
```

```
<RadioGroup type='button' error='Обязательно' >
    {['Один', 'Два', 'Три', 'Четыре'].map(text =>
        <Radio
            text={ text }
            key={ text }
            value={ text }
            type='button'
        />
    )}
</RadioGroup>
```

```
<RadioGroup type='line' >
    {['Один', 'Два', 'Три', 'Четыре'].map(text =>
        <Radio
            text={ text }
            key={ text }
            value={ text }
        />
    )}
</RadioGroup>
```