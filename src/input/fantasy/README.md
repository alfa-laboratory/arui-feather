
```
function renderAddons() {
    return (
        <RadioGroup type={ 'button' }>
            {[1, 2, 3].map(item =>
                <Radio
                    key={ item }
                    size='m'
                    type={ 'button' }
                    text={ item }
                />
            )}
        </RadioGroup>
    );
}
<div>
    <Input
        size='m'
        placeholder='Input...'
        rightAddons={ renderAddons() }
        leftAddons={ renderAddons() }
    />
    <Input
        size='m'
        placeholder='Input with width available...'
        rightAddons={ renderAddons() }
        leftAddons={ renderAddons() }
        width='available'
    />
</div>
```

```
<Input
    view='line'
    size='m'
    error='Something went wrong'
/>
```

```
<Input
    size='m'
    label='Label'
    placeholder='Placeholder'
/>
```

```
<div>
    <Input placeholder='Input...' />
    <Input placeholder='Input...' clear={ true } />
    <Input placeholder='Input...' disabled={ true } />
</div>
```
