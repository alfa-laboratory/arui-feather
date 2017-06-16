```
const PreviewFrame = require('../../arui-demo/components/preview-frame').default;
<PreviewFrame>
    <Page header={ <Header /> } footer={ <Footer /> }>
        <AppTitle>
            <Heading>Заголовок страницы</Heading>
        </AppTitle>
        <AppMenu>
            <Menu />
        </AppMenu>
        <AppContent>
            <Paragraph>Контент страницы...</Paragraph>
        </AppContent>
    </Page>
</PreviewFrame>
```