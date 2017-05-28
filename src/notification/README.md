```
initialState = {
    visible: false
};
<div>
    <Button onClick={ () => setState({ visible: !state.visible }) }>
        Все ок слева
    </Button>
    <Notification
        visible={ state.visible }
        status='ok'
        offset={ 10 }
        title={ 'Message title' }
        onCloseTimeout={ () => { setState({ visible: false }); } }
        onCloserClick={ () => { setState({ visible: false }); } }
    >
        Something went right
    </Notification>
</div>
```

```
initialState = {
    visible: false
};
<div>
    <Button onClick={ () => setState({ visible: !state.visible }) }>
        Все так себе
    </Button>
    <Notification
        visible={ state.visible }
        status='fail'
        offset={ 100 }
        stickTo='right'
        title={ 'Message title' }
        onCloseTimeout={ () => { setState({ visible: false }); } }
        onCloserClick={ () => { setState({ visible: false }); } }
    >
        Все так себе
    </Notification>
</div>
```

```
initialState = {
    visible: false
};
<div>
    <Button onClick={ () => setState({ visible: !state.visible }) }>
        Все очень плохо
    </Button>
    <Notification
        visible={ state.visible }
        status='error'
        offset={ 190 }
        stickTo='right'
        title={ 'Message title' }
        onCloseTimeout={ () => { setState({ visible: false }); } }
        onCloserClick={ () => { setState({ visible: false }); } }
    >
        Все очень плохо
    </Notification>
</div>
```


```
initialState = {
    visible: false
};
<div>
    <Button onClick={ () => setState({ visible: !state.visible }) }>
        Custom notification
    </Button>
    <Notification
        visible={ state.visible }
        status='ok'
        offset={ 30 }
        title={ 'Message title' }
        icon={ <Icon icon='search' size='m' /> }
        onCloseTimeout={ () => { setState({ visible: false }); } }
        onCloserClick={ () => { setState({ visible: false }); } }
    >
        You can search
    </Notification>
</div>
```