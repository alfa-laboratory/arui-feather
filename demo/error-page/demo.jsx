import React from 'react';
import ErrorPage from '../../src/error-page';
import Header from '../../src/header';

import '../../src/main.css';

class Demo extends React.Component {
    render() {
        return (
            <ErrorPage
                returnUrl='/login'
                header={ <Header /> }
            />
        );
    }
}

export default Demo;
