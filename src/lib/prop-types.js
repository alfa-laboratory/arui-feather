/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

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

    let chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
}

function propTypeIsHtmlElement(props, propName, componentName) {
    if (!(props[propName] instanceof (typeof HTMLElement === 'undefined' ? {} : HTMLElement))) {
        return new Error(
            `Invalid prop \`${propName}\` supplied to \`${componentName}\`.
            Expected valid HTMLElement object, ${typeof props[propName]} given.`
        );
    }
    return null;
}

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

/**
 * Маппинг type - size свойств компонентов Checkbox и Radio.
 */
export const TYPE_SIZE_MAPPING = {
    button: ['s', 'm', 'l', 'xl'],
    normal: ['m', 'l']
};

export function checkSizeProp(props, propName, componentName) {
    const typeAndSizeDefined = props.type && props[propName];
    const availableSizes = TYPE_SIZE_MAPPING[props.type];
    if (!typeAndSizeDefined || !Array.isArray(availableSizes)) {
        return null;
    }

    const isSizeAvailableForThisType = availableSizes.indexOf(props[propName]) !== -1;
    if (!isSizeAvailableForThisType) {
        return new Error(`Invalid prop '${propName}' supplied to ${componentName}. 
            Expected one of ${availableSizes} for prop 'type' equal to ${props.type}`
        );
    }

    return null;
}
