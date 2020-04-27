
        var ReactDOM = require('react-dom');
        window.describe = function() {};
        window.it = function() {};
    
        import React from 'react';

// В шаблон мы должны вставить тестируемый компонент
const template = <div>TEMPLATE!!!!!!!!!!!!!!!!!!!</div>;

describe('first-test', function() {
    it('should first time find hermione', function() {
        return this.browser
            .url('/input.hermione')
            .assertView('plain', '[data-hermione-react]');
    });
});

        
        const elem = document.querySelector('[data-hermione-react]');
        ReactDOM.render(template, elem);
        elem.style.color = 'red';
    