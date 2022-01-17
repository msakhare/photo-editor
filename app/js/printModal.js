import {SUBMIT_BTN} from "./constants";

export default function printModal () {
    return `<div id="print-modal" class="modal hidden">
            <button id="close-modal" class="float-right">X</button>
            <div class="title"> Print information</div>
            <p id="jsonView"> </p>
            <button id ="${SUBMIT_BTN}" type="submit">Submit</button>
        </div>`
}