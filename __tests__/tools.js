import fs from 'fs';
import { renderToStaticMarkup } from 'react-dom/server';
import postcss from 'postcss';
import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import postcssConfig from '../postcss.config';

// Extending jest's expect for matching screenshots
expect.extend({ toMatchImageSnapshot });

/**
 * Puppeteer browser promise
 */
const puppeteerBrowser = puppeteer.launch();

/**
 * Async function for processing CSS file via PostCSS
 *
 * @param {String} path Paths of css file
 * @returns {LazyResult} A promise proxy for the result of PostCSS transformations
 */
export const processCss = stylePath =>
    postcss(postcssConfig).process(fs.readFileSync(stylePath, 'utf-8'), { from: stylePath });

/**
 * Renders HTML of page with component and specified styles
 *
 * @param {React.ReactNode} reactNode React element for rendering
 * @param {string[]|string} [stylesPathList] Style path of styles path list
 * @returns {string} An HTML code
 */
export const renderComponentPage = async (reactNode, stylesPathList) => {
    if (typeof stylesPathList === 'string') {
        return renderComponentPage(reactNode, [stylesPathList]);
    }

    if (!Array.isArray(stylesPathList)) {
        return renderComponentPage(reactNode, []);
    }

    const styleList = await Promise.all(stylesPathList.map(path => processCss(path)));
    const html = renderToStaticMarkup(reactNode);

    return `${styleList.map(result => `<style type="text/css">\n${result.css}\n</style>`).join('')}\n${html}`.trim();
};

/**
 * Makes new page in puppeteer
 */
export const createPuppeteerNewPage = async (html) => {
    const browser = await puppeteerBrowser;
    const page = await browser.newPage();

    if (html) {
        await page.setContent(html);
    }

    return page;
};

/**
 * Creates screenshot of component
 *
 * @param {React.ReactNode} reactNode React element for rendering
 * @param {string[]|string} [stylesPathList] Style path of styles path list
 * @return {Buffer} The image buffer
 */
export const getComponentScreenshot = async (reactNode, stylesPathList) => {
    const html = await renderComponentPage(reactNode, stylesPathList);
    const page = await createPuppeteerNewPage(html);
    const screenshot = await page.screenshot();

    return screenshot;
};

/**
 * Matches screenshot
 * @param {Buffer} screenshot The image buffer
 */
export const matchScreenshot = screenshot => expect(screenshot).toMatchImageSnapshot();
