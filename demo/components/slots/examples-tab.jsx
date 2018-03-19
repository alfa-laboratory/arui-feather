import Type from 'prop-types';

import Examples from '../examples';

const ExamplePlaceholder = process.env.STYLEGUIDIST_ENV !== 'production'
    ? require('react-styleguidist/lib/rsg-components/ExamplePlaceholder').default
    : () => <div />;

function ExamplesTab({ examples, name }) {
    return (
        examples.length > 0 ? (
            <Examples examples={ examples } name={ name } />
        ) : (
            <ExamplePlaceholder name={ name } />
        )
    );
}

ExamplesTab.propTypes = {
    examples: Type.array.isRequired,
    name: Type.string.isRequired
};

export default ExamplesTab;
