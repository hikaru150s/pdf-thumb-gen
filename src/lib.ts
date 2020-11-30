import { getDocument } from 'pdfjs-dist/es5/build/pdf.js';
import { promises as fs } from 'fs';
import { CanvasFactory } from './CanvasFactory';

const CMAP_URL = '../node_modules/pdfjs-dist/cmaps/';
const CMAP_PACKED = true;

/**
 * Generate PNG thumbnail from PDF file
 * @param pathOrData either PDF path or loaded PDF Buffer
 * @returns Buffered PNG thumbnail
 */
export async function generateThumbnail(pathOrData: string | Buffer) {
    const rawData = pathOrData instanceof Buffer ? pathOrData : (await fs.readFile(pathOrData));
    const pdfData = await getDocument({
        data: rawData,
        cMapUrl: CMAP_URL,
        cMapPacked: CMAP_PACKED,
    }).promise;
    const targetPage = await pdfData.getPage(1);
    const viewport = targetPage.getViewport({ scale: 1.0 });
    const factory = new CanvasFactory();
    const canvasPointer = factory.create(
        viewport.width,
        viewport.height
    );
    const renderContext = {
        canvasContext: canvasPointer.context,
        viewport: viewport,
        canvasFactory: factory,
    };
    await targetPage.render(renderContext).promise;
    return canvasPointer.canvas.toBuffer('image/png', {
        compressionLevel: 9,
    });
}

export async function generateImageThumbnail(dataSrc: string | Buffer, width?: number, height?: number): Promise<Buffer> {
    const factory = new CanvasFactory();
    const ref = await factory.createFromImage(dataSrc, width, height);
    return ref.canvas.toBuffer('image/png', { compressionLevel: 9 });
}
