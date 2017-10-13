import Sidebar from '../src/sidebar';

const NAME = 'sidebar';
const THEMES = ['alfa-on-color', 'alfa-on-white'];

const PROP_SETS = [
    {},
    { hasOverlay: false, hasCloser: false },
    { hasOverlay: false, hasCloser: false, hasHeaderBorder: true },
    { hasOverlay: false, hasCloser: true, hasHeaderBorder: true }
];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let themeSelector = `${NAME}_theme_${theme}`;

        PROP_SETS.forEach((set, index) => {
            let selector = `${themeSelector}.${NAME}_prop-set_${index + 1}`;

            geminiReact.suite(selector, function (suite) {
                let props = { theme, ...set, visible: true };
                let template = (
                    <Sidebar { ...props }>
                        100-дневный беспроцентный период начинается с момента образования задолженности по
                        кредитной карте и возобновляется на следующий день после полного ее погашения.
                        Беспроцентный период действует при условии внесения ежемесячного мин. платежа - 5% от
                        суммы долга (мин. 320 руб.). Ставка - от 23,99% годовых, определяется индивидуально.
                        Стоимость обслуживания карты - от 1190 р. до 6 990 руб. в год. АО «Альфа-Банк» не взимает
                        комиссию за снятие наличных при месячном лимите снятия не более 50 000 руб. При снятии суммы
                        выше лимита взимается комиссия на разницу в размере 3.9%-5,9%, мин. 300-500 руб. (зависит
                        от категории карты). Банк оставляет за собой исключительное право на предоставление
                        или отказ в предоставлении кредита. АО «Альфа-Банк». Ген. лицензия ЦБ РФ №1326
                        от 16.01.2015
                    </Sidebar>
                );

                suite
                    .setExtraCaptureElements(!set.hasOverlay ? [`.${NAME}`] : ['body'])
                    .render(template)
                    .capture('plain');
            });
        });
    });
});
