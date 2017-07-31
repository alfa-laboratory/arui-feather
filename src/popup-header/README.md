```
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
                <div>
                    {['s', 'm', 'l', 'xl'].map(size => (
                        <PopupHeader
                            size={ size }
                            title='Заголовок'
                        />
                    ))}
                </div>
                <div>
                    <Button
                        ref={ (target) => { this.target = target; } }
                        size='m'
                        onClick={ () => { this.setState({ popup: !this.state.popup }); } }
                    >
                        Click me
                    </Button>
                    <Popup
                        ref={ (popup) => { this.popup = popup; } }
                        directions={ ['top-center', 'bottom-center'] }
                        size='m'
                        type='tooltip'
                        header={ (
                            <PopupHeader
                                size='m'
                                title='График работы'
                                onCloseClick={ () => { this.setState({ popup: false }); } }
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
