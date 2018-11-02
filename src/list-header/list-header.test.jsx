import React from 'react';
import { shallow } from 'enzyme';
import ListHeader from './list-header';

describe('list-header', () => {
    it('should render without problems', () => {
        let listHeader = shallow(<ListHeader title='Title' />);

        expect(listHeader).toMatchSnapshot();
    });

    it('should render with `description` prop passed', () => {
        let listHeader = shallow(<ListHeader title='Title' description='description' />);

        expect(listHeader).toMatchSnapshot();
    });

    it('should render with `filled` view passed', () => {
        let listHeader = shallow(<ListHeader title='Title' description='description' view='filled' />);

        expect(listHeader).toMatchSnapshot();
    });
});
