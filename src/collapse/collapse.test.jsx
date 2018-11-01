/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import Collapse from './collapse';

describe('collapse', () => {
    it('should render without problem', () => {
        let collapse = shallow(<Collapse>Collapsing text</Collapse>);

        expect(collapse).toMatchSnapshot();
        expect(collapse.prop('className')).toContain('collapse');
    });

    it('should call `onExpandedChange` callback after expand/collapse', () => {
        let onExpandedChange = jest.fn();
        let collapse = mount(
            <Collapse
                collapsedLabel='Expand'
                expandedLabel='Collapse'
                onExpandedChange={ onExpandedChange }
            >
                Collapsing text
            </Collapse>
        );
        let linkNode = collapse.find('.link');

        linkNode.simulate('click');

        expect(onExpandedChange).toHaveBeenCalled();
    });

    it('should update component height', () => {
        let collapse = mount(
            <Collapse>
                some children
            </Collapse>
        );
        collapse.setState({ isExpanded: true });
        // jsdom не умеет обсчитывать высоты элементов правильным образом, поэтому
        // эмулируем высоту контент-враппера и самостоятельно вызываем resize-handler
        collapse.instance().contentCase = { offsetHeight: 100 };
        collapse.instance().updateContentHeight();


        expect(collapse.instance().content.style.height).toBe('100px');
    });

    it('should not update component height when it is collapsed', () => {
        let collapse = mount(
            <Collapse>
                some children
            </Collapse>
        );
        collapse.setState({ isExpanded: false });
        // jsdom не умеет обсчитывать высоты элементов правильным образом, поэтому
        // эмулируем высоту контент-враппера и самостоятельно вызываем resize-handler
        collapse.instance().contentCase = { offsetHeight: 100 };
        collapse.instance().updateContentHeight();


        expect(collapse.instance().content.style.height).toBe('0px');
    });

    it('should apply custom expanded label', () => {
        let collapse = mount(
            <Collapse
                collapsedLabel='Раскрыть'
                isExpanded={ false }
            >
                Collapsing text
            </Collapse>
        );
        let linkNode = collapse.find('.link');

        expect(linkNode.text()).toBe('Раскрыть');
    });

    it('should apply custom collapsed label', () => {
        let collapse = mount(
            <Collapse
                expandedLabel='Закрыть'
                isExpanded={ true }
            >
                Collapsing text
            </Collapse>
        );
        let linkNode = collapse.find('.link');

        expect(linkNode.text()).toBe('Закрыть');
    });

    it('should have default expanded label', () => {
        let collapse = mount(<Collapse isExpanded={ false }>Collapsing text</Collapse>);
        let linkNode = collapse.find('.link');

        expect(linkNode.text()).toBe('Expand');
    });

    it('should have default collapsed label', () => {
        let collapse = mount(<Collapse isExpanded={ true }>Collapsing text</Collapse>);
        let linkNode = collapse.find('.link');

        expect(linkNode.text()).toBe('Collapse');
    });
});
