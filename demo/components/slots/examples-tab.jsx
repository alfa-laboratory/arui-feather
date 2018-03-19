import Type from 'prop-types';

import Examples from '../examples';

const ExamplePlaceholder = process.env.STYLEGUIDIST_ENV !== 'production'
    ? require('react-styleguidist/lib/rsg-components/ExamplePlaceholder').default
    : () => <div />;

function ExamplesTab(component) {
    let { props } = component;

    return (
        props.examples.length > 0 ? (
            <Examples examples={ props.examples } name={ props.displayName } />
        ) : (
            <ExamplePlaceholder name={ props.displayName } />
        )
    );
}

ExamplesTab.propTypes = {
    props: Type.shape({
        examples: Type.array.isRequired,
        displayName: Type.string.isRequired
    })
};

export default ExamplesTab;
