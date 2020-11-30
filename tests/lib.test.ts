import { promises as fs } from 'fs';
import { randomBytes } from 'crypto';
import { generateThumbnail } from '../src/lib';
import { expect } from 'chai';

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
