import '../css/main.scss'
import fileSelector from './fileSelector.js'
import {FILE_INPUT_ID, EDITOR_CANVAS_ID} from "./constants";
import panZoom from "./panZoom";
import imageCache from "./imageCache";

const AppView = () => {

    document.body.innerHTML = `<h1>Simple Example</h1>
        <form action="#">
            <fieldset>
                <label for=${FILE_INPUT_ID}>Select an Image file</label>
                <input type="file" id=${FILE_INPUT_ID} max=1 accept=".png, .jpeg, .jpg"/>
            </fieldset>
        </form>

        <div id="zoomCtr" class="hidden">
            <button id="zoomOut">-</button> 
            <button id="zoomIn">+</button>
            <button id="shiftUp">UP</button>
            <button id="shiftDown">DOWN</button>
            <button id="shiftLeft">LEFT</button>
            <button id="shiftRight">RIGHT</button>
            <button id="print" class="float-right">Print</button>
        </div>
        <div id="print-modal" class="modal hidden">
            <button id="close-modal" class="float-right">X</button>
            <div class="title"> Print information</div>
            <p id="jsonView"> </p>
            <button type="submit" style="bottom: 0px; ">Submit</button>
            
        </div>
        <canvas id=${EDITOR_CANVAS_ID}>  </canvas>`;

    // grab DOM elements inside index.html
    fileSelector();

    document.getElementById("print").addEventListener('click', ()=> {
        document.getElementById("print-modal").classList.remove("hidden");
        document.getElementById("jsonView").innerHTML = panZoom.getImage();
    });

    document.getElementById("close-modal").addEventListener('click', () => {
        document.getElementById("print-modal").classList.add("hidden");
    });

}

AppView();

