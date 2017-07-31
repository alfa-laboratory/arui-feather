Данные пример демонстрирует использование компонентов Page, Header, AppTitle, AppMenu, AppContent, Footer 
```jsx
const PreviewFrame = require('../../arui-demo/components/preview-frame').default;

<PreviewFrame>
    <Page
        header={
            <Header
                user={
                    <User
                        url='#'
                        text='Иванов Иван Иванович'
                    />
                }
                support={
                    <Support
                        city='Москва'
                        phone='+7 123 123 12 31'
                    />
                }
                menu={
                    <Menu
                        view='horizontal'
                        content={ [
                            { content: 'Банковские карты и переводы', value: 'section1' },
                            { content: 'Вклады и инвестиции', value: 'section2' }
                        ] }
                    />
                }
            />
        }
        footer={
            <Footer />
        }
    >
        <AppTitle>
            <Heading>Кредитные карты и кредиты</Heading>
        </AppTitle>
        <AppMenu>
            <Menu
                view='horizontal'
                content={ [
                    { content: 'Кредитные карты', value: 'section1' },
                    { content: 'Кредиты наличными', value: 'section2' }
                ] }
            />
        </AppMenu>
        <AppContent>
            <Paragraph>
                Головной офис Альфа-Банка располагается в&nbsp;Москве.
                В&nbsp;Альфа-Банке работает около 21 тысячи сотрудников.
                В&nbsp;2014 году в&nbsp;связи с&nbsp;принятием Банком России решения
                о&nbsp;санации и&nbsp;победой на&nbsp;тендере, в&nbsp;состав Банковской Группы «Альфа-Банк»
                вошел ПАО «Балтийский Банк». Прямыми акционерами Альфа-Банка являются
                российская компания АО «АБ Холдинг», которая владеет более 99% акций банка,
                и&nbsp;кипрская компания «ALFA CAPITAL HOLDINGS (CYPRUS) LIMITED», в&nbsp;распоряжении
                которой менее 1% акций банка.
            </Paragraph>
        </AppContent>
    </Page>
</PreviewFrame>
```