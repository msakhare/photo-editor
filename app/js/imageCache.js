import {CANVAS_HEIGHT, CANVAS_WIDTH} from "./constants";

export default class imageCache {
    static cache = new Array();
    constructor(imgObject, filename) {
        this.img = imgObject;
        this.filename = filename;
        this.width = imgObject.naturalWidth;
        this.height = imgObject.naturalHeight;
        this.x = 0;
        this.y = 0;
        this.ratio = 1;
    }

    shiftLeft() {
        this.x += 10;
    }

    shiftRight() {
        this.x -= 10;
    }

    shiftUp() {
        this.y += 10;
    }

    shiftDown() {
        this.y -= 10;
    }

    zoomIn() {
        if (this.ratio <= 1.5) this.ratio += 0.1;
    }

    zoomOut() {
        if (this.ratio > 1) this.ratio -= 0.1;
    }

    getCanvasImageParams() {
        return [this.img, this.x, this.y, this.width, this.height, 0, 0, CANVAS_WIDTH * this.ratio, CANVAS_HEIGHT * this.ratio];
    }

    printImage() {
        imageCache.cache.push({
            filename: this.filename,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            ratio: this.ratio
        });
    }

    getImage() {
        return {
            filename: this.filename,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            ratio: this.ratio
        };
    }
}