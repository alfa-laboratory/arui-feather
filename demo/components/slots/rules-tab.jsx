/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */
/* eslint react/forbid-prop-types: 0 */

import Type from 'prop-types';

import Examples from '../examples';

const ExamplePlaceholder = process.env.STYLEGUIDIST_ENV !== 'production'
    ? require('react-styleguidist/lib/rsg-components/ExamplePlaceholder').default
    : () => <div />;

function RulesTab(component) {
    const { props } = component;

    return (
        props.rules.length > 0 ? (
            <Examples examples={ props.rules } name={ props.displayName } />
        ) : (
            <ExamplePlaceholder name={ props.displayName } />
        )
    );
}

RulesTab.propTypes = {
    rules: Type.array.isRequired,
    displayName: Type.string.isRequired
};

export default RulesTab;
