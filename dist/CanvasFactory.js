"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasFactory = void 0;
const canvas_1 = require("canvas");
const assert_1 = require("assert");
class CanvasFactory {
    create(width, height) {
        assert_1.strict(width > 0 && height > 0, 'Invalid canvas size');
        const canvas = canvas_1.createCanvas(width, height);
        const context = canvas.getContext('2d');
        return { canvas, context };
    }
    reset(pointer, width, height) {
        assert_1.strict(pointer.canvas, 'Canvas is not specified');
        assert_1.strict(width > 0 && height > 0, 'Invalid canvas size');
        pointer.canvas.width = width;
        pointer.canvas.height = height;
    }
    destroy(pointer) {
        assert_1.strict(pointer.canvas, 'Canvas is not specified');
        pointer.canvas.width = 0;
        pointer.canvas.height = 0;
        pointer.canvas = null;
        pointer.context = null;
    }
}
exports.CanvasFactory = CanvasFactory;
//# sourceMappingURL=CanvasFactory.js.map