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