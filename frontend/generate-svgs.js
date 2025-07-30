const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const { QRCodeStyling } = require('qr-code-styling-node/lib/qr-code-styling.common.js');
const canvas = require('canvas');


const patterns = ['square', 'dots', 'rounded', 'classy', 'classy-rounded', 'extra-rounded'];
const corners = ['square', 'dot', 'extra-rounded'];

const generateSvgs = async () => {
    if (!fs.existsSync('public/svgs')) {
        fs.mkdirSync('public/svgs', { recursive: true });
    }
    if (!fs.existsSync('public/svgs/patterns')) {
        fs.mkdirSync('public/svgs/patterns', { recursive: true });
    }
    if (!fs.existsSync('public/svgs/corners')) {
        fs.mkdirSync('public/svgs/corners', { recursive: true });
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
        fs.writeFileSync(`public/svgs/patterns/${pattern}.svg`, svg);
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
        fs.writeFileSync(`public/svgs/corners/${corner}.svg`, svg);
    }
};

generateSvgs();
