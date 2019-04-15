```jsx
import Button from 'arui-feather/button';
import Paragraph from 'arui-feather/paragraph';

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
        Как узнать дату и сумму платежа
    </Button>
    <div className='row' >
        <SlideDown isExpanded={ state.isExpanded }>
            <Paragraph>
                Узнать сумму платежа по кредиту с ежемесячным погашением равными частями вы
                можете из графика погашения, предоставленного при оформлении кредита.
            </Paragraph>
        </SlideDown>
    </div>
</div>
```
