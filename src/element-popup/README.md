Попап элемент

```jsx
const Icon = require('arui-feather/icon').default;
const Paragraph = require('arui-feather/paragraph').default;
const Button = require('arui-feather/button').default;
const RadioGroup = require('arui-feather/radio-group').default;
const Radio = require('arui-feather/radio').default;
const Label = require('arui-feather/label').default;

class ModalPopupElement extends React.Component {
    constructor() {
        this.state = {
            direction: 'top',
            subDirection: 'to-right',
            trigger: 'click'
        };
    }

    disabledIf(dir, subDir) {
        return ['top', 'bottom'].includes(dir) && ['to-top', 'to-bottom'].includes(subDir)
            || ['left', 'right'].includes(dir) && ['to-right', 'to-left'].includes(subDir);
    }

    render() {
        return (<div style={ { display: 'flex', alignItems: 'center', flexWrap: 'wrap' } }>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: 300, marginBottom: 50 }}>
            <div style={{ marginBottom: 30 }}>
              <Label size='m'>
                  Направлениие
              </Label>
            </div>
            <RadioGroup value={ this.state.direction } onChange={ text => this.setState({
                direction: text,
                subDirection: (['right', 'left'].includes(text) && !['to-bottom', 'to-top'].includes(this.state.subDirection))
                    ? 'to-bottom'
                    : (['top', 'bottom'].includes(text) && !['to-right', 'to-left'].includes(this.state.subDirection))
                        ? 'to-right'
                        : this.state.subDirection
            })}>
                {
                    ['top', 'bottom', 'right', 'left'].map(text => (
                        <Radio
                            text={ text }
                            key={ text }
                            value={ text }
                        />
                    ))
                }
            </RadioGroup>
            <div style={{ marginBottom: 30, marginTop: 30 }}>
              <Label size='m'>
                  Под направление
              </Label>
            </div>
            <RadioGroup value={ this.state.subDirection } onChange={ text => this.setState({subDirection: text})}>
                {
                    ['to-top', 'to-bottom', 'to-right', 'to-left'].map(text => (
                        <Radio
                            disabled={ this.disabledIf(this.state.direction, text) }
                            text={ text }
                            key={ text }
                            value={ text }
                        />
                    ))
                }
            </RadioGroup>
            <div style={{ marginBottom: 30, marginTop: 30 }}>
              <Label size='m'>
                  Триггер
              </Label>
            </div>
            <RadioGroup value={ this.state.trigger } onChange={ text => this.setState({trigger: text})}>
                {
                    ['click', 'hover'].map(text => (
                        <Radio
                            text={ text }
                            key={ text }
                            value={ text }
                        />
                    ))
                }
            </RadioGroup>
          </div>

          <ElementPopup
              content={ (
                  <div>
                      <Paragraph>
                          Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона
                      </Paragraph>
                  </div>
              ) }
              direction={ this.state.direction }
              subDirection={ this.state.subDirection }
              trigger={ this.state.trigger }
              mobileButtonText='Закрыть'
          >
              <Button text="Кнопка"/>
          </ElementPopup>
        </div>);
    }
}

<div>
    <ModalPopupElement />
</div>
```
