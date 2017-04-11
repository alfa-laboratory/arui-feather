import ErrorPage from '../src/error-page/error-page';
import Header from '../src/header/header';

const NAME = 'error-page';

geminiReact.suite(NAME, function (suite) {
    let props = { returnUrl: '/login', header: <Header /> };
    let template = (
        <ErrorPage { ...props } />
    );

    suite
        .before(function (actions) {
            actions.executeJS(function () {
                document.body.firstElementChild.id = 'react-app';
            });
        })
        .render(template)
        .capture('plain');
});
