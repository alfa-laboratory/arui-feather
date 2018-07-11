import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// mock matchMedia
window.matchMedia = () => ({ addListener: jest.fn() });

configure({ adapter: new Adapter() });

