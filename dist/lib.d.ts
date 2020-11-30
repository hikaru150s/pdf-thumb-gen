/// <reference types="node" />
/**
 * Generate PNG thumbnail from PDF file
 * @param pathOrData either PDF path or loaded PDF Buffer
 * @returns Buffered PNG thumbnail
 */
export declare function generateThumbnail(pathOrData: string | Buffer): Promise<Buffer>;
