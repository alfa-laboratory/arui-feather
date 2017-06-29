/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import bowser from 'bowser';
import { render, cleanUp, simulate } from '../test-utils';

import Select from './select';
import keyboardCode from '../lib/keyboard-code';

import { SCROLL_TO_CORRECTION } from '../vars';

const OPTIONS = [
    {
        value: 1,
        text: 'Vk',
        checkedText: 'Vkontakte'
    },
    {
        value: 2,
        text: 'Fb'
    },
    {
        value: 3,
        text: 'Tw',
        checkedText: 'Twitter'
    }
];

function renderSelect(props) {
    let select = render(
        <Select { ...props } />,
        {
            css: 'min-width: 9999px; min-height: 9999px; padding: 50px 0 0;'
        }
    );

    let nativeSelectNode = select.node.querySelector('.select__native-control');
    let buttonNode = select.node.querySelector('.select-button');
    let popupNode = document.querySelector('.popup');
    let menuNode = popupNode.querySelector('.select__menu');

    return { select, nativeSelectNode, popupNode, buttonNode, menuNode };
}

describe('select', () => {
    let originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = chai.spy();
    });

    afterEach(() => {
        cleanUp();
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problem', () => {
        let { select } = renderSelect({ options: OPTIONS });

        expect(select.node).to.exist;
    });

    it('should render popup with options', () => {
        let { select, popupNode } = renderSelect({ options: OPTIONS });

        expect(select.node).to.exist;
        expect(popupNode).to.have.class('popup');
    });

    it('should render hidden input', () => {
        let { select } = renderSelect({ options: OPTIONS });
        let hiddenInputNode = select.node.querySelector('input');

        expect(hiddenInputNode).to.exist;
    });

    it('should render hidden input with proper id attr', () => {
        let { select } = renderSelect({ options: OPTIONS, id: 'id' });
        let hiddenInputNode = select.node.querySelector('input');

        expect(hiddenInputNode).to.have.attr('id', 'id');
    });

    it('should render hidden input with proper name attr', () => {
        let { select } = renderSelect({ options: OPTIONS, name: 'name' });
        let hiddenInputNode = select.node.querySelector('input');

        expect(hiddenInputNode).to.have.attr('name', 'name');
    });

    it('should render hidden input with proper value attr', () => {
        let { select } = renderSelect({ options: OPTIONS, value: ['value'] });
        let hiddenInputNode = select.node.querySelector('input');

        expect(hiddenInputNode).to.have.attr('value', 'value');
    });

    it('should render with `label` from props', () => {
        let { select } = renderSelect({ options: OPTIONS, label: 'Label' });
        let topNode = select.node.querySelector('.select__top');

        expect(topNode).to.have.text('Label');
    });

    it('should render with `placeholder` from props', () => {
        let { buttonNode } = renderSelect({ options: OPTIONS, placeholder: 'Placeholder' });

        expect(buttonNode).to.have.text('Placeholder');
    });

    it('should render with `hint` from props', () => {
        let { select } = renderSelect({ options: OPTIONS, hint: 'Hint' });
        let subNode = select.node.querySelector('.select__sub');

        expect(subNode).to.have.text('Hint');
    });

    it('should render with `error` from props', () => {
        let { select } = renderSelect({ options: OPTIONS, error: 'Error' });
        let subNode = select.node.querySelector('.select__sub');

        expect(subNode).to.have.text('Error');
    });

    it('should set width to popup equal or more than button width', () => {
        let selectProps = {
            options: OPTIONS,
            placeholder: 'Long text placeholder',
            opened: true
        };

        let { popupNode, buttonNode } = renderSelect(selectProps);
        let popupWidth = popupNode.getBoundingClientRect().width;
        let buttonWidth = buttonNode.getBoundingClientRect().width;

        expect(popupWidth).to.be.at.least(buttonWidth);
    });

    it('should show multiply options', () => {
        let checkedOptions = [OPTIONS[1], OPTIONS[2]];
        let selectProps = {
            options: OPTIONS,
            value: [checkedOptions[0].value, checkedOptions[1].value]
        };
        let expectedOptions = checkedOptions.map(option => option.checkedText || option.text).join(', ');
        let { buttonNode } = renderSelect(selectProps);

        expect(buttonNode).to.have.text(expectedOptions);
    });

    it('should show checkedText of checked options in button if it is undefined', () => {
        let checkedOption = OPTIONS[0];
        let selectProps = {
            options: OPTIONS,
            value: [checkedOption.value]
        };
        let { buttonNode } = renderSelect(selectProps);

        expect(buttonNode).to.have.text(checkedOption.checkedText);
    });

    it('should set class on public focus method', (done) => {
        let { select } = renderSelect({ options: OPTIONS });

        select.instance.focus();

        setTimeout(() => {
            expect(select.node).to.have.class('select_focused');
            done();
        }, 0);
    });

    it('should unset class on public blur method', (done) => {
        let { select } = renderSelect({ options: OPTIONS });

        select.instance.focus();

        setTimeout(() => {
            expect(select.node).to.have.class('select_focused');

            select.instance.blur();

            setTimeout(() => {
                expect(select.node).to.not.have.class('select_focused');
                done();
            }, 0);
        }, 0);
    });

    it('should scroll window to element on public scrollTo method', (done) => {
        let { select } = renderSelect({ options: OPTIONS });
        let elemTopPosition = select.node.getBoundingClientRect().top;
        let elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        select.instance.scrollTo();

        setTimeout(() => {
            expect(window.scrollTo).to.have.been.called.with(0, elemScrollTo);

            done();
        }, 0);
    });

    it('should call `onClick` callback after button was clicked', () => {
        let onClick = chai.spy();
        let selectProps = { options: OPTIONS, onClick };
        let { buttonNode } = renderSelect(selectProps);

        buttonNode.click();

        expect(onClick).to.have.been.called.once;
    });

    it('should call `onChange` callback after option was clicked', () => {
        let onChange = chai.spy();
        let selectProps = {
            options: OPTIONS,
            onChange
        };
        let { popupNode } = renderSelect(selectProps);
        let firstOptionNode = popupNode.querySelector('.menu-item');

        firstOptionNode.click();

        expect(onChange).to.have.been.called.once;
    });

    // add after decorator update
    it('should call `onClickOutside` callback after click outside of open popup', (done) => {
        let onClickOutside = chai.spy();
        let selectProps = {
            options: OPTIONS,
            onClickOutside
        };
        let { select, buttonNode } = renderSelect(selectProps);
        let outsideElement = document.createElement('div');
        outsideElement.setAttribute('style',
            'width: 100px; height: 100px; position: absolute; left: 500px; top: 500px;'
        );
        outsideElement.setAttribute('id', 'outside');
        select.container.appendChild(outsideElement);

        buttonNode.click();

        setTimeout(() => {
            outsideElement.click();
            expect(onClickOutside).to.have.been.called.once;
            done();
        }, 0);
    });

    it('should call `onFocus` after button was clicked', (done) => {
        let onFocus = chai.spy();
        let { buttonNode } = renderSelect({ options: OPTIONS, onFocus });

        buttonNode.click();

        setTimeout(() => {
            expect(onFocus).to.have.been.called.once;
            done();
        }, 0);
    });

    it('should call `onBlur` after escape key was pressed', (done) => {
        let onBlur = chai.spy();
        let { buttonNode, menuNode } = renderSelect({ options: OPTIONS, onBlur });

        buttonNode.click();

        setTimeout(() => {
            simulate(menuNode, 'keyDown', { which: keyboardCode.ESCAPE });

            setTimeout(() => {
                expect(onBlur).to.have.been.called.once;
                done();
            }, 0);
        }, 0);
    });

    it('should receive event.target.value on `onFocus` callback', (done) => {
        let value = '';
        let onFocus = chai.spy((event) => { value = event.target.value; });
        let { select } = renderSelect({ value: [1, 2], options: OPTIONS, onFocus });

        select.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.called.once;
            expect(value).to.deep.equal([1, 2]);
            done();
        }, 0);
    });

    it('should receive event.target.value on `onBlur` callback', (done) => {
        let value = '';
        let onBlur = chai.spy((event) => { value = event.target.value; });
        let { select } = renderSelect({ value: [1, 2], options: OPTIONS, onBlur });

        select.instance.focus();

        setTimeout(() => {
            select.instance.blur();

            setTimeout(() => {
                expect(onBlur).to.have.been.called.once;
                expect(value).to.deep.equal([1, 2]);
                done();
            }, 0);
        }, 0);
    });

    if (bowser.mobile) {
        it('should render default placeholder text', () => {
            let selectProps = { options: OPTIONS };
            let { nativeSelectNode } = renderSelect(selectProps);
            let optGroup = nativeSelectNode.querySelector('optgroup');

            expect(optGroup).to.have.attr('label', 'Выберите:');
        });

        it('should render placeholder text from props', () => {
            let selectProps = { options: OPTIONS, placeholder: 'Select something' };
            let { nativeSelectNode } = renderSelect(selectProps);
            let optGroup = nativeSelectNode.querySelector('optgroup');

            expect(optGroup).to.have.attr('label', 'Select something');
        });
    } else {
        it('should set popup width equal to button width when equalPopupWidth = true', () => {
            let selectProps = {
                options: [
                    {
                        value: 1,
                        text: <div>Very long option text in block element to make select popup strech</div>
                    },
                    {
                        value: 2,
                        text: <div>
                            Much, much longer option text in another block element to make select popup strech
                        </div>
                    }
                ],
                equalPopupWidth: true,
                opened: true
            };

            let { popupNode, buttonNode } = renderSelect(selectProps);
            let popupWidth = popupNode.getBoundingClientRect().width;
            let buttonWidth = buttonNode.getBoundingClientRect().width;

            expect(popupWidth).to.be.equal(buttonWidth);
        });

        it('should call `onButtonFocus` after component was focused', (done) => {
            let onButtonFocus = chai.spy();
            let { select } = renderSelect({ options: OPTIONS, onButtonFocus });

            select.instance.focus();

            setTimeout(() => {
                expect(onButtonFocus).to.have.been.called.once;
                done();
            }, 0);
        });

        it('should call `onButtonBlur` after component was focused', (done) => {
            let onButtonBlur = chai.spy();
            let { select } = renderSelect({ options: OPTIONS, onButtonBlur });

            select.instance.focus();

            setTimeout(() => {
                select.instance.blur();

                setTimeout(() => {
                    expect(onButtonBlur).to.have.been.called.once;
                    done();
                }, 0);
            }, 0);
        });

        it('should call `onMenuFocus` after component was focused', (done) => {
            let onMenuFocus = chai.spy();
            let { select } = renderSelect({ options: OPTIONS, onMenuFocus });

            select.instance.focus();

            setTimeout(() => {
                expect(onMenuFocus).to.have.been.called.once;
                done();
            }, 0);
        });

        it('should call `onMenuBlur` after component was focused', (done) => {
            let onMenuBlur = chai.spy();
            let { select } = renderSelect({ options: OPTIONS, onMenuBlur });

            select.instance.focus();

            setTimeout(() => {
                select.instance.blur();

                setTimeout(() => {
                    expect(onMenuBlur).to.have.been.called.once;
                    done();
                }, 0);
            }, 0);
        });

        it('should receive event.target.value on `onButtonFocus` callback', (done) => {
            let value = '';
            let onButtonFocus = chai.spy((event) => { value = event.target.value; });
            let { select } = renderSelect({ value: [1, 2], options: OPTIONS, onButtonFocus });

            select.instance.focus();

            setTimeout(() => {
                expect(onButtonFocus).to.have.been.called.once;
                expect(value).to.deep.equal([1, 2]);
                done();
            }, 0);
        });

        it('should receive event.target.value on `onButtonBlur` callback', (done) => {
            let value = '';
            let onButtonBlur = chai.spy((event) => { value = event.target.value; });
            let { select } = renderSelect({ value: [1, 2], options: OPTIONS, onButtonBlur });

            select.instance.focus();

            setTimeout(() => {
                select.instance.blur();

                setTimeout(() => {
                    expect(onButtonBlur).to.have.been.called.once;
                    expect(value).to.deep.equal([1, 2]);
                    done();
                }, 0);
            }, 0);
        });

        it('should receive event.target.value on `onMenuFocus` callback', (done) => {
            let value = '';
            let onMenuFocus = chai.spy((event) => { value = event.target.value; });
            let { select } = renderSelect({ value: [1, 2], options: OPTIONS, onMenuFocus });

            select.instance.focus();

            setTimeout(() => {
                expect(onMenuFocus).to.have.been.called.once;
                expect(value).to.deep.equal([1, 2]);
                done();
            }, 0);
        });

        it('should receive event.target.value on `onMenuBlur` callback', (done) => {
            let value = '';
            let onMenuBlur = chai.spy((event) => { value = event.target.value; });
            let { select } = renderSelect({ value: [1, 2], options: OPTIONS, onMenuBlur });

            select.instance.focus();

            setTimeout(() => {
                select.instance.blur();

                setTimeout(() => {
                    expect(onMenuBlur).to.have.been.called.once;
                    expect(value).to.deep.equal([1, 2]);
                    done();
                }, 0);
            }, 0);
        });
    }
});
