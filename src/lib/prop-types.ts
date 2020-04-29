/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Функции объявленные в этом файле используются в сторонних либах для валидации propTypes в рантайме,
 * т.к. компоненты библиотеки могут использоваться в js, где нет проверок типов Typescript
 */

/**
 * Добавляет к type-checker для propType валидации метод isRequired
 *
 * @param validate оригинальный метод для валидации
 */
function createChainableTypeChecker(
    validate: (props: { [key: string]: any }, propName: string, componentName: string, location: string) => void,
) {
    function checkType(
        isRequired: boolean,
        props: { [key: string]: any },
        propName: string,
        componentName: string,
        location: string,
    ) {
        // eslint-disable-next-line no-param-reassign
        componentName = componentName || '';
        if (props[propName] === null || props[propName] === undefined) {
            if (isRequired) {
                return new Error(
                    `Required prop \`${propName}\` was not specified in \`${componentName}\`.`,
                );
            }

            return null;
        }

        return validate(props, propName, componentName, location);
    }

    const chainedCheckType = checkType.bind(null, false);

    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType as Function;
}

/**
 * Проверяет, является ли заданный prop инстансом HTMLElement
 *
 * @param props пропы компонента
 * @param propName имя пропса для валидации
 * @param componentName имя компонента
 */
function propTypeIsHtmlElement(props: { [key: string]: any }, propName: string, componentName: string): Error | null {
    if (!(props[propName] instanceof (typeof HTMLElement === 'undefined' ? {} as any : HTMLElement))) {
        return new Error(
            `Invalid prop \`${propName}\` supplied to \`${componentName}\`.
            Expected valid HTMLElement object, ${typeof props[propName]} given.`,
        );
    }

    return null;
}

/**
 * Враппер для prop-type валидаторов, позволяющий помечать prop как устаревший, сохраняя проверку типа
 *
 * @param propType оригинальный propType валидатор
 * @param message дополнительное сообщение
 */
export function deprecated(propType: Function, message: string): Function {
    let warned = false;

    return function (...args) {
        const [props, propName, componentName] = args;
        const prop = props[propName];

        if (prop !== undefined && prop !== null && !warned) {
            warned = true;
            if (process.env.NODE_ENV !== 'production') {
                // eslint-disable-next-line no-console
                console.warn(`Property '${propName}' of '${componentName}' is deprecated. ${message}`);
            }
        }

        return propType.call(this, ...args);
    };
}

/**
 * Враппер для prop-type валидатора, позволяющий пометить один из типов как устаревший.
 * В случае, если заданный prop будет соответствовать старому валидатору, но не будет
 * соответствовать новому - пользователь будет об этом предупрежден
 *
 * @param oldType валидатор для старого типа.
 * @param newType валидатор для нового типа.
 * @param message дополнительное сообщение
 */
export function deprecatedType(oldType: Function, newType: Function, message: string): Function {
    let warned = false;

    return function (...args) {
        const [, propName, componentName] = args;
        const oldResult = oldType.call(this, ...args);
        const newResult = newType.call(this, ...args);

        if (process.env.NODE_ENV !== 'production' && !oldResult && !warned && newResult) {
            warned = true;
            // eslint-disable-next-line no-console
            console.warn(`Given type of '${propName}' of '${componentName}' is deprecated. ${message}`);
        }

        return newResult;
    };
}

/**
 * Готовый prop-type валидатор для проверки, что значение переданное в проп является HtmlElement
 */
export const HtmlElement = createChainableTypeChecker(propTypeIsHtmlElement);

/**
 * Проверяет что значение пропса из заданного множества
 *
 * @param validationMapping множество допустимых значений пропса
 * @param controllingPropName имя контролируемого пропса
 */
export function createMappingPropValidator(validationMapping, controllingPropName) {
    return function validateProp(props: { [key: string]: any }, propName: string, componentName: string) {
        const controllingPropValue = props[controllingPropName];
        const controlledPropValue = props[propName];

        const propsDefined = controllingPropValue && controlledPropValue;
        const availableOptions = validationMapping[controllingPropValue];

        if (!propsDefined || !Array.isArray(availableOptions)) {
            return null;
        }

        const isValidProp = availableOptions.indexOf(props[propName]) !== -1;

        if (!isValidProp) {
            return new Error(`Invalid prop '${propName}' supplied to ${componentName}.
                Expected one of ${availableOptions} for prop '${controllingPropName}' equal to ${controllingPropValue}`);
        }

        return null;
    };
}
