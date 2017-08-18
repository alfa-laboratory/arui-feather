Данные пример демонстрирует использование компонентов Page, Header, AppTitle, AppMenu, AppContent, Footer 
```jsx
const PreviewFrame = require('../../demo/components/preview-frame').default;

<PreviewFrame>
    <Page
        header={
            <Header
                user={
                    <User
                        url='#'
                        text='Иванов Пётр Евгеньевич'
                    />
                }
                support={
                    <Support
                        city='Москва'
                        phone='+7 495 78-888-78'
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
                Кредитная карта Альфа Банка - это карта систем MasterCard и VISA, золотая, платиновая или самая обычная, с чипом и с бесконтактной системой оплаты, в индивидуальном дизайне или в строгой классике. А также и Метрокарта, которая позволяет оплачивать бесконтактно поездки в московском метрополитене.
            </Paragraph>
        </AppContent>
    </Page>
</PreviewFrame>
```