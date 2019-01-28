/* eslint-disable no-undef */
import fs from 'fs';
import ReactDOMServer from 'react-dom/server';
import postcss from 'postcss';
import postcssUrl from 'postcss-url';
import puppeteer from 'puppeteer';
import { resolve } from 'path';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
// import * as png from 'fast-png';
import postcssConfig from '../postcss.config';

const rootElementSelector = 'body > *:first-child';

/**
 * Test CSS path
 */
export const testCSSPath = resolve(__dirname, './test-styles.css');

// Extending jest's expect for matching screenshots
expect.extend({ toMatchImageSnapshot });

/**
 * Puppeteer browser
 * @type {puppeteer.Browser}
 */
let puppeteerBrowser;

/**
 * Puppeteer page
 * @type {puppeteer.Page}
 */
let puppeteerPage;

beforeAll(async () => {
    puppeteerBrowser = await puppeteer.launch({
        args: ['--no-sandbox']
    });

    puppeteerPage = await puppeteerBrowser.newPage();

    // const browserVersion = await puppeteerBrowser.version();
    // console.log(`Started ${browserVersion}`);
});

afterAll(() => {
    if (puppeteerBrowser) {
        puppeteerBrowser.close();
    }
});

/**
 * Async function for processing CSS file via PostCSS
 *
 * @param {string} path Paths of css file
 * @returns {LazyResult} A promise proxy for the result of PostCSS transformations
 */
export const processPostCss = stylePath =>
    postcss(postcssConfig, postcssUrl({ url: 'inline' })).process(fs.readFileSync(stylePath, 'utf-8'), {
        from: stylePath
    });

/**
 * Returns array of processed css code
 *
 * @param {string[]} paths List of paths to styles
 * @returns {string[]} Processed styles
 */
export const processCssFiles = async paths => Promise.all(paths.map(path => processPostCss(path)));

/**
 * Renders HTML of page with component and specified styles

 * @param {React.ReactNode|string} reactNodeOrHtml React element for rendering or component html
 * @param {string[]|string} [styleList] CSS styles
 * @returns {string} An HTML code
 */
export const preparePageHTML = async (reactNodeOrHtml, styleList) => {
    if (typeof styleList === 'string') {
        return preparePageHTML(reactNodeOrHtml, [styleList]);
    }

    if (!Array.isArray(styleList)) {
        return preparePageHTML(reactNodeOrHtml, []);
    }

    if (typeof reactNodeOrHtml !== 'string') {
        return preparePageHTML(ReactDOMServer.renderToStaticMarkup(reactNodeOrHtml), styleList);
    }

    const css = [...styleList, testCSSPath].map(result => `<style type="text/css">\n${result.css}\n</style>`).join('');
    const content = `${css}\n${reactNodeOrHtml}`.trim();

    return content;
};

/**
 * Makes new page in puppeteer
 * @param {string} html HTML to set to a puppeteer page
 * @returns {puppeteer.Page}
 */
export const createPuppeteerNewPage = async (html) => {
    if (html) {
        await puppeteerPage.setContent(html);
    }

    return puppeteerPage;
};

/**
 * Creates screenshot of component
 *
 * @param {React.ReactNode|string} reactNodeOrHtml React element for rendering or html
 * @param {string[]|string} [styles] CSS styles
 * @param {'plain'|'hover'|'focus'|'press'} [state] State of fist root element
 * @return {Buffer} The image buffer
 */
export const getComponentScreenshot = async (reactNodeOrHtml, styles, state = 'plain') => {
    const html = await preparePageHTML(reactNodeOrHtml, styles);
    await puppeteerPage.mouse.move(-1, -1);

    await puppeteerPage.setContent(html);

    const rootElement = await puppeteerPage.$(rootElementSelector);
    const boundingBox = await rootElement.boundingBox();

    // Applying a state
    if (state === 'hover') {
        // eslint-disable-next-line no-mixed-operators
        await puppeteerPage.mouse.move(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2);
    } else if (state === 'focus') {
        // Come up with something
    } else if (state === 'press') {
        // eslint-disable-next-line no-mixed-operators
        await puppeteerPage.mouse.move(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2);
        await puppeteerPage.mouse.down();
    }

    const screenshot = await puppeteerPage.screenshot({
        type: 'png',
        clip: {
            x: boundingBox.x,
            y: boundingBox.y,
            width: Math.min(boundingBox.width, puppeteerPage.viewport().width),
            height: Math.min(boundingBox.height, puppeteerPage.viewport().height)
        }
    });

    if (state === 'hover') {
        await puppeteerPage.mouse.move(0, 0);
    } else if (state === 'press') {
        await puppeteerPage.mouse.up();
        await puppeteerPage.mouse.move(0, 0);
    }

    return screenshot;
};

/**
 * Matches screenshot
 * @param {Buffer} screenshot The image buffer
 */
export const matchScreenshot = screenshot => expect(screenshot).toMatchImageSnapshot();

/**
 * Serializes an object with escaping serialization react components
 * @param {object} shallowStringify Object oto stringify
 * @returns {string}
 */
export const shallowStringify = obj =>
    JSON.stringify(obj, (k, v) => {
        if (v.$$typeof === Symbol.for('react.element')) {
            return `<${v.type.displayName || v.type.name} />`;
        }

        return v;
    });
