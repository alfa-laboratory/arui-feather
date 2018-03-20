/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */
/* eslint react/forbid-prop-types: 0 */

import Type from 'prop-types';

import Examples from '../examples';

function RulesTab(component) {
    const { props } = component;

    return (
        props.rules.length > 0 ? (
            <div className='content'>
                <Examples examples={ props.rules } name={ props.displayName } />
            </div>
        ) : (
            null
        )
    );
}

RulesTab.propTypes = {
    rules: Type.array.isRequired,
    displayName: Type.string.isRequired
};

export default RulesTab;
