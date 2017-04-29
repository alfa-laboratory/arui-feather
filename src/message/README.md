```
initialState = {
    visible: false
}
<div>
    <Button
        onClick={ () => { setState({ visible: !state.visible }); } }
    >
        Toggle message
    </Button>
    <Message
        visible={ state.visible }
    >
        Some message here
    </Message>
    <Message
        type='popup'
        visible={ state.visible }
    >
        Some message here
    </Message>
</div>
```