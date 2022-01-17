import imageCache from "./imageCache";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH, CONTROL_BAR,
    EDITOR_CANVAS_ID,
    SHIFT_DOWN_BTN, SHIFT_LEFT_BTN, SHIFT_RIGHT_BTN,
    SHIFT_UP_BTN,
    ZOOM_IN_BTN,
    ZOOM_OUT_BTN
} from "./constants";

function PanZoom() {
     let listenersAdded = false;
     let handleFileChange = ( e ) => {
         if (!listenersAdded) {
             document.getElementById(ZOOM_IN_BTN).addEventListener('click', zoomIn);
             document.getElementById(ZOOM_OUT_BTN).addEventListener('click', zoomOut);
             document.getElementById(SHIFT_UP_BTN).addEventListener('click', shiftUp);
             document.getElementById(SHIFT_DOWN_BTN).addEventListener('click', shiftDown);
             document.getElementById(SHIFT_RIGHT_BTN).addEventListener('click', shiftRight);
             document.getElementById(SHIFT_LEFT_BTN).addEventListener('click', shiftLeft);
         }
         const files = e.target.files;
         if (files.length) {
            const reader = new FileReader();
            reader.onload = function( e ) {
                // create HTMLImageElement holding image data
                let editorCanvas = document.getElementById( EDITOR_CANVAS_ID);

                const img = new Image();
                img.src = reader.result;
                img.onload = function() {
                    // grab some data from the image
                    if (!imageCache.isCached(files[0].name)) {
                        imageCache.storeImage(img, files[0].name);
                    }
                    editorCanvas.width = CANVAS_WIDTH;
                    editorCanvas.height = CANVAS_HEIGHT;
                    const ctx = editorCanvas.getContext('2d');
                    ctx.drawImage(...imageCache.getCanvasImageParams());
                }

                //show the Controls after image is loaded
                document.getElementById(CONTROL_BAR).classList.remove("hidden");

            };
            reader.readAsDataURL( files[0] );
         }
    }

    function zoomIn() {
        imageCache.zoomIn();
         setCanvas();
     }

    function zoomOut() {
        imageCache.zoomOut();
         setCanvas();
     }

     function shiftUp () {
         imageCache.shiftUp();
         setCanvas();
     }

     function shiftDown() {
         imageCache.shiftDown();
         setCanvas();
     }

     function shiftRight() {
         imageCache.shiftRight();
         setCanvas();
     }

    function shiftLeft() {
        imageCache.shiftLeft();
         setCanvas();
     }

    function setCanvas() {
         let editorCanvas = document.getElementById( EDITOR_CANVAS_ID);
         editorCanvas.getContext("2d").drawImage(...imageCache.getCanvasImageParams());
     }

    return {
        handleFileChange: handleFileChange,
        print: function () {
            imageCache.printImage();
        },
        getImage: function () {
            return JSON.stringify(imageCache.getImage());
        },
        refresh: function () {
            setCanvas();
        }
    }
}

export default PanZoom();