Сайтбар
```jsx
function toggleSidebar() {
    setState({ isOpen: !state.isOpen });
}
initialState = {
    isOpen: false
};
<div>
    <Button onClick={ toggleSidebar }>Выписка по счёту</Button>
    <Sidebar
        visible={ state.isOpen }
        onCloserClick={ toggleSidebar }
    >
        <Heading size='m'>
            Выписка по счёту
        </Heading>
        <Label>
            Куда отправить выписку?
        </Label>
        <div style={ { marginBottom: 20 } }>
            <Input
                size='m'
                placeholder='Адрес электронной почты'
            />
        </div>
        <Button size='m' view='extra'>Отправить</Button>
    </Sidebar>
</div>
```

Сайтбар с контентом в шапке сайтбара
```jsx
function toggleSidebar() {
    setState({ isOpen: !state.isOpen });
}
initialState = {
    isOpen: false
};
<div>
    <Button onClick={ toggleSidebar }>Выписка по счёту</Button>
    <Sidebar
        headerContent={ <Button>Кнопка</Button> }
        visible={ state.isOpen }
        onCloserClick={ toggleSidebar }
    >
        <Heading size='m'>
            Выписка по счёту
        </Heading>
        <Label>
            Куда отправить выписку?
        </Label>
        <div style={ { marginBottom: 20 } }>
            <Input
                size='m'
                placeholder='Адрес электронной почты'
            />
        </div>
        <Button size='m' view='extra'>Отправить</Button>
    </Sidebar>
</div>
```

Сайтбар в котором всегда есть бордер в шапке сайтбара, по дефолту бордер появляется при скролле контента (актуально для мобильной версии)
```jsx
function toggleSidebar() {
    setState({ isOpen: !state.isOpen });
}
initialState = {
    isOpen: false
};
<div>
    <Button onClick={ toggleSidebar }>Выписка по счёту</Button>
    <Sidebar
        alwaysHasBorder={ true }
        visible={ state.isOpen }
        onCloserClick={ toggleSidebar }
    >
        <Heading size='m'>
            Выписка по счёту
        </Heading>
        <Label>
            Куда отправить выписку?
        </Label>
        <div style={ { marginBottom: 20 } }>
            <Input
                size='m'
                placeholder='Адрес электронной почты'
            />
        </div>
        <Paragraph>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
            into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
            into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
            like Aldus PageMaker including versions of Lorem Ipsum.
        </Paragraph>
        <Paragraph>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
            like Aldus PageMaker including versions of Lorem Ipsum.
        </Paragraph>
        <Button size='m' view='extra'>Отправить</Button>
    </Sidebar>
</div>
```