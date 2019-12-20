```jsx
import Button from 'arui-feather/button';
import Popup from 'arui-feather/popup';

class PopupHeaderDemo extends React.Component {
    constructor() {
        super();
        this.state = {
            popup: false
        };

        this.popup;
        this.target;
    }

    componentDidMount() {
        this.popup.setTarget(this.target.control);
    }

    render() {
        return (
            <div>
                <div className='row'>
                    <div style={ { width: '100%' } }>
                        { ['s', 'm', 'l', 'xl'].map(size => (
                            <PopupHeader
                                key={ size }
                                size={ size }
                                title='Заголовок'
                            />
                        )) }
                    </div>
                </div>
                <div className='row'>
                    <Button
                        ref={ (target) => {
                            this.target = target;
                        } }
                        size='m'
                        onClick={ () => {
                            this.setState({ popup: !this.state.popup });
                        } }
                    >
                        Узнать время работы
                    </Button>
                    <Popup
                        ref={ (popup) => {
                            this.popup = popup;
                        } }
                        directions={ ['top-center', 'bottom-center'] }
                        size='m'
                        type='tooltip'
                        header={ (
                            <PopupHeader
                                size='m'
                                title='График работы'
                                onCloserClick={ () => {
                                    this.setState({ popup: false });
                                } }
                            />
                        ) }
                        visible={ this.state.popup }
                    >
                        <table>
                            <tbody>
                                <tr>
                                    <td>пн-пт</td>
                                    <td>09:00&mdash;20:00</td>
                                </tr>
                                <tr>
                                    <td>сб</td>
                                    <td>10:00&mdash;19:00</td>
                                </tr>
                                <tr>
                                    <td>вс</td>
                                    <td>выходной</td>
                                </tr>
                            </tbody>
                        </table>
                    </Popup>
                </div>
            </div>
        );
    }
}

<PopupHeaderDemo />

```
