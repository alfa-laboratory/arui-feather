
import { Component, ReactNode } from 'react';




export interface ErrorPageProps {

    /**
     * Заголовок ошибки
     */
    title?: string;
    /**
     * Сообщение ошибки
     */
    text?: string;
    /**
     * Шапка страницы
     */
    header?: ReactNode;
    /**
     * href для ссылки 'Вернуться в интернет-банк'
     */
    returnUrl?: string;
    /**
     * Альтернативный текст для ссылки 'Вернуться в интернет-банк'
     */
    returnTitle?: string;
}



/**
 * Компонент страницы ошибки.
Как правило является корневым компонентом страницы.
Используется вместо компонента Page.

```javascript
import ErrorPage from 'arui-feather/error-page';
import Header from 'arui-feather/header';

<ErrorPage
 returnUrl='/login'
 header={ <Header /> }
/>
```
 */

export default class ErrorPage extends Component<ErrorPageProps, any> {

}
