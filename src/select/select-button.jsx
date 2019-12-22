import { createCn } from 'bem-react-classname';
import Button from '../button/button';

import { withTheme } from '../cn';

/**
 * Элемент кнопки для выпадающего списка.
 */
class SelectButton extends Button {
    cn = createCn('select-button');
}

export default withTheme(SelectButton);
