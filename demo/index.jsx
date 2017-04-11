/* eslint global-require: 0 */
/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import RedBox from 'redbox-react';

const Demo = require('./demo').default;

const IS_PRODUCTION = (process.env.NODE_ENV === 'production');
const HOT_LOADER = !!process.HOT_LOADER;

if (!IS_PRODUCTION && HOT_LOADER) {
    ReactDOM.render(
        <AppContainer errorReporter={ RedBox }>
            <Demo />
        </AppContainer>,
        document.getElementById('react-app')
    );

    if (module.hot) {
        module.hot.accept('./demo', () => {
            const NextAssignments = require('./demo').default;

            ReactDOM.render(
                <AppContainer errorReporter={ RedBox }>
                    <NextAssignments />
                </AppContainer>,
                document.getElementById('react-app')
            );
        });
    }
} else {
    ReactDOM.render(<Demo />, document.getElementById('react-app'));
}
