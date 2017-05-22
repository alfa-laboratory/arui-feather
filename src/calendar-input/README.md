```
class CalendarInputWithState extends React.Component {
    constructor(props){
        super(props);
        this.state = { date: '01.02.2016' };
    }
    
    render() {
        return(
            <CalendarInput
                size={ this.props.size }
                value={ this.state.date }
                onInputChange={ (val) => this.handleCalendarChange(val) }
                onCalendarChange={ (val) => this.handleCalendarChange(val) }
            />
        );
    }

    handleCalendarChange(newDate) {
        this.setState({
            date: newDate
        });
    }
}
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div key={ size }>
            <CalendarInputWithState size={ size } />
        </div>
    ))}
</div>
```

```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div key={ size }>
            <CalendarInput size={ size } error='something went wrong' />
        </div>
    ))}
</div>
```

```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div key={ size }>
            <CalendarInput size={ size } width='available' />
        </div>
    ))}
</div>
```
