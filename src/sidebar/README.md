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
        <Button size='m' view='extra'>Отправить</Button>
    </Sidebar>
</div>
```

Сайдбар с контентом в шапке сайдбара
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
        <div style={ { marginBottom: 20 } }>
            <Input
                label='Куда отправить выписку?'
                size='m'
                placeholder='Адрес электронной почты'
            />
        </div>
        <Button size='m' view='extra'>Отправить</Button>
    </Sidebar>
</div>
```

Сайдбар в котором всегда есть бордер в шапке сайдбара, по дефолту бордер появляется при скролле контента (актуально для мобильной версии)
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
        hasHeaderBorder={ true }
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
        <div style={ { marginBottom: 35 } }>
            <Button size='m' view='extra'>Отправить</Button>
        </div>
    </Sidebar>
</div>
```