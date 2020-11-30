import { promises as fs } from 'fs';
import { randomBytes } from 'crypto';
import { generateImageThumbnail, generateThumbnail } from '../src/lib';
import { expect, use } from 'chai';
import * as cap from 'chai-as-promised';
use(cap);

function generateRandomString() {
    return randomBytes(16).toString('hex');
}
function isFileExist(path: string) {
    return fs.access(path).then(() => true).catch(() => false);
}

describe('Generate PDF Thumbnail', function () {
    const pdfPath = './tests/Lorem_ipsum.pdf';

    it('Should generate thumbnail from buffered file', async function () {
        const buffer = await fs.readFile(pdfPath);
        const result = await generateThumbnail(buffer);
        expect(result).to.be.instanceof(Buffer, 'Result must be buffer');
        const fn = `./tests/${generateRandomString()}.png`;
        await fs.writeFile(fn, result);
        const ex = await isFileExist(fn);
        expect(ex).to.be.true;
    });

    it('Should generate thumbnail from file path', async function () {
        const result = await generateThumbnail(pdfPath);
        expect(result).to.be.instanceof(Buffer, 'Result must be buffer');
        const fn = `./tests/${generateRandomString()}.png`;
        await fs.writeFile(fn, result);
        const ex = await isFileExist(fn);
        expect(ex).to.be.true;
    });
});

describe('Generate image thumbnail', function () {
    const imagePath = './tests/w3c_home';

    it('Should generate thumbnail from bmp', async function () {
        const result = await generateImageThumbnail(imagePath + '.bmp');
        expect(result).to.be.instanceof(Buffer, 'Result must be buffer');
        const fn = `./tests/${generateRandomString()}.png`;
        await fs.writeFile(fn, result);
        const ex = await isFileExist(fn);
        console.log('>> bmp >', fn);
        expect(ex).to.be.true;
    });
    it('Should reject gif files', async function () {
        //const result = await generateImageThumbnail(imagePath + '.gif');
        //expect(result).to.be.instanceof(Buffer, 'Result must be buffer');
        //const fn = `./tests/${generateRandomString()}.png`;
        //await fs.writeFile(fn, result);
        //const ex = await isFileExist(fn);
        //expect(ex).to.be.true;
        await expect(generateImageThumbnail(imagePath + '.gif')).to.be.rejected;
    });
    it('Should generate thumbnail from jpg', async function () {
        const result = await generateImageThumbnail(imagePath + '.jpg');
        expect(result).to.be.instanceof(Buffer, 'Result must be buffer');
        const fn = `./tests/${generateRandomString()}.png`;
        await fs.writeFile(fn, result);
        const ex = await isFileExist(fn);
        console.log('>> jpg >', fn);
        expect(ex).to.be.true;
    });
    it('Should generate thumbnail from png', async function () {
        const result = await generateImageThumbnail(imagePath + '.png');
        expect(result).to.be.instanceof(Buffer, 'Result must be buffer');
        const fn = `./tests/${generateRandomString()}.png`;
        await fs.writeFile(fn, result);
        const ex = await isFileExist(fn);
        console.log('>> png >', fn);
        expect(ex).to.be.true;
    });
});
