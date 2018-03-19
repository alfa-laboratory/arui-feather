import Type from 'prop-types';

import Examples from '../examples';

const ExamplePlaceholder = process.env.STYLEGUIDIST_ENV !== 'production'
    ? require('react-styleguidist/lib/rsg-components/ExamplePlaceholder').default
    : () => <div />;

function RulesTab(component) {
    let { props } = component;
    return (
        props.rules.length > 0 ? (
            <Examples examples={ props.rules } name={ props.displayName } />
        ) : (
            <ExamplePlaceholder name={ props.displayName } />
        )
    );
}

RulesTab.propTypes = {
    props: Type.shape({
        rules: Type.array.isRequired,
        displayName: Type.string.isRequired
    })
};

export default RulesTab;
