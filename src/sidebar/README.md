Сайдбар
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
        <div style={ { marginBottom: 20 } }>
            <Input
                label='Куда отправить выписку?'
                size='m'
                placeholder='Адрес электронной почты'
            />
        </div>
        <Paragraph>
            100-дневный беспроцентный период начинается с момента образования задолженности по кредитной карте
            и возобновляется на следующий день после полного ее погашения. Беспроцентный период действует
            при условии внесения ежемесячного мин. платежа - 5% от суммы долга (мин. 320 руб.).
            Ставка - от 23,99% годовых, определяется индивидуально. Стоимость обслуживания карты - от 1190 р. до 6 990 руб.
            в год. АО «Альфа-Банк» не взимает комиссию за снятие наличных при месячном лимите снятия не более 50 000 руб.
            При снятии суммы выше лимита взимается комиссия на разницу в размере 3.9%-5,9%, мин. 300-500 руб.
            (зависит от категории карты). Банк оставляет за собой исключительное право на предоставление или отказ
            в предоставлении кредита. АО «Альфа-Банк». Ген. лицензия ЦБ РФ №1326 от 16.01.2015
        </Paragraph>
        <Paragraph>
            100-дневный беспроцентный период начинается с момента образования задолженности по кредитной карте
            и возобновляется на следующий день после полного ее погашения. Беспроцентный период действует
            при условии внесения ежемесячного мин. платежа - 5% от суммы долга (мин. 320 руб.).
            Ставка - от 23,99% годовых, определяется индивидуально. Стоимость обслуживания карты - от 1190 р. до 6 990 руб.
            в год. АО «Альфа-Банк» не взимает комиссию за снятие наличных при месячном лимите снятия не более 50 000 руб.
            При снятии суммы выше лимита взимается комиссия на разницу в размере 3.9%-5,9%, мин. 300-500 руб.
            (зависит от категории карты). Банк оставляет за собой исключительное право на предоставление или отказ
            в предоставлении кредита. АО «Альфа-Банк». Ген. лицензия ЦБ РФ №1326 от 16.01.2015
        </Paragraph>
        <Button size='m' view='extra'>Отправить</Button>
    </Sidebar>
</div>
```

Сайдбар с кнопкой в шапке сайдбара (используется только в мобильной версии)
```jsx
function toggleSidebar() {
    setState({ isOpen: !state.isOpen });
}
initialState = {
    isOpen: false
};
<div>
    <Button onClick={ toggleSidebar }>Фильтр</Button>
    <Sidebar
        headerContent={
            <button
                style={ {
                    margin: 0,
                    padding: 0,
                    border: 0,
                    background: 'none',
                    outline: 'none',
                    font: 'inherit',
                    cursor: 'pointer'
                } }
                onClick={ toggleSidebar }
            >
                Применить
            </button>
        }
        visible={ state.isOpen }
        onCloserClick={ toggleSidebar }
    >
        <div style={ { marginBottom: 40 } }>
            <Heading size='s'>
                Тип операции
            </Heading>
            <RadioGroup type='button'>
                {['Пополнение', 'Списание'].map(text => (
                    <Radio
                        text={ text }
                        key={ text }
                        value={ text }
                        type='button'
                    />
                ))}
            </RadioGroup>
        </div>
        <div style={ { marginBottom: 40 } }>
            <Heading size='s'>
                Счета
            </Heading>
            <CheckBoxGroup type='button'>
                {['Счёт ₽ ··2331', 'Счёт $ ··2331'].map(text => (
                    <CheckBox
                        text={ text }
                        key={ text }
                        value={ text }
                        type='button'
                    />
                ))}
            </CheckBoxGroup>
        </div>
        <div style={ { marginBottom: 40 } }>
            <Heading size='s'>
                Дата операции
            </Heading>
            <RadioGroup type='button'>
                {['День', 'Месяц', 'Год'].map(text => (
                    <Radio
                        text={ text }
                        key={ text }
                        value={ text }
                        type='button'
                    />
                ))}
            </RadioGroup>
        </div>
    </Sidebar>
</div>
```
