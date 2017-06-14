/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */
import { Component } from 'react';
import Type from 'prop-types';
import Frame from 'react-frame-component';
import cn from '../../../src/cn';
import './index.css';

@cn('preview-frame')
export default class PreviewFrame extends Component {
    static propTypes = {
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node])
    };

    iframe;
    contentDocument;
    timeout;
    componentDidMount() {
        this.contentDocument = this.iframe.getDoc();
        this.timeout = setTimeout(() => {
            this.forceUpdate();
        }, 500);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render(cn) {
        const styleLinks = Array.prototype.slice.call(document.querySelectorAll('link[type="text/css"]'));
        const styles = `
            html { height: 100%; }

            body { 
                height: 100%;
                background: none;
                margin: 0;
            }

            .frame-root {
                height: 100%;
            }

            .frame-content {
                height: 100%;
            }
        `;
        let height = 0;
        if (this.contentDocument) {
            height = `${this.contentDocument.body.scrollHeight}px`;
        }
        const iframeProps = {
            ...this.props,
            style: { height }
        };
        return (
            <div className={ cn } >
                <Frame { ...iframeProps } ref={ (node) => { this.iframe = node; } } >
                    {styleLinks.map(l => (
                        <link href={ l.href } type='text/css' rel='stylesheet' />
                    ))}
                    <style dangerouslySetInnerHTML={ { __html: styles } } />
                    {this.props.children}
                </Frame>
            </div>
        );
    }
}
