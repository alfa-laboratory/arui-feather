```
class PopupDemo extends React.Component {
    constructor() {
        super();
        this.state = {
            popup1: false,
            popup2: false,
            popup3: false,
            popup4: false,
            popup5: false
        };

        this.popup1;
        this.popup2;
        this.popup3;
        this.popup4;
        this.popup5;

        this.target1;
        this.target2;
        this.target3;
        this.target4;
        this.target5;
    }

    componentDidMount() {
        this.popup1.setTarget(this.target1.control);
        this.popup2.setTarget(this.target2.control);
        this.popup3.setTarget(this.target3.control);
        this.popup4.setTarget(this.target4.control);
        this.popup5.setTarget(this.target5.control);
    }

    render() {
        return (
            <div>
                <div className='row'>
                    <Button
                        ref={ (target) => { this.target1 = target; } }
                        size='s'
                        onClick={ () => { this.setState({ popup1: !this.state.popup1 }); } }
                    >
                        Click me
                    </Button>
                    <Popup
                        ref={ (popup) => { this.popup1 = popup; } }
                        directions={ ['top-center', 'bottom-center'] }
                        size='s'
                        type='tooltip'
                        visible={ this.state.popup1 }
                    >
                        Popup on top or bottom
                    </Popup>
                </div>
                <div className='row'>
                    <Button
                        ref={ (target) => { this.target2 = target; } }
                        size='l'
                        onMouseEnter={ () => { this.setState({ popup2: true }); } }
                        onMouseLeave={ () => { this.setState({ popup2: false }); } }
                    >
                        Hover me
                    </Button>
                    <Popup
                        ref={ (popup) => { this.popup2 = popup; } }
                        directions={ ['right-center', 'right-top', 'right-bottom'] }
                        size='l'
                        mainOffset={ 0 }
                        type='tooltip'
                        visible={ this.state.popup2 }
                        onMouseLeave={ () => { this.setState({ popup2: false }); } }
                        onMouseEnter={ () => { this.setState({ popup2: true }); } }
                    >
                        Popup
                    </Popup>
                </div>
                <div className='row'>
                    <Button
                        ref={ (target) => { this.target3 = target; } }
                        size='m'
                        onMouseEnter={ () => { this.setState({ popup3: true }); } }
                        onMouseLeave={ () => { this.setState({ popup3: false }); } }
                    >
                        Hover me
                    </Button>
                    <Popup
                        ref={ (popup) => { this.popup3 = popup; } }
                        height='available'
                        visible={ this.state.popup3 }
                        onMouseLeave={ () => { this.setState({ popup3: false }); } }
                        onMouseEnter={ () => { this.setState({ popup3: true }); } }
                    >
                        Popup with available height
                    </Popup>
                </div>
                <div className='row'>
                    <Button
                        ref={ (target) => { this.target4 = target; } }
                        size='m'
                        onMouseEnter={ () => { this.setState({ popup4: true }); } }
                        onMouseLeave={ () => { this.setState({ popup4: false }); } }
                    >
                        Hover me
                    </Button>
                    <Popup
                        ref={ (ref) => { this.popup4 = ref; } }
                        height='available'
                        directions={ ['right-center', 'right-top', 'right-bottom'] }
                        visible={ this.state.popup4 }
                        onMouseLeave={ () => { this.setState({ popup4: false }); } }
                        onMouseEnter={ () => { this.setState({ popup4: true }); } }
                    >
                        Popup with available height
                    </Popup>
                </div>
                <div className='row'>
                    <Button
                        ref={ (target) => { this.target5 = target; } }
                        size='m'
                        onClick={ () => { this.setState({ popup5: !this.state.popup5 }); } }
                    >
                        Click me
                    </Button>
                    <Popup
                        ref={ (popup) => { this.popup5 = popup; } }
                        autoclosable={ true }
                        visible={ this.state.popup5 }
                        onClickOutside={ () => { this.setState({ popup5: false }); } }
                    >
                        { 'Popup with autoclosable="true"' }
                    </Popup>
                </div>
            </div>
        );
    }
}

<PopupDemo />
```
