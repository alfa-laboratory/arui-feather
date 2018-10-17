// import * as jest from 'jest';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jest from 'jest-mock';

// mock matchMedia
window.matchMedia = () => ({ addListener: jest.fn() });

configure({ adapter: new Adapter() });
