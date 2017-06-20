```
class CalendarInputWithState extends React.Component {
    static propTypes = {
        size: React.propTypes.string
    }

    constructor(props) {
        super(props);
        this.state = { date: '01.02.2016' };
    }

    render() {
        return (
            <CalendarInput
                size={ this.props.size }
                value={ this.state.date }
                onInputChange={ val => this.handleCalendarChange(val) }
                onCalendarChange={ val => this.handleCalendarChange(val) }
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
        <div className='row' key={ size }>
            <CalendarInputWithState size={ size } />
        </div>
    ))}
</div>
```

```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div className='row' key={ size }>
            <CalendarInput size={ size } error='Что-то пошло не так' />
        </div>
    ))}
</div>
```

```
<div>
    {['s', 'm', 'l', 'xl'].map(size => (
        <div className='row' key={ size }>
            <CalendarInput size={ size } width='available' />
        </div>
    ))}
</div>
```
