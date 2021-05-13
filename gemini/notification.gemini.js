import Notification from '../src/notification';
import { OkColorIcon } from '../gemini-utils/ok-icon';

const NAME = 'notification';

const PROP_SETS = [
    {
        visible: true,
        status: 'ok',
        offset: 10,
        stickTo: 'left',
        title: 'Notification title',
    },
    {
        visible: true,
        status: 'fail',
        offset: 10,
        stickTo: 'left',
    },
    {
        visible: true,
        status: 'error',
        offset: 10,
        stickTo: 'left',
    },
    {
        visible: true,
        icon: <OkColorIcon size="m" />,
        status: 'ok',
        offset: 10,
        stickTo: 'left',
    },
];

geminiReact.suite(NAME, () => {
    PROP_SETS.forEach((set, index) => {
        const selector = `${NAME}_prop-set_${index + 1}`;

        geminiReact.suite(selector, (suite) => {
            const props = { ...set };
            const template = (
                <Notification { ...props }>
                    Notification message
                </Notification>
            );

            suite
                .setExtraCaptureElements(['.notification'])
                .render(template)
                .capture('plain');
        });
    });
});
