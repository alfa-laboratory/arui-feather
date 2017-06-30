Всплывающее окно слева
```
initialState = {
    visible: false
};
<div>
    <Button onClick={ () => setState({ visible: !state.visible }) }>
        Нажми на меня!
    </Button>
    <Notification
        visible={ state.visible }
        status='ok'
        offset={ 10 }
        title={ 'Message title' }
        onCloseTimeout={ () => { setState({ visible: false }); } }
        onCloserClick={ () => { setState({ visible: false }); } }
    >
        Я слева!
    </Notification>
</div>
```

Всплывающее окно справа
```
initialState = {
    visible: false
};
<div>
    <Button onClick={ () => setState({ visible: !state.visible }) }>
        Нажми на меня!
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
        Я справа
    </Notification>
</div>
```

Всплывающее окно с ошибкой
```
initialState = {
    visible: false
};
<div>
    <Button onClick={ () => setState({ visible: !state.visible }) }>
        Нажми на меня!
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
        Все очень плохо!
    </Notification>
</div>
```

Сообщение с иконкой
```
initialState = {
    visible: false
};
<div>
    <Button onClick={ () => setState({ visible: !state.visible }) }>
        Нажми на меня!
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
        Ничего не найдено, попробуйте повторить поиск
    </Notification>
</div>
```