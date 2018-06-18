import GridContainer from '../src/grid-container';
import GridRow from '../src/grid-row';
import GridCol from '../src/grid-col';

const NAME = 'grid-container';
const SIZES = process.env.ALL_SIZES ? ['sm', 'md', 'lg', 'xl', 'xxl'] : ['xl'];

const WINDOW_SIZES = {
    sm: [340, 640],
    md: [768, 1024],
    lg: [1025, 1366],
    xl: [1441, 1024],
    xxl: [1921, 1080]
};

geminiReact.suite(NAME, function () {
    SIZES.forEach((size) => {
        let selector = `${NAME}_size_${size}`;

        const style = {
            height: 30,
            textAlign: 'center',
            background: '#ff5c5c',
            borderRight: '1px solid #fff',
            borderBottom: '1px solid #fff'
        };

        geminiReact.suite(selector, function (suite) {
            const windowSizes = WINDOW_SIZES[size];
            const template = (
                <GridContainer gutter='0' style={ { borderTop: '1px solid #fff', borderLeft: '1px solid #fff' } }>
                    <GridRow gutter='0' justify='center'>
                        <GridCol width='2' xxl='3'>
                            <div style={ style } />
                        </GridCol>
                        <GridCol
                            sm='2'
                            md='10'
                            lg='5'
                            xl='3'
                            offset={ {
                                sm: 8,
                                md: 0,
                                xl: 1,
                                xxl: 0
                            } }
                        >
                            <div style={ style } />
                        </GridCol>
                        <GridCol sm='12' md='6' lg='5' xl='3'>
                            <div style={ style } />
                        </GridCol>
                        <GridCol sm='6' lg='12' xl='3'>
                            <div style={ style } />
                        </GridCol>
                    </GridRow>
                </GridContainer>
            );

            suite.before(function (actions) {
                actions.setWindowSize(windowSizes[0] + 20, windowSizes[1]);
            });
            suite
                .render(template)
                .capture('plain');
        });
    });
});
