import Paragpaph from '../src/paragraph';
import Sidebar from '../src/sidebar';
import ThemeProvider from '../src/theme-provider';

const NAME = 'sidebar';
const THEMES = ['alfa-on-color', 'alfa-on-white'];

const PROP_SETS = [
    {},
    { hasOverlay: true, hasCloser: false },
    { hasOverlay: true, hasCloser: true }
];

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        const themeSelector = `${NAME}_theme_${theme}`;

        PROP_SETS.forEach((set, index) => {
            const selector = `${themeSelector}.${NAME}_prop-set_${index + 1}`;

            geminiReact.suite(selector, (suite) => {
                const props = { theme, ...set, visible: true };
                const template = (
                    <ThemeProvider theme={ theme }>
                        <Sidebar { ...props }>
                            <Paragpaph>
                                100-дневный беспроцентный период начинается с момента образования задолженности по
                                кредитной карте и возобновляется на следующий день после полного ее погашения.
                                Беспроцентный период действует при условии внесения ежемесячного мин. платежа - 5% от
                                суммы долга (мин. 320 руб.). Ставка - от 23,99% годовых, определяется индивидуально.
                                Стоимость обслуживания карты - от 1190 р. до 6 990 руб. в год. АО «Альфа-Банк» не
                                взимает комиссию за снятие наличных при месячном лимите снятия не более 50 000 руб.
                                При снятии суммы выше лимита взимается комиссия на разницу в размере 3.9%-5,9%, мин.
                                300-500 руб. (зависит от категории карты). Банк оставляет за собой исключительное право
                                на предоставление или отказ в предоставлении кредита. АО «Альфа-Банк». Ген. лицензия ЦБ
                                РФ №1326 от 16.01.2015
                            </Paragpaph>
                        </Sidebar>
                    </ThemeProvider>
                );

                suite
                    .setExtraCaptureElements(set.hasOverlay === false ? [`.${NAME}`] : ['body'])
                    .render(template)
                    .capture('plain');
            });
        });
    });
});
