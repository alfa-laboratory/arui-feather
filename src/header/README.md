```
const PreviewFrame = require('../../arui-demo/components/preview-frame').default;
<PreviewFrame style={{ height: '100px' }}>
    <Page header={ 
            <Header 
                user={
                    <User
                        url='#'
                        text='Клиент'
                    />
                }
                logo={
                    <img src='https://rawgit.com/alfa-laboratory/arui-feather/master/logo.svg' />
                }
                support={
                    <Support
                        city='Город'
                        phone='+7 123 123 12 31'
                    />
                }
            />
        }
    >
    </Page>
</PreviewFrame>
```
