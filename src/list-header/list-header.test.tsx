import React from 'react';
import { shallow } from 'enzyme';
import { ListHeader } from './list-header';

describe('list-header', () => {
    it('should render without problems', () => {
        const listHeader = shallow(<ListHeader title='Title' />);

        expect(listHeader).toMatchSnapshot();
    });

    it('should render with `description` prop passed', () => {
        const listHeader = shallow(<ListHeader title='Title' description='description' />);

        expect(listHeader).toMatchSnapshot();
    });

    it('should render with `filled` view passed', () => {
        const listHeader = shallow(<ListHeader title='Title' description='description' view='filled' />);

        expect(listHeader).toMatchSnapshot();
    });
});
