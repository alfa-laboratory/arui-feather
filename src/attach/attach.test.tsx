/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import { Attach } from './attach';

describe('attach', () => {
    it('should render without problems', () => {
        const attach = mount(<Attach />);

        expect(attach).toMatchSnapshot();
    });

    it('should set/unset class on attach focused/unfocused', () => {
        const attach = mount<Attach>(<Attach />);
        const instance = attach.instance();
        const inputRef = instance.input;

        jest.spyOn(inputRef, 'focus');
        jest.spyOn(inputRef, 'blur');

        instance.focus();

        expect(inputRef.focus).toHaveBeenCalledTimes(1);

        instance.blur();

        expect(inputRef.blur).toHaveBeenCalledTimes(1);
    });

    it('should set/unset class on attach hovered/unhovered', () => {
        const attach = mount(<Attach />);

        attach.simulate('mouseEnter');
        expect(attach.getDOMNode().className).toContain('attach_hovered');

        attach.simulate('mouseLeave');
        expect(attach.getDOMNode().className).not.toContain('.attach_hovered');
    });

    it('should call `onClick` callback after attach button was clicked', () => {
        const onClick = jest.fn();
        const attach = mount(<Attach onClick={ onClick } />);

        attach.find('.button').simulate('click');

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should call `onFocus` callback after attach was focused', () => {
        const onFocus = jest.fn();
        const attach = mount(<Attach onFocus={ onFocus } />);

        attach.find('.button').simulate('focus');

        expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('should call `onBlur` callback after attach was blured', () => {
        const onBlur = jest.fn();
        const attach = mount(<Attach onBlur={ onBlur } />);

        attach.find('.button').simulate('blur');

        expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('should call `onMouseEnter` callback after attach was hovered', () => {
        const onMouseEnter = jest.fn();
        const attach = mount(<Attach onMouseEnter={ onMouseEnter } />);

        attach.simulate('mouseEnter');

        expect(onMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('should call `onMouseLeave` callback after attach was leaved by cursor', () => {
        const onMouseLeave = jest.fn();
        const attach = mount(<Attach onMouseLeave={ onMouseLeave } />);

        attach.simulate('mouseLeave');

        expect(onMouseLeave).toHaveBeenCalledTimes(1);
    });

    it('should render selected file name if one file selected', () => {
        const attach = mount(<Attach />);
        const controlNode = attach.find('.attach__control');

        controlNode.simulate('change', {
            target: {
                files: [{
                    name: 'test.txt', type: 'application/text'
                }]
            }
        });

        const fileTitleNode = attach.find('.attach__text');

        expect(fileTitleNode.text()).toContain('test.txt');
    });

    it('should render selected files count if several files selected', () => {
        const attach = mount(<Attach />);
        const controlNode = attach.find('.attach__control');

        controlNode.simulate('change', {
            target: {
                files: [
                    {
                        name: 'test1.txt', type: 'application/text'
                    },
                    {
                        name: 'test2.txt', type: 'application/text'
                    },
                    {
                        name: 'test3.txt', type: 'application/text'
                    }
                ]
            }
        });

        const filesTitleNode = attach.find('.attach__text abbr');

        expect(filesTitleNode.text()).toContain('3 файла');
    });

    it('should render "no file" and clear input value after clear button was clicked', () => {
        const attach = mount(<Attach />);
        const controlNode = attach.find('.attach__control');

        controlNode.simulate('change', {
            target: {
                files: [{
                    name: 'test.txt', type: 'application/text'
                }]
            }
        });

        const fileTitleNode = attach.find('.attach__text');

        expect(fileTitleNode.text()).toContain('test.txt');

        const clearButtonNode = attach.find('.attach__clear');

        clearButtonNode.simulate('click');

        const statusNode = attach.find('.attach__no-file');

        expect(statusNode.text()).toContain('Нет файла');
        expect(controlNode.props().value).toBeFalsy();
    });
});
