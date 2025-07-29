const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const { QRCodeStyling } = require(require.resolve('qr-code-styling-node/lib/qr-code-styling.common.js', { paths: [path.join(__dirname, 'backend/node_modules')] }));
const canvas = require(require.resolve('canvas', { paths: [path.join(__dirname, 'backend/node_modules')] }));


const patterns = ['square', 'dots', 'rounded', 'classy', 'classy-rounded', 'extra-rounded'];
const corners = ['square', 'dot', 'extra-rounded'];

const generateSvgs = async () => {
    if (!fs.existsSync('svgs')) {
        fs.mkdirSync('svgs');
    }
    if (!fs.existsSync('svgs/patterns')) {
        fs.mkdirSync('svgs/patterns');
    }
    if (!fs.existsSync('svgs/corners')) {
        fs.mkdirSync('svgs/corners');
    }

    for (const pattern of patterns) {
        const qrCode = new QRCodeStyling({
            width: 100,
            height: 100,
            data: 'Jumpify',
            dotsOptions: {
                type: pattern
            },
            nodeCanvas: canvas,
            jsdom: JSDOM,
        });
        const svg = await qrCode.getRawData('svg');
        fs.writeFileSync(`svgs/patterns/${pattern}.svg`, svg);
    }

    for (const corner of corners) {
        const qrCode = new QRCodeStyling({
            width: 100,
            height: 100,
            data: 'Jumpify',
            cornersSquareOptions: {
                type: corner
            },
            nodeCanvas: canvas,
            jsdom: JSDOM,
        });
        const svg = await qrCode.getRawData('svg');
        fs.writeFileSync(`svgs/corners/${corner}.svg`, svg);
    }
};

generateSvgs();
