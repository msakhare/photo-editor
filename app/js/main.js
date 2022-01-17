import '../css/main.scss'
import fileSelector from './fileSelector.js'
import {
    FILE_INPUT_ID,
    EDITOR_CANVAS_ID, JSON_VIEW, PRINT_BTN, SUBMIT_BTN, IMPORT_BTN
} from "./constants";
import panZoom from "./panZoom";
import controlBar from "./controlBar";
import printModal from "./printModal";
import imageCache from "./imageCache";

const AppView = () => {

    document.body.innerHTML = `<h1>Simple Example</h1>
        <form action="#">
            <fieldset>
                <label for=${FILE_INPUT_ID}>Select an Image file</label>
                <input type="file" id=${FILE_INPUT_ID} max=1 accept=".png, .jpeg, .jpg"/>
            </fieldset>
        </form>
        ${controlBar.template}
        ${printModal()}
        <canvas id=${EDITOR_CANVAS_ID}>  </canvas>`;

    // grab DOM elements inside index.html
    fileSelector();
    const PRINT_MODAL = "print-modal";
    let showHideElement = (elementId, show = true) => {
        (show)? document.getElementById(elementId).classList.remove("hidden"):
            document.getElementById(elementId).classList.add("hidden");
    }
    // show print description when print button is clicked. Display in Modal like element.
    document.getElementById(PRINT_BTN).addEventListener('click', ()=> {
        showHideElement(PRINT_MODAL);
        document.getElementById(JSON_VIEW).innerHTML = panZoom.getImage();
    });

    // to close the description when cross button clicked
    document.getElementById("close-modal").addEventListener('click', () => {
        showHideElement(PRINT_MODAL, false);
    });

    document.getElementById(SUBMIT_BTN).addEventListener('click', ()=>{
        imageCache.printImage();
        controlBar.addImportOptions();
        showHideElement(IMPORT_BTN);
        showHideElement(PRINT_MODAL, false);
    });

    controlBar.addSelectListener();

}

AppView();

