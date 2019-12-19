Кнопка используется как триггер для выполнения определённого действия. Кнопка однозначно сообщает пользователю, что произойдёт после нажатия на неё.

### Главная кнопка
Обозначает ключевое действие. На экране может быть только одна главная кнопка.
```jsx
const buttons = [
    { size: 'xl', name: 'Оплатить' },
    { size: 'l', name: 'Оплатить' },
    { size: 'm', name: 'Оплатить' },
    { size: 's', name: 'Оплатить' }
];

<div>
    <div className='row'>
        {
            buttons.map(({ size, name }) => (
                <div className='column' key={ size }>
                    <Button view='extra' size={ size }>{ `${name}` }</Button>
                </div>
            ))
        }
    </div>
    <div className='row'>
        {
            buttons.map(({ size, name }) => (
                <div className='column' key={ size }>
                    <Button view='extra' size={ size } disabled={ true }>{ `${name}` }</Button>
                </div>
            ))
        }
    </div>
</div>
```

### Обычная кнопка
Встречается сплошь и рядом.
```jsx
const buttons = [
    { size: 'xl', name: 'Применить' },
    { size: 'l', name: 'Применить' },
    { size: 'm', name: 'Применить' },
    { size: 's', name: 'Применить' }
];

<div>
    <div className='row'>
        {
            buttons.map(({ size, name }) => (
                <div className='column' key={ size }>
                    <Button size={ size }>{ `${name}` }</Button>
                </div>
            ))
        }
    </div>
    <div className='row'>
        {
            buttons.map(({ size, name }) => (
                <div className='column' key={ size }>
                    <Button size={ size } disabled={ true }>{ `${name}` }</Button>
                </div>
            ))
        }
    </div>
</div>
```

### Псевдокнопка
Обозначает действие без перехода на другой экран. Например, прикрепление документов к анкете, переход в режим редактирования.
```jsx
const buttons = [
    { size: 'xl', name: 'Показать' },
    { size: 'l', name: 'Показать' },
    { size: 'm', name: 'Показать' },
    { size: 's', name: 'Показать' }
];

<div>
    <div className='row'>
        {
            buttons.map(({ size, name }) => (
                <div className='column' key={ size }>
                    <Button pseudo={ true } size={ size }>{ `${name}` }</Button>
                </div>
            ))
        }
    </div>
</div>
```

### С иконкой
К любой кнопке может быть добавлена иконка.
```jsx
const IconOk = require('../../src/icon/ui/ok').default;

const buttons = [
    { size: 'xl', name: 'Скачать' },
    { size: 'l', name: 'Скачать' },
    { size: 'm', name: 'Скачать' },
    { size: 's', name: 'Скачать' }
];

<div>
    <div className='row'>
        {
            buttons.map(({ size, name }) => (
                <div className='column' key={ size }>
                    <Button icon={ <IconOk size={ size } /> } size={ size }>{ `${name}` }</Button>
                </div>
            ))
        }
    </div>
    <div className='row'>
        <Button width='available' icon={ <IconOk size='xl' /> } size='xl'>Кнопка с иконкой</Button>
    </div>
</div>
```

### Со 100% шириной
Используйте очень аккуратно. Кнопка занимает 100% ширины контейнера, в котором находится.
```jsx
const buttons = [
    { size: 'xl', name: 'Заказать карту' },
    { size: 'l', name: 'Заказать карту' },
    { size: 'm', name: 'Заказать карту' },
    { size: 's', name: 'Заказать карту' }
];

<div>
    {
        buttons.map(({ size, name }) => (
            <div className='row' key={ size }>
                <Button width='available' size={ size }>{ `${name}` }</Button>
            </div>
        ))
    }
</div>
```


### Кнопка со скруглёнными углами
Для применения на продуктовых лендингах
```jsx
const buttons = [
    { size: 'xl', name: 'Продолжить' },
    { size: 'l', name: 'Продолжить' },
    { size: 'm', name: 'Продолжить' },
    { size: 's', name: 'Продолжить' }
];

<div>
    <div className='row'>
        {
            buttons.map(({ size, name }) => (
                <div className='column' key={ size }>
                    <Button view='rounded' size={ size }>{ `${name}` }</Button>
                </div>
            ))
        }
    </div>
    <div className='row'>
        {
            buttons.map(({ size, name }) => (
                <div className='column' key={ size }>
                    <Button view='rounded' size={ size } disabled={ true }>{ `${name}` }</Button>
                </div>
            ))
        }
    </div>
</div>
```


===RULES===


### Передовой опыт

- Название кнопки формулируется чётко и однозначно.
- Для названий кнопок используется совершенный вид инфинитива. «Добавить в корзину», «Оплатить штраф», «Купить кефир».
- На экране может быть только одно ключевое действие. Остальные призывы к действию должны быть представлены в виде обычных кнопок.

### Правила

1. Кнопки используются для обозначения и выбора **действий**. Например, «Добавить документ», «Удалить запись», «Оплатить налог» и других. Не используйте кнопки в качестве навигационных элементов. Для этого существуют ссылки, которые только переводят пользователя на новую страницу, но не запускают при этом действие.

2. Назначение кнопки должно быть понятным из её названия или контекста использования, а поведение — предсказуемым. Не вводите пользователей в заблуждение.

  <Rules className='rules'>
    <span className='rules__section rules__section_good'>
      - Открыть депозит
      - Оплатить
    </span>
    <span className='rules__section rules__section_bad'>
      - Новый депозит
      - OK
    </span>
  </Rules>

3. Любую кнопку можно выбрать с клавиатуры с помощью табуляции. Когда кнопка попадает в фокус, вокруг неё появляется рамка. В этом состоянии на кнопку можно нажать с помощью клавиши Enter.
