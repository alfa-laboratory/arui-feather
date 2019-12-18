/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @ts-nocheck

/**
 * Добавляет к type-checker для propType валидации метод isRequired.
 *
 * @param {Function} validate Оригинальный метод для валидации
 * @returns {Function}
 */
function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName, location) {
        componentName = componentName || '';
        if (props[propName] === null || props[propName] === undefined) {
            if (isRequired) {
                return new Error(
                    `Required prop \`${propName}\` was not specified in \`${componentName}\`.`
                );
            }

            return null;
        }

        return validate(props, propName, componentName, location);
    }

    const chainedCheckType = checkType.bind(null, false);

    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
}

/**
 * Проверяет, является ли заданный prop инстансом HTMLElement.
 *
 * @param {Object} props Пропы компонента
 * @param {String} propName Имя пропса для валидации
 * @param {String} componentName Имя компонента
 * @returns {Error|null}
 */
function propTypeIsHtmlElement(props, propName, componentName) {
    if (!(props[propName] instanceof (typeof HTMLElement === 'undefined' ? {} : HTMLElement))) {
        return new Error(
            `Invalid prop \`${propName}\` supplied to \`${componentName}\`.
            Expected valid HTMLElement object, ${typeof props[propName]} given.`
        );
    }

    return null;
}

/**
 * Враппер для prop-type валидаторов, позволяющий помечать prop как устаревший, сохраняя проверку типа.
 *
 * @param {Function} propType Оригинальный propType валидатор.
 * @param {String} message Дополнительное сообщение.
 * @returns {function(...[*]): *}
 */
export function deprecated(propType, message) {
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
 * соответствовать новому - пользователь будет об этом предупрежден.
 *
 * @param {Function} oldType Валидатор для старого типа.
 * @param {Function} newType Валидатор для нового типа.
 * @param {String} message Дополнительное сообщение
 * @returns {Function}
 */
export function deprecatedType(oldType, newType, message) {
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

export const HtmlElement = createChainableTypeChecker(propTypeIsHtmlElement);

export function createMappingPropValidator(validationMapping, controllingPropName) {
    return function validateProp(props, propName, componentName) {
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
                Expected one of ${availableOptions} for prop '${controllingPropName}' equal to ${controllingPropValue}`
            );
        }

        return null;
    };
}
