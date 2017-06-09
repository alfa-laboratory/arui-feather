```
const OPTIONS_1 = [
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

function getFilteredOptions(optionsList, value) {
    let filteredOptions = [];

    if (!value) {
        return filteredOptions;
    }

    optionsList.forEach((option) => {
        if (option.type === 'group') {
            let groupOptions = getFilteredOptions(option.content, value);

            if (groupOptions.length) {
                filteredOptions.push(
                    Object.assign(
                        {},
                        option,
                        {
                            content: groupOptions
                        }
                    )
                );
            }
        } else {
            let normalOptionValue = option.value.toLowerCase().trim();
            let normalValue = value.toLowerCase().trim();
            if (normalOptionValue !== normalValue && normalOptionValue.indexOf(normalValue) !== -1) {
                filteredOptions.push(option);
            }
        }
    });

    return filteredOptions;
}

function handleChange(value) {
    setState({
        value
    });
}

function handleItemSelect(item) {
    setState({
        value: item.text
    });
}

<div>
    <div>
        {
            <InputAutocomplete
                size='m'
                value={ state.value }
                onChange={ handleChange }
                onItemSelect={ handleItemSelect }
                placeholder='Input...'
                options={ getFilteredOptions(OPTIONS_1, state.value) }
            />
        }
    </div>
</div>
```
