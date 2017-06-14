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
        const iframeProps = { ...this.props };
        if (!iframeProps.style) {
            iframeProps.style = {};
        }
        if (!iframeProps.style.height) {
            iframeProps.style.height = '500px';
        }
        return (
            <div className={ cn } >
                <Frame { ...iframeProps }>
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
