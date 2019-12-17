```jsx

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

    // преобразуем строку ( 'Москва' -> '.*м.*о.*с.*к.*в.*а.*') для полнотекстового поиска, так как
    // '.*' означает любое количество любых символов
    const regex = new RegExp(typedValue.toLowerCase().replace(/(?!$)|(?=$)/gm, '.*'));

    return list.filter(({ value }) => regex.test(value.toLowerCase()));
}
function handleItemSelect(item) {
    setState({ value: item.text })
}
function handleChange(value) {
    setState({ value });
}
<div style={ { width: '300px' } }>
    <InputAutocomplete
        size='m'
        width='available'
        value={ state.value }
        onChange={ handleChange }
        onItemSelect={ handleItemSelect }
        placeholder='Введите название социальной сети'
        options={ getFilteredOptions(socialNetworks, state.value) }
    />
</div>
```

Элементы с кастомной разметкой
```jsx
import Label from 'arui-feather/label';

function Circle({ background }) {
    const circleStyles = {
        width: '14px',
        height: '14px',
        display: 'block',
        userSelect: 'none',
        background,
        borderRadius: '50%',
        transform: 'translateY(-50%)',
        top: '10px',
        position: 'relative',
        marginRight: '10px',
        marginLeft: '-20px'
    };

    return (
        <span style={ circleStyles } />
    )
}
const socialNetworks = [
    {
        value: 'Автотранспорт',
        description:
            <Label size='l'>
                <div style={ { display: 'flex' } }>
                    <Circle background='green' />
                    Автотранспорт
                </div>
            </Label>
    },
    {
        value: 'Гипермаркет',
        description:
            <Label size='l'>
                <div style={ { display: 'flex' } }>
                    <Circle background='blue' />
                    Гипермаркет
                </div>
            </Label>
    },
    {
        value: 'Штрафы, налоги, комиссии',
        description:
            <Label size='l'>
                <div style={ { display: 'flex' } }>
                    <Circle background='rgb(217, 50, 128)' />
                    Штрафы, налоги, комиссии
                </div>
            </Label>
    }
];

function getFilteredOptions(list, typedValue) {
    if (!typedValue) {
        return list;
    }

    const typedValueLCase = typedValue.toLowerCase();

    return list.filter(({ value }) => value.toLowerCase().includes(typedValueLCase));
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
    width='available'
    onChange={ handleChange }
    onItemSelect={ handleItemSelect }
    placeholder='Выберите категорию'
    options={ getFilteredOptions(socialNetworks, state.value) }
/>
```

Автокомплит с автозакрытием после выбора
```jsx
import TagButton from 'arui-feather/tag-button';

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

    const typedValueLCase = typedValue.toLowerCase();

    return list.filter(({ value }) => value.toLowerCase().includes(typedValueLCase));
}

function handleItemSelect(item) {
    const values = state.values || [];

    if (!values.includes(item.value)) {
        setState({ values: values.concat([item.value]) });
    }
}

function handleChange(value) {
    setState({ value });
}

<div>
    <InputAutocomplete
        size='l'
        value={ state.value }
        width='available'
        closeOnSelect={ true }
        onChange={ handleChange }
        onItemSelect={ handleItemSelect }
        updateValueOnItemSelect={ false }
        placeholder='Выберите категорию'
        options={ getFilteredOptions(socialNetworks, state.value) }
    />

    <div style={ { marginTop: '5px' } }>
        { state.values && state.values.map(value => <TagButton key={ value } size='s'>{ value }</TagButton>) }
    </div>
</div>
```
