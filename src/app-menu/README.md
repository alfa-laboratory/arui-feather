```
const PreviewFrame = require('../../arui-demo/components/preview-frame').default;
<PreviewFrame>
    <Page header={ <Header /> } footer={ <Footer /> }>
        <AppTitle>
            <Heading>Заголовок страницы</Heading>
        </AppTitle>
        <AppMenu>
            <Menu
                view='horizontal'
                content={ [
                    { content: 'Раздел 1', value: 'section1' },
                    { content: 'Раздел 2', value: 'section2' },
                    { content: 'Раздел 3', value: 'section3' },
                    { content: 'Раздел 4', value: 'section4' },
                    { content: 'Раздел 5', value: 'section5' },
                    { content: 'Раздел 6', value: 'section6' }
                ] }
            />
        </AppMenu>
        <AppContent>
            <Paragraph>Контент страницы...</Paragraph>
        </AppContent>
    </Page>
</PreviewFrame>
```