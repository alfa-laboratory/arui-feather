/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

import cn from '../cn';

import './page.css';

const SMALL_HEADER_HEIGHT = 80;
const PADDING_FROM_HEADER = 15;

/**
 * Компонент страницы.
 * Как правило является корневым компонентов страницы.
 * Обычно используется совместно с компонентами `Header`, `Footer`
 * и компонентами `AppTitle`, `AppMenu` и `AppContent`.
 *
 * @example
 * ```javascript
 * import Page from 'arui-feather/page';
 * import Header from 'arui-feather/header';
 * import Footer from 'arui-feather/footer';
 *
 * import AppTitle from 'arui-feather/app-title';
 * import AppMenu from 'arui-feather/app-menu';
 * import AppContent from 'arui-feather/app-content';
 *
 * import Heading from 'arui-feather/heading';
 * import Menu from 'arui-feather/menu';
 * import Paragraph from 'arui-feather/paragraph';
 *
 * <Page header={ <Header /> } footer={ <Footer /> }>
 *     <AppTitle>
 *         <Heading>Заголовок страницы</Heading>
 *     </AppTitle>
 *     <AppMenu>
 *         <Menu />
 *     </AppMenu>
 *     <AppContent>
 *         <Paragraph>Контент страницы...</Paragraph>
 *     </AppContent>
 * </Page>
 * ```
 */
@cn('page')
class Page extends React.Component {
    static propTypes = {
        /** Шапка страницы */
        header: Type.node,
        /** Дочерние элементы `Page` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Футер страницы */
        footer: Type.node,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string])
    };

    state = {
        innerMargin: null,
        contentPadding: null
    };

    render(cn) {
        let header;
        if (this.props.header) {
            header = React.cloneElement(this.props.header,
                {
                    onResize: this.handleHeaderResize
                }
            );
        }

        return (
            <div className={ cn }>
                { header }
                <div className={ cn('inner') } style={ { marginTop: this.state.innerMargin } }>
                    <div className={ cn('content') } style={ { paddingTop: this.state.contentPadding } }>
                        { this.props.children }
                    </div>
                </div>
                { this.props.footer &&
                    <div className={ cn('footer') }>
                        <div className={ cn('footer-content') }>
                            { this.props.footer }
                        </div>
                    </div>
                }
            </div>
        );
    }

    @autobind
    handleHeaderResize(headerHeight, contentHeight) {
        let innerMargin = -1 * headerHeight;
        let contentPadding = contentHeight + SMALL_HEADER_HEIGHT + PADDING_FROM_HEADER;

        this.setState({
            innerMargin,
            contentPadding
        });

        if (this.props.header && this.props.header.props.onResize) {
            this.props.header.props.onResize(headerHeight, contentHeight);
        }
    }
}

export default Page;
