```
<div>
    {['m', 'l'].map(size => (
        <Radio text='Радио' size={ size } />
    ))}
</div>
```

```
<div>
    {['m', 'l'].map(size => (
        <Radio text='Радио' size={ size } error={ true } />
    ))}
</div>
```

```
<div>
    {['m', 'l'].map(size => (
        <Radio text='Радио' size={ size } disabled={ true } />
    ))}
</div>
```

```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <Radio text='Радио' size={ size } type='button' />
    ))}
</div>
```

```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <Radio text='Радио' size={ size } type='button' disabled={ true } />
    ))}
</div>
```