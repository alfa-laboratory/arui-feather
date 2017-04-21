/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import ReactDOM from 'react-dom';
import StyleguidistPreview from 'react-styleguidist/lib/rsg-components/Preview';
import Wrapper from 'react-styleguidist/lib/rsg-components/Wrapper';
import PreviewComponent from './preview-component';
import PreviewWithThemeSwitcher from './preview-with-theme-switcher';


export default class Preview extends StyleguidistPreview {
    /*
    * Override styleguidist component for provide theme selector to each playground
    */
    executeCode() {
        this.setState({ error: null });

        const { code } = this.props;
        if (!code) {
            return;
        }

        const compiledCode = this.compileCode(code);
        if (!compiledCode) {
            return;
        }

        const exampleComponent = this.evalInContext(compiledCode);
        const wrappedComponent = (
            <Wrapper>
                <PreviewWithThemeSwitcher>
                    <PreviewComponent component={ exampleComponent } />
                </PreviewWithThemeSwitcher>
            </Wrapper>
        );

        window.requestAnimationFrame(() => {
            try {
                ReactDOM.render(wrappedComponent, this.mountNode);
            } catch (err) {
                this.handleError(err);
            }
        });
    }
}
