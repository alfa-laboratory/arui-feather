Всплывающее окно слева
```jsx
import Button from 'arui-feather/button';

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
        offset={ 12 }
        stickTo='left'
        title='Платёж отправлен'
        onCloseTimeout={ () => {
            setState({ visible: false });
        } }
        onCloserClick={ () => {
            setState({ visible: false });
        } }
    >
        Платёж на сумму 150 000 ₽ для ИП Фридман М.М. отправлен
    </Notification>
</div>
```

Всплывающее окно справа
```jsx
import Button from 'arui-feather/button';

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
        offset={ 12 }
        stickTo='right'
        title='Платёж отправлен'
        onCloseTimeout={ () => {
            setState({ visible: false });
        } }
        onCloserClick={ () => {
            setState({ visible: false });
        } }
    >
        Платёж на сумму 150 000 ₽ для ИП Фридман М.М. отправлен
    </Notification>
</div>
```

Всплывающее окно с ошибкой
```jsx
import Button from 'arui-feather/button';

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
        offset={ 112 }
        stickTo='right'
        title='Недостаточно средств'
        onCloseTimeout={ () => {
            setState({ visible: false });
        } }
        onCloserClick={ () => {
            setState({ visible: false });
        } }
    >
        Не хватает 9 ₽, чтобы отправить платёж на сумму 150 000 ₽ для ИП Фридман М.М.
    </Notification>
</div>
```

Сообщение с иконкой
```jsx
import Button from 'arui-feather/button';
import IconCalendar from 'arui-feather/icon/entity/calendar';

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
        offset={ 112 }
        stickTo='left'
        title='Платёж запланирован'
        icon={ <IconCalendar theme='alfa-on-color' size='m' /> }
        onCloseTimeout={ () => {
            setState({ visible: false });
        } }
        onCloserClick={ () => {
            setState({ visible: false });
        } }
    >
        Платёж будет отправлен 31 февраля 2018 года
    </Notification>
</div>
```

Уведомление закрывается по клику снаружи компонента
```jsx
import Button from 'arui-feather/button';

initialState = {
    visible: false
};
<div>
    <Button onClick={ () => setState({ visible: !state.visible }) }>
        Сохранить как черновик
    </Button>
    <Notification
        visible={ state.visible }
        status='ok'
        offset={ 214 }
        stickTo='left'
        title='Черновик сохранен'
        onClickOutside={ () => {
            setState({ visible: false });
        } }
    >
        Можно вернуться к редактированию черновика позже
    </Notification>
</div>
```
