```jsx
const LOREM_IPSUM = require('../vars').LOREM_IPSUM;

function handleSlideDownToggle() {
    setState({ isExpanded: !state.isExpanded });
}
initialState = {
    isExpanded: false
};
<div>
    <Button
        onClick={ handleSlideDownToggle }
    >
        Toggle slide down
    </Button>
    <div className='row' >
        <SlideDown isExpanded={ state.isExpanded }>
            <Paragraph>
                { LOREM_IPSUM.slice(0, 3) }
            </Paragraph>
        </SlideDown>
    </div>
</div>
```