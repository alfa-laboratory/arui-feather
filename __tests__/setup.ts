import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// mock matchMedia
window.matchMedia = () => ({
    addListener: jest.fn(),
    matches : false,
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    media: '',
    onchange: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
});

configure({ adapter: new Adapter() });
