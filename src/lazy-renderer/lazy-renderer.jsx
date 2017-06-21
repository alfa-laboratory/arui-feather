/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

/**
 * Компонент для отложенного рендера.
 */
class LazyRenderer extends React.Component {
    static propTypes = {
        children: Type.oneOfType([Type.node, Type.arrayOf(Type.node)]),
        /** Показывать или нет */
        visible: Type.bool
    }
    constructor(props, context) {
        super(props, context);
        this.isChildrenAlreadyMounted = props.visible;
    }
    componentWillReceiveProps(nextProps) {
        if (!this.isChildrenAlreadyMounted && nextProps.visible) {
            this.isChildrenAlreadyMounted = true;
            this.oldChildren = this.props.children;
            this.componentDidUpdate = () => {
                this.componentDidUpdate = undefined;
                this.oldChildren = null;
                window.requestAnimationFrame(() => {
                    this.forceUpdate();
                });
            };
            this.forceUpdate();
        }
    }

    render() {
        if (this.oldChildren) {
            return this.oldChildren;
        }
        return this.isChildrenAlreadyMounted ? this.props.children : null;
    }
}
export default LazyRenderer;
