```
const socialNetworks = [
    { value: 'Facebook' },
    { value: 'Twitter' },
    { value: 'LinkedIn' },
    { value: 'Sina Weibo' },
    { value: 'Pinterest' },
    { value: 'VKontakte' },
    { value: 'Instagram' },
    { value: 'Tumblr' },
    { value: 'Flickr' },
    { value: 'Odnoklassniki' },
    { value: 'Renren' },
    { value: 'douban' },
    { value: 'LiveJournal' },
    { value: 'DeviantArt' },
    { value: 'StumbleUpon' },
    { value: 'Myspace' },
    { value: 'Yelp, Inc.' },
    { value: 'Taringa!' },
    { value: 'mixi' },
    { value: 'XING' }
];
function getFilteredOptions(list, typedValue) {
    if (!typedValue) {
        return list;
    }
    return list.filter(({ value }) => value !== typedValue && value.indexOf(typedValue) !== -1);
}
function handleItemSelect(item) {
    setState({ value: item.text })
}
function handleChange(value) {
    setState({ value });
}
<InputAutocomplete
    size='m'
    value={ state.value }
    onChange={ handleChange }
    onItemSelect={ handleItemSelect }
    placeholder='Введите название социальной сети'
    options={ getFilteredOptions(socialNetworks, state.value) }
/>
```

Элементы с кастомной разметкой
```
const socialNetworks = [
    {
        value: 'VKontakte',
        description: <Label size='l'>вариант - VKontakte</Label>
    },
    {
        value: 'Facebook',
        description: <Label size='l'>вариант - Facebook</Label>
    },
    {
        value: 'Twitter',
        description: <Label size='l'>вариант - Twitter</Label>
    }
];
function getFilteredOptions(list, typedValue) {
    if (!typedValue) {
        return list;
    }
    return list.filter(({ value }) => value !== typedValue && value.indexOf(typedValue) !== -1);
}
function handleItemSelect(item) {
    setState({ value: item.text })
}
function handleChange(value) {
    setState({ value });
}
<InputAutocomplete
    size='l'
    value={ state.value }
    onChange={ handleChange }
    onItemSelect={ handleItemSelect }
    placeholder='Введите название социальной сети'
    options={ getFilteredOptions(socialNetworks, state.value) }
/>
```