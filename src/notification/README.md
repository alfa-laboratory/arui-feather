Всплывающее окно слева
```jsx
initialState = {
    visible: false
};
<div>
    <Button onClick={ () => setState({ visible: !state.visible }) }>
        Отправить платёж
    </Button>
    <Notification
        visible={ state.visible }
        status='ok'
        offset={ 10 }
        title={ 'Платёж отправлен' }
        onCloseTimeout={ () => { setState({ visible: false }); } }
        onCloserClick={ () => { setState({ visible: false }); } }
    >
        Платёж на сумму 150 000 ₽ для ИП Фридман М.М. отправлен
    </Notification>
</div>
```

Всплывающее окно справа
```jsx
initialState = {
    visible: false
};
<div>
    <Button onClick={ () => setState({ visible: !state.visible }) }>
        Отправить платёж
    </Button>
    <Notification
        visible={ state.visible }
        status='fail'
        offset={ 100 }
        stickTo='right'
        title={ 'Платёж отправлен' }
        onCloseTimeout={ () => { setState({ visible: false }); } }
        onCloserClick={ () => { setState({ visible: false }); } }
    >
        Платёж на сумму 150 000 ₽ для ИП Фридман М.М. отправлен
    </Notification>
</div>
```

Всплывающее окно с ошибкой
```jsx
initialState = {
    visible: false
};
<div>
    <Button onClick={ () => setState({ visible: !state.visible }) }>
        Повторить платёж
    </Button>
    <Notification
        visible={ state.visible }
        status='error'
        offset={ 190 }
        stickTo='right'
        title={ 'Недостаточно средств' }
        onCloseTimeout={ () => { setState({ visible: false }); } }
        onCloserClick={ () => { setState({ visible: false }); } }
    >
        Не хватает 9 ₽, чтобы отправить платёж на сумму 150 000 ₽ для ИП Фридман М.М.
    </Notification>
</div>
```

Сообщение с иконкой
```jsx
initialState = {
    visible: false
};
<div>
    <Button onClick={ () => setState({ visible: !state.visible }) }>
        Отправить позже
    </Button>
    <Notification
        visible={ state.visible }
        status='ok'
        offset={ 30 }
        title={ 'Платёж запланирован' }
        icon={ <Icon name='calendar' size='m' /> }
        onCloseTimeout={ () => { setState({ visible: false }); } }
        onCloserClick={ () => { setState({ visible: false }); } }
    >
        Платёж будет отправлен 31 февраля 2018 года
    </Notification>
</div>
```
