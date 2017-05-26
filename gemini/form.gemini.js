import Button from '../src/button';
import Form from '../src/form';
import FormField from '../src/form-field';
import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Input from '../src/input';

const NAME = 'form';
const THEMES = ['alfa-on-white', 'alfa-on-color'];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let selector = `${NAME}_theme_${theme}`;

        geminiReact.suite(selector, function (suite) {
            let props = { theme, footer: 'Form footer' };
            let template = (
                <GeminiBox theme={ theme }>
                    <Form { ...props }>
                        <FormField label='Input'>
                            <Input placeholder='Input...' />
                        </FormField>
                        <FormField>
                            <Button type='submit'>Button</Button>
                        </FormField>
                    </Form>
                </GeminiBox>
            );

            suite
                .render(template)
                .capture('plain');
        });
    });
});
