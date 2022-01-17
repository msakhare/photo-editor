import {CANVAS_HEIGHT, CANVAS_WIDTH} from "./constants";

export default class imageCache {
    static cache = new Array();
    static img = null;
    static filename = null;
    static width = null;
    static height = null;
    static x = 0;
    static y = 0;
    static ratio = 1;
    static storeImage(imgObject, filename) {
        this.img = imgObject;
        this.filename = filename;
        this.width = imgObject.naturalWidth;
        this.height = imgObject.naturalHeight;
        this.x = 0;
        this.y = 0;
        this.ratio = 1;
    }

    static shiftLeft() {
        this.x += 10;
    }

    static shiftRight() {
        this.x -= 10;
    }

    static shiftUp() {
        this.y += 10;
    }

    static shiftDown() {
        this.y -= 10;
    }

    static zoomIn() {
        if (this.ratio <= 1.5) this.ratio += 0.1;
    }

    static zoomOut() {
        if (this.ratio > 1) this.ratio -= 0.1;
    }

    static getCanvasImageParams() {
        return [this.img, this.x, this.y, this.width, this.height, 0, 0, CANVAS_WIDTH * this.ratio, CANVAS_HEIGHT * this.ratio];
    }

    static printImage() {
        let imageToPush = {
            filename: this.filename,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            ratio: this.ratio,
            src: this.img.src
        };
        let index = imageCache.cache.findIndex((img,index, list) => {
            return this.filename === img.filename;
        });
        (index > -1) ?  imageCache.cache[index] = imageToPush : imageCache.cache.push(imageToPush);
    }

    static import(index) {
        let cached = this.cache[index];
        this.filename = cached.filename;
        this.x = cached.x;
        this.y = cached.y;
        this.width = cached.width;
        this.height = cached.height;
        this.ratio = cached.ratio;
        // this.img = cached.img;
        this.img.src = cached.src;
    }

    static getImage() {
        return {
            filename: this.filename,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            ratio: this.ratio
        };
    }
    static isCached(filename) {
        return this.cache.find((v, index, list)=> {
            return v.filename === filename;
        });

    }
}