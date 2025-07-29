const express = require('express');
const { QRCodeStyling } = require('qr-code-styling-node/lib/qr-code-styling.common.js');
const { JSDOM } = require('jsdom');
const cors = require('cors');
const basicAuth = require('express-basic-auth');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));

const users = {};
users[process.env.AUTH_USERNAME] = process.env.AUTH_PASSWORD;

app.use(basicAuth({
    users,
    challenge: true,
}));

app.post('/generate-qr', async (req, res) => {
    const { link, color = '#000000', pattern = 'square', imageBase64, imagePosition = 'center', cornerType = 'square', cornerColor = '#000000' } = req.body;

    if (!link) {
        return res.status(400).json({ error: 'Link is required' });
    }

    try {
        const qrCode = new QRCodeStyling({
            width: 300,
            height: 300,
            data: link,
            image: imageBase64 ? `data:image/png;base64,${imageBase64}` : undefined,
            dotsOptions: {
                color: color,
                type: pattern
            },
            cornersSquareOptions: {
                type: cornerType,
                color: cornerColor
            },
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: 0.4,
                margin: 5
            },
            qrOptions: {
                errorCorrectionLevel: 'H'
            },
            nodeCanvas: require('canvas'),
        });

        const buffer = await qrCode.getRawData('png');

        if (imageBase64) {
            const canvas = require('canvas');
            const qrImage = await canvas.loadImage(buffer);
            const finalCanvas = canvas.createCanvas(300, 300);
            const ctx = finalCanvas.getContext('2d');
            ctx.drawImage(qrImage, 0, 0, 300, 300);

            const image = await canvas.loadImage(`data:image/png;base64,${imageBase64}`);
            const imageSize = 56;
            let x = (300 - imageSize) / 2;
            let y = (300 - imageSize) / 2;

            switch (imagePosition) {
                case 'top-left':
                    x = 0;
                    y = 0;
                    break;
                case 'top-right':
                    x = 300 - imageSize;
                    y = 0;
                    break;
                case 'bottom-left':
                    x = 0;
                    y = 300 - imageSize;
                    break;
                case 'bottom-right':
                    x = 300 - imageSize;
                    y = 300 - imageSize;
                    break;
            }
            ctx.drawImage(image, x, y, imageSize, imageSize);
            const finalQrCode = finalCanvas.toDataURL('image/png').split(',')[1];
            res.json({ qr: finalQrCode });
        } else {
            const base64Image = buffer.toString('base64');
            res.json({ qr: base64Image });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
