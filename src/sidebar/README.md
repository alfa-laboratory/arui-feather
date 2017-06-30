```
function toggleSidebar() {
    setState({ isOpen: !state.isOpen });
}
initialState = {
    isOpen: false
};
<div>
    <Button onClick={ toggleSidebar }>Toggle Sidebar</Button>
    <Sidebar
        visible={ state.isOpen }
        onCloserClick={ toggleSidebar }
    >
        <Heading size='m'>
            Я вместительный холодильник с мороженой рыбой
        </Heading>
        <div style={ { marginBottom: 20 } }>
            <Input
                size='m'
                placeholder='Input...'
                error='Something went wrong'
            />
        </div>
        <Button size='m' view='extra'>Рыба</Button>
    </Sidebar>
</div>
```