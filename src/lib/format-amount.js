import { getCurrencySymbol } from './currency-codes';

export const THINSP = String.fromCharCode(8201); // &thinsp;
export const AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR = ',';

const AMOUNT_MAJOR_PARTS_SPLITTER = THINSP;
const AMOUNT_MAJOR_PART_SIZE = 3;
const AMOUNT_SPLIT_CODE_FROM = 4;
const NEGATIVE_AMOUNT_SYMBOL = '−';

/**
 * Дробит мажорную часть суммы на части по указанному символу.
 *
 * @param {String} amount Сумма для разбивки на части
 * @param {Number} [partSize=3] Размер частей суммы
 * @param {String} [splitter=THINSP] Символ, разбивающий части суммы
 * @param {String} [splitFrom=5] Длинна суммы, начиная с которой необходимо осуществлять разбивку. По-умолчанию длинна
 * равняется пяти по требованию гайдлайнов: https://design.alfabank.ru/patterns/amount. Пример: 2900 — не разбивается,
 * 29 000 — разбивается.
 * @returns {String}
 */
function splitAmount(amount, partSize = 3, splitter = THINSP, splitFrom = 5) {
    const len = amount.length;

    // Если длина суммы меньше требуемой, не форматируем сумму
    if (len < splitFrom) {
        return amount;
    }

    return amount
        .split('')
        .reduce((acc, item, i) => {
            const isLastItem = i !== len - 1;
            // eslint-disable-next-line no-mixed-operators
            const isStartOfPart = (i - (len % partSize) + 1) % partSize === 0;

            return isLastItem && isStartOfPart ? [...acc, item, splitter] : [...acc, item];
        }, [])
        .join('');
}

/**
 * Форматирует значение суммы.
 *
 * @typedef {Object} AmountProps Параметры суммы
 * @property {Number} amount.value Абсолютное значение суммы
 * @property {Object} amount.currency Параметры валюты
 * @property {String} amount.currency.code Код валюты
 * @property {Number} amount.currency.minority Количество минорных единиц валюты
 *
 * @typedef {Object} FormattedAmountProps Параметры форматированной суммы
 * @property {String} majorPart Мажорная часть суммы
 * @property {String} minorPart Минорная часть суммы
 * @property {String} value Валюта целиком
 * @property {String} currencySymbol Символ валюты
 *
 * @param {AmountProps} amount Параметры суммы
 * @returns {FormattedAmountProps}
 */
export function formatAmount(amount) {
    const {
        value,
        currency: { code }
    } = amount;

    let { minority } = amount.currency;

    minority = minority === 0 ? 1 : minority; // because Math.log(0) => -Infinity

    const fractionDigits = Math.log(minority) * Math.LOG10E;
    const valueAbsStr = (Math.abs(value) / minority).toFixed(fractionDigits);

    const [majorPart, minorPart] = valueAbsStr.split('.');

    const majorPartSplitted = splitAmount(
        majorPart,
        AMOUNT_MAJOR_PART_SIZE,
        AMOUNT_MAJOR_PARTS_SPLITTER,
        AMOUNT_SPLIT_CODE_FROM
    );

    const majorPartFormatted = value < 0 ? NEGATIVE_AMOUNT_SYMBOL + majorPartSplitted : majorPartSplitted;

    const formattedValueStr = minorPart
        ? majorPartFormatted + AMOUNT_MAJOR_MINOR_PARTS_SEPARATOR + minorPart
        : majorPartFormatted;

    return {
        majorPart: majorPartFormatted,
        minorPart,
        value: formattedValueStr,
        currencySymbol: getCurrencySymbol(code)
    };
}

/**
 * Форматирует значение суммы и возвращает в виде строки.
 * Использует функционал formatAmount
 *
 * @typedef {Object} AmountProps Параметры суммы
 * @property {Number} amount.value Абсолютное значение суммы
 * @property {Object} amount.currency Параметры валюты
 * @property {String} amount.currency.code Код валюты
 * @property {Number} amount.currency.minority Количество минорных единиц валюты
 *
 * @param {AmountProps} amount Параметры суммы
 * @returns {String} Форматированная сумма в виде строки
 */
export function formatAmountToString(amount) {
    const {
        value,
        currencySymbol
    } = formatAmount(amount);

    return `${value}${THINSP}${currencySymbol}`;
}
