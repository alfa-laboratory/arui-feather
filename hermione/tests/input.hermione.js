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
