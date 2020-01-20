```jsx
import Button from 'arui-feather/button';
import Paragraph from 'arui-feather/paragraph';
import Label from 'arui-feather/label';
import Link from 'arui-feather/link';

class PopupDemo extends React.Component {
    constructor() {
        super();
        this.state = {
            popup1: false,
            popup2: false,
            popup3: false,
            popup4: false,
            popup5: false,
            popup6: false,
            popup7: false
        };

        this.popup1;
        this.popup2;
        this.popup3;
        this.popup4;
        this.popup5;
        this.popup6;
        this.popup7;

        this.target1;
        this.target2;
        this.target3;
        this.target4;
        this.target5;
        this.target6;
        this.target7;
    }

    componentDidMount() {
        this.popup1.setTarget(this.target1.control);
        this.popup2.setTarget(this.target2.control);
        this.popup3.setTarget(this.target3.control);
        this.popup4.setTarget(this.target4.control);
        this.popup5.setTarget(this.target5.control);
        this.popup7.setTarget(this.target7.control);
    }

    render() {
        return (
            <div>
                <div className='row'>
                    <Button
                        ref={ (target) => {
                            this.target1 = target;
                        } }
                        size='s'
                        onClick={ () => {
                            this.setState({ popup1: !this.state.popup1 });
                        } }
                    >
                        Перейти на тариф
                    </Button>
                    <Popup
                        ref={ (popup) => {
                            this.popup1 = popup;
                        } }
                        directions={ ['top-center', 'bottom-center'] }
                        size='s'
                        type='tooltip'
                        visible={ this.state.popup1 }
                    >
                        Переход на этот тариф бесплатен
                    </Popup>
                </div>
                <div className='row'>
                    <Button
                        ref={ (target) => {
                            this.target2 = target;
                        } }
                        size='l'
                        onMouseEnter={ () => {
                            this.setState({ popup2: true });
                        } }
                        onMouseLeave={ () => {
                            this.setState({ popup2: false });
                        } }
                    >
                        Сколько стоит?
                    </Button>
                    <Popup
                        ref={ (popup) => {
                            this.popup2 = popup;
                        } }
                        directions={ ['right-center', 'right-top', 'right-bottom'] }
                        size='l'
                        mainOffset={ 0 }
                        type='tooltip'
                        visible={ this.state.popup2 }
                        onMouseLeave={ () => {
                            this.setState({ popup2: false });
                        } }
                        onMouseEnter={ () => {
                            this.setState({ popup2: true });
                        } }
                    >
                        2 400 ₽ в месяц при оплате за год
                    </Popup>
                </div>
                <div className='row'>
                    <Button
                        ref={ (target) => {
                            this.target3 = target;
                        } }
                        size='m'
                        onMouseEnter={ () => {
                            this.setState({ popup3: true });
                        } }
                        onMouseLeave={ () => {
                            this.setState({ popup3: false });
                        } }
                    >
                        Облачные бухгалтерии
                    </Button>
                    <Popup
                        ref={ (popup) => {
                            this.popup3 = popup;
                        } }
                        height='available'
                        visible={ this.state.popup3 }
                        onMouseLeave={ () => {
                            this.setState({ popup3: false });
                        } }
                        onMouseEnter={ () => {
                            this.setState({ popup3: true });
                        } }
                    >
                        <Paragraph view='normal'>
                            В настоящий момент в системе «Альфа-Бизнес Онлайн» реализована интеграция с облачными бухгалтериями <Link url='http://www.moedelo.org' text='«Мое дело»' />, <Link url='http://www.e-kontur.ru' text=' «Бухгалтерия.Контур»' /> и <Link url='http://www.b2b-center.ru/' text='«B2B-Center»' />. При подключении интеграции в Альфа-Бизнес Онлайн у сервисов «Мое дело», «Бухгалтерия.Контур», «B2B-Center» появится возможность автоматически создавать в Альфа-Бизнес Онлайн неподписанные платежные поручения и подгружать из «Альфа-Бизнес Онлайн» информацию о движениях по счетам. Уполномоченное лицо может подключить один аккаунт сервиса «Бухгалтерия.Контур» и (или) один аккаунт сервиса «Мое дело» только к одному Клиенту.
                        </Paragraph>
                    </Popup>
                </div>
                <div className='row'>
                    <Button
                        ref={ (target) => {
                            this.target4 = target;
                        } }
                        size='m'
                        onMouseEnter={ () => {
                            this.setState({ popup4: true });
                        } }
                        onMouseLeave={ () => {
                            this.setState({ popup4: false });
                        } }
                    >
                        Облачные бухгалтерии
                    </Button>
                    <Popup
                        ref={ (ref) => {
                            this.popup4 = ref;
                        } }
                        height='available'
                        directions={ ['right-center', 'right-top', 'right-bottom'] }
                        visible={ this.state.popup4 }
                        onMouseLeave={ () => {
                            this.setState({ popup4: false });
                        } }
                        onMouseEnter={ () => {
                            this.setState({ popup4: true });
                        } }
                    >
                        <Paragraph view='normal'>
                            В настоящий момент в системе «Альфа-Бизнес Онлайн» реализована интеграция с облачными бухгалтериями <Link url='http://www.moedelo.org' text='«Мое дело»' />, <Link url='http://www.e-kontur.ru' text='«Бухгалтерия.Контур»' /> и <Link url='http://www.b2b-center.ru/' text='«B2B-Center»' />. При подключении интеграции в Альфа-Бизнес Онлайн у сервисов «Мое дело», «Бухгалтерия.Контур», «B2B-Center» появится возможность автоматически создавать в Альфа-Бизнес Онлайн неподписанные платежные поручения и подгружать из «Альфа-Бизнес Онлайн» информацию о движениях по счетам. Уполномоченное лицо может подключить один аккаунт сервиса «Бухгалтерия.Контур» и (или) один аккаунт сервиса «Мое дело» только к одному Клиенту.
                        </Paragraph>
                    </Popup>
                </div>
                <div className='row'>
                    <Button
                        ref={ (target) => {
                            this.target5 = target;
                        } }
                        size='m'
                        onClick={ () => {
                            this.setState({ popup5: !this.state.popup5 });
                        } }
                    >
                        Сколько стоит?
                    </Button>
                    <Popup
                        ref={ (popup) => {
                            this.popup5 = popup;
                        } }
                        visible={ this.state.popup5 }
                        onClickOutside={ () => {
                            this.setState({ popup5: false });
                        } }
                    >
                        2 400 ₽ в месяц при оплате за год
                    </Popup>
                </div>
                <div className='row'>
                    <Button
                        ref={ (target) => {
                            this.target6 = target;
                        } }
                        size='m'
                        onClick={ () => {
                            this.setState({ popup6: !this.state.popup6 });
                        } }
                    >
                        Облачные бухгалтерии
                    </Button>
                    <Popup
                        ref={ (popup) => {
                            this.popup6 = popup;
                        } }
                        target='screen'
                        visible={ this.state.popup6 }
                    >
                        <Paragraph view='normal'>
                            В настоящий момент в системе «Альфа-Бизнес Онлайн» реализована интеграция с облачными бухгалтериями <Link url='http://www.moedelo.org' text='«Мое дело»' />, <Link url='http://www.e-kontur.ru' text='«Бухгалтерия.Контур»' /> и <Link url='http://www.b2b-center.ru/' text='«B2B-Center»' />. При подключении интеграции в Альфа-Бизнес Онлайн у сервисов «Мое дело», «Бухгалтерия.Контур», «B2B-Center» появится возможность автоматически создавать в Альфа-Бизнес Онлайн неподписанные платежные поручения и подгружать из «Альфа-Бизнес Онлайн» информацию о движениях по счетам. Уполномоченное лицо может подключить один аккаунт сервиса «Бухгалтерия.Контур» и (или) один аккаунт сервиса «Мое дело» только к одному Клиенту.
                        </Paragraph>
                        <Button
                            size='m'
                            onClick={ () => {
                                this.setState({ popup6: false });
                            } }
                        >
                            Ясно
                        </Button>
                    </Popup>
                </div>
                <div className='row'>
                    <Button
                        ref={ (target) => {
                            this.target7 = target;
                        } }
                        size='m'
                        onClick={ () => {
                            this.setState({ popup7: !this.state.popup7 });
                        } }
                    >
                        Сколько стоит
                    </Button>
                    <Popup
                        ref={ (popup) => {
                            this.popup7 = popup;
                        } }
                        padded={ true }
                        visible={ this.state.popup7 }
                        header={
                            <div className='popup__content'>
                                <Label><b>При оплате за год</b></Label>
                            </div>
                        }
                        onClickOutside={ () => {
                            this.setState({ popup7: false });
                        } }
                    >
                        <Label>2 400 ₽ в месяц</Label>
                    </Popup>
                </div>
            </div>
        );
    }
}

<PopupDemo />
```
