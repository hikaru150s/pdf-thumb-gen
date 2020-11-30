"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateThumbnail = void 0;
const pdfjs_dist_1 = require("pdfjs-dist");
const fs_1 = require("fs");
const CanvasFactory_1 = require("./CanvasFactory");
const path_1 = require("path");
const CMAP_URL = '../node_modules/pdfjs-dist/cmaps/';
const CMAP_PACKED = true;
/**
 * Generate PNG thumbnail from PDF file
 * @param pathOrData either PDF path or loaded PDF Buffer
 * @returns Buffered PNG thumbnail
 */
async function generateThumbnail(pathOrData) {
    const rawData = pathOrData instanceof Buffer ? pathOrData : (await fs_1.promises.readFile(pathOrData));
    const pdfData = await pdfjs_dist_1.getDocument({
        data: rawData,
        cMapUrl: CMAP_URL,
        cMapPacked: CMAP_PACKED,
    }).promise;
    const targetPage = await pdfData.getPage(1);
    const viewport = targetPage.getViewport({ scale: 1.0 });
    const factory = new CanvasFactory_1.CanvasFactory();
    const canvasPointer = factory.create(viewport.width, viewport.height);
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
exports.generateThumbnail = generateThumbnail;
(async () => {
    try {
        console.log({
            result: await generateThumbnail(path_1.join(__dirname, '../tests/Lorem_ipsum.pdf')),
        });
    }
    catch (e) {
        console.error(e);
    }
})();
//# sourceMappingURL=lib.js.map