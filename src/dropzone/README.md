```jsx
initialState = {
    filesList: [
        'Файл_001.pdf',
        'Файл_002.pdf',
        'Файл_003.pdf',
        'Файл_004.pdf',
        'Файл_005.pdf'
    ]
}

const onDrop = (files) => {
    const fileList = state.filesList;

    for (let i = 0; i < files.length; i += 1) {
        if (!files[i].name) {
            return;
        }

        fileList.push(files[i].name);
    }

    setState({ fileList })
};

<Dropzone onDrop={ onDrop }>
    <div
        style={ {
            width: '400px',
            minHeight: '300px',
            padding: '10px'
        } }
    >
        { state.filesList.map(file => <div key={ file }>{ file }</div>
        ) }
    </div>
</Dropzone>
```
