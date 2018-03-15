import { PureComponent } from 'react';

import cn from '../../../../src/cn';

@cn('hr')
class HrRenderer extends PureComponent {
    render(cn) {
        return <hr className={ cn() } />;
    }
}

export default HrRenderer;
