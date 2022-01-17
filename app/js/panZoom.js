import imageCache from "./imageCache";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    EDITOR_CANVAS_ID,
    SHIFT_DOWN_BTN, SHIFT_LEFT_BTN, SHIFT_RIGHT_BTN,
    SHIFT_UP_BTN,
    ZOOM_IN_BTN,
    ZOOM_OUT_BTN
} from "./constants";


 function PanZoom() {
     let imageStore = null;
     let listenersAdded = false;

     let handleFileChange = ( e ) => {
        // get all selected Files
         if (!listenersAdded) {
             document.getElementById(ZOOM_IN_BTN).addEventListener('click', zoomIn);
             document.getElementById(ZOOM_OUT_BTN).addEventListener('click', zoomOut);
             document.getElementById(SHIFT_UP_BTN).addEventListener('click', shiftUp);
             document.getElementById(SHIFT_DOWN_BTN).addEventListener('click', shiftDown);
             document.getElementById(SHIFT_RIGHT_BTN).addEventListener('click', shiftRight);
             document.getElementById(SHIFT_LEFT_BTN).addEventListener('click', shiftLeft);
         }
        const files = e.target.files;
         console.log(files[0]);
        if (files.length) {
            const reader = new FileReader();
            reader.onload = function( e ) {
                // create HTMLImageElement holding image data
                let editorCanvas = document.getElementById( EDITOR_CANVAS_ID);

                const img = new Image();
                img.src = reader.result;
                img.onload = function() {
                    // grab some data from the image
                    imageStore = new imageCache(img, files[0].name);
                    editorCanvas.width = CANVAS_WIDTH;
                    editorCanvas.height = CANVAS_HEIGHT;
                    const ctx = editorCanvas.getContext('2d');
                    ctx.drawImage(...imageStore.getCanvasImageParams());
                }
                // do your magic here...
                document.getElementById("zoomCtr").classList.remove("hidden");

            };
            reader.readAsDataURL( files[0] );
        }
    }

    let zoomIn = () => {
         imageStore.zoomIn();
         setCanvas();
     }

     let zoomOut = () => {
         imageStore.zoomOut();
         setCanvas();
     }

     let shiftUp = () => {
         imageStore.shiftUp();
         setCanvas();
     }

     let shiftDown = () => {
         imageStore.shiftDown();
         setCanvas();
     }

     let shiftRight = () => {
         imageStore.shiftRight();
         setCanvas();
     }

     let shiftLeft = () => {
         imageStore.shiftLeft();
         setCanvas();
     }

     let setCanvas = () => {
         let editorCanvas = document.getElementById( EDITOR_CANVAS_ID);
         editorCanvas.getContext("2d").drawImage(...imageStore.getCanvasImageParams());
     }

    return {
        handleFileChange: handleFileChange,
        print: function () {
            imageStore.printImage();
        },
        getImage: function () {
            return JSON.stringify(imageStore.getImage());
        }
    }
}

export default PanZoom();