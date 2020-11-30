import { Canvas, CanvasRenderingContext2D } from 'canvas';
declare type CanvasFactoryResult = {
    canvas: Canvas;
    context: CanvasRenderingContext2D;
};
export declare class CanvasFactory {
    create(width: number, height: number): CanvasFactoryResult;
    reset(pointer: CanvasFactoryResult, width: number, height: number): void;
    destroy(pointer: CanvasFactoryResult): void;
}
export {};
