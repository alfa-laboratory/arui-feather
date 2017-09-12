/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import bowser from 'bowser';
import { render, cleanUp, simulate, eventPersist } from '../test-utils';

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
    let select = render(<Select { ...props } />);

    let nativeSelectNode = select.node.querySelector('.select__native-control');
    let buttonNode = select.node.querySelector('.select-button');
    let popupNode = document.querySelector('.popup');
    let menuNode = popupNode ? popupNode.querySelector('.select__menu') : null;

    return { select, nativeSelectNode, popupNode, buttonNode, menuNode };
}

describe('select', () => {
    let originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = sinon.spy();
    });

    afterEach(() => {
        cleanUp();
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problem', () => {
        let { select } = renderSelect({ options: OPTIONS });

        expect(select.node).to.exist;
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

    it('should show multiple options', () => {
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
            expect(select.node).to.have.class('select_opened');
            done();
        }, 0);
    });

    it('should unset class on public blur method', (done) => {
        let { select } = renderSelect({ options: OPTIONS });

        select.instance.focus();

        setTimeout(() => {
            expect(select.node).to.have.class('select_opened');

            select.instance.blur();

            setTimeout(() => {
                expect(select.node).to.not.have.class('select_opened');
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
            expect(window.scrollTo).to.have.been.calledWith(0, elemScrollTo);

            done();
        }, 0);
    });

    it('should call `onClick` callback after button was clicked', () => {
        let onClick = sinon.spy();
        let selectProps = { options: OPTIONS, onClick };
        let { buttonNode } = renderSelect(selectProps);

        buttonNode.click();

        expect(onClick).to.have.been.calledOnce;
    });

    it('should call `onChange` callback after option was clicked', () => {
        let onChange = sinon.spy();
        let selectProps = {
            options: OPTIONS,
            onChange
        };
        let { popupNode } = renderSelect(selectProps);
        let firstOptionNode = popupNode.querySelector('.menu-item');

        firstOptionNode.click();

        expect(onChange).to.have.been.calledOnce;
    });

    it('should receive event.target.value on `onFocus` callback', (done) => {
        let onFocus = sinon.spy(eventPersist);
        let { select } = renderSelect({ value: [1, 2], options: OPTIONS, onFocus });
        select.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.calledOnce;
            expect(onFocus).to.have.been.calledWith(sinon.match({ target: { value: [1, 2] } }));
            done();
        }, 0);
    });

    it('should receive event.target.value on `onBlur` callback', (done) => {
        let onBlur = sinon.spy(eventPersist);
        let { select } = renderSelect({ value: [1, 2], options: OPTIONS, onBlur });

        select.instance.focus();

        setTimeout(() => {
            select.instance.blur();

            setTimeout(() => {
                expect(onBlur).to.have.been.calledOnce;
                expect(onBlur).to.have.been.calledWith(sinon.match({ target: { value: [1, 2] } }));
                done();
            }, 0);
        }, 0);
    });

    it('should set `checked` class when item is selected', () => {
        let checkedOption = OPTIONS[0];
        let selectProps = {
            options: OPTIONS,
            value: [checkedOption.value]
        };
        let { select } = renderSelect(selectProps);

        expect(select.node).to.have.class('select_checked');
    });

    it('should set `checked` class when item is selected and select type is `radio`', () => {
        let checkedOption = OPTIONS[0];
        let selectProps = {
            mode: 'radio',
            options: OPTIONS,
            value: [checkedOption.value]
        };
        let { select } = renderSelect(selectProps);

        expect(select.node).to.have.class('select_checked');
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

        it('should render popup when mobileMenuMode = popup', () => {
            let selectProps = {
                options: OPTIONS,
                mobileMenuMode: 'popup',
                opened: true
            };
            let { nativeSelectNode, popupNode } = renderSelect(selectProps);

            expect(nativeSelectNode).to.not.exist;
            expect(popupNode).to.have.class('popup');
        });

        it('should call `onFocus` after native select was focused', (done) => {
            let onFocus = sinon.spy();
            let { nativeSelectNode } = renderSelect({ options: OPTIONS, onFocus });

            nativeSelectNode.focus();

            setTimeout(() => {
                expect(onFocus).to.have.been.calledOnce;
                done();
            }, 0);
        });

        it('should call `onBlur` after native select was blurred', (done) => {
            let onBlur = sinon.spy();
            let { nativeSelectNode } = renderSelect({ options: OPTIONS, onBlur });

            nativeSelectNode.focus();

            setTimeout(() => {
                nativeSelectNode.blur();

                setTimeout(() => {
                    expect(onBlur).to.have.been.calledOnce;
                    done();
                }, 0);
            }, 0);
        });
    } else {
        it('should render popup with options', () => {
            let { select, popupNode } = renderSelect({ options: OPTIONS });

            expect(select.node).to.exist;
            expect(popupNode).to.have.class('popup');
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

        it('should call `onFocus` after button was clicked', (done) => {
            let onFocus = sinon.spy();
            let { buttonNode } = renderSelect({ options: OPTIONS, onFocus });

            buttonNode.click();

            setTimeout(() => {
                expect(onFocus).to.have.been.calledOnce;
                done();
            }, 0);
        });

        it('should call `onBlur` after escape key was pressed', (done) => {
            let onBlur = sinon.spy();
            let { buttonNode, menuNode } = renderSelect({ options: OPTIONS, onBlur });

            buttonNode.click();

            setTimeout(() => {
                simulate(menuNode, 'keyDown', { which: keyboardCode.ESCAPE });

                setTimeout(() => {
                    expect(onBlur).to.have.been.calledOnce;
                    done();
                }, 0);
            }, 0);
        });

        it('should call `onButtonFocus` after component was focused', (done) => {
            let onButtonFocus = sinon.spy();
            let { select } = renderSelect({ options: OPTIONS, onButtonFocus });

            select.instance.focus();

            setTimeout(() => {
                expect(onButtonFocus).to.have.been.calledOnce;
                done();
            }, 0);
        });

        it('should call `onButtonBlur` after component was focused', (done) => {
            let onButtonBlur = sinon.spy();
            let { select } = renderSelect({ options: OPTIONS, onButtonBlur });

            select.instance.focus();

            setTimeout(() => {
                select.instance.blur();

                setTimeout(() => {
                    expect(onButtonBlur).to.have.been.calledOnce;
                    done();
                }, 0);
            }, 0);
        });

        it('should call `onMenuFocus` after component was focused', (done) => {
            let onMenuFocus = sinon.spy();
            let { select } = renderSelect({ options: OPTIONS, onMenuFocus });

            select.instance.focus();

            setTimeout(() => {
                expect(onMenuFocus).to.have.been.calledOnce;
                done();
            }, 0);
        });

        it('should call `onMenuBlur` after component was focused', (done) => {
            let onMenuBlur = sinon.spy();
            let { select } = renderSelect({ options: OPTIONS, onMenuBlur });

            select.instance.focus();

            setTimeout(() => {
                select.instance.blur();

                setTimeout(() => {
                    expect(onMenuBlur).to.have.been.calledOnce;
                    done();
                }, 0);
            }, 0);
        });

        it('should receive event.target.value on `onButtonFocus` callback', (done) => {
            let onButtonFocus = sinon.spy();
            let { select } = renderSelect({ value: [1, 2], options: OPTIONS, onButtonFocus });

            select.instance.focus();

            setTimeout(() => {
                expect(onButtonFocus).to.have.been.calledOnce;
                expect(onButtonFocus).to.have.been.calledWith(sinon.match({ target: { value: [1, 2] } }));
                done();
            }, 0);
        });

        it('should receive event.target.value on `onButtonBlur` callback', (done) => {
            let onButtonBlur = sinon.spy();
            let { select } = renderSelect({ value: [1, 2], options: OPTIONS, onButtonBlur });

            select.instance.focus();

            setTimeout(() => {
                select.instance.blur();

                setTimeout(() => {
                    expect(onButtonBlur).to.have.been.calledOnce;
                    expect(onButtonBlur).to.have.been.calledWith(sinon.match({ target: { value: [1, 2] } }));
                    done();
                }, 0);
            }, 0);
        });

        it('should receive event.target.value on `onMenuFocus` callback', (done) => {
            let onMenuFocus = sinon.spy(eventPersist);
            let { select } = renderSelect({ value: [1, 2], options: OPTIONS, onMenuFocus });

            select.instance.focus();

            setTimeout(() => {
                expect(onMenuFocus).to.have.been.calledOnce;
                expect(onMenuFocus).to.have.been.calledWith(sinon.match({ target: { value: [1, 2] } }));
                done();
            }, 0);
        });

        it('should receive event.target.value on `onMenuBlur` callback', (done) => {
            let onMenuBlur = sinon.spy(eventPersist);
            let { select } = renderSelect({ value: [1, 2], options: OPTIONS, onMenuBlur });

            select.instance.focus();

            setTimeout(() => {
                select.instance.blur();

                setTimeout(() => {
                    expect(onMenuBlur).to.have.been.calledOnce;
                    expect(onMenuBlur).to.have.been.calledWith(sinon.match({ target: { value: [1, 2] } }));
                    done();
                }, 0);
            }, 0);
        });

        // add after decorator update
        it('should call `onClickOutside` callback after click outside of open popup', (done) => {
            let onClickOutside = sinon.spy();
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
                expect(onClickOutside).to.have.been.calledOnce;
                done();
            }, 0);
        });
    }
});
