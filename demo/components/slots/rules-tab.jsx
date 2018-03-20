/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */
/* eslint react/forbid-prop-types: 0 */

import Type from 'prop-types';

import Examples from '../examples';

function RulesTab(component) {
    const { props } = component;

    return (
        props.rules.length > 0 ? (
            <Examples examples={ props.rules } name={ props.displayName } />
        ) : (
            null
        )
    );
}

RulesTab.propTypes = {
    rules: Type.array,
    displayName: Type.string
};

export default RulesTab;
