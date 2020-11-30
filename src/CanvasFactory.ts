import {
    Canvas,
    createCanvas,
    CanvasRenderingContext2D,
    loadImage
} from 'canvas';
import { strict as assert } from 'assert';

type CanvasFactoryResult = {
    canvas: Canvas;
    context: CanvasRenderingContext2D;
}

export class CanvasFactory {
    create(width: number, height: number): CanvasFactoryResult {
        assert(width > 0 && height > 0, 'Invalid canvas size');
        const canvas = createCanvas(width, height);
        const context = canvas.getContext('2d');
        return { canvas, context };
    }

    async createFromImage(dataSrc: string | Buffer, width: number = 256, height: number = 256) {
        const ref = await loadImage(dataSrc);
        const canvas = createCanvas(width, height);
        const context = canvas.getContext('2d');
        context.drawImage(ref, 0, 0, ref.width, ref.height, 0, 0, width, height);
        return { canvas, context };
    }

    reset(pointer: CanvasFactoryResult, width: number, height: number) {
        assert(pointer.canvas, 'Canvas is not specified');
        assert(width > 0 && height > 0, 'Invalid canvas size');
        pointer.canvas.width = width;
        pointer.canvas.height = height;
    }

    destroy(pointer: CanvasFactoryResult) {
        assert(pointer.canvas, 'Canvas is not specified');
        pointer.canvas.width = 0;
        pointer.canvas.height = 0;
        pointer.canvas = null;
        pointer.context = null;
    }
}
