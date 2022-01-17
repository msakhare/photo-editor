import {
    CONTROL_BAR, IMPORT_BTN,
    PRINT_BTN,
    SHIFT_DOWN_BTN,
    SHIFT_LEFT_BTN,
    SHIFT_RIGHT_BTN,
    SHIFT_UP_BTN,
    ZOOM_IN_BTN,
    ZOOM_OUT_BTN
} from "./constants";
import imageCache from "./imageCache";
import panZoom from "./panZoom";

 function controlBar () {
    const SELECT_BOX = "selectBox";
    let template =  `<div id="${CONTROL_BAR}" class="hidden">
    <button id="${ZOOM_OUT_BTN}">-</button>
    <button id="${ZOOM_IN_BTN}">+</button>
    <button id="${SHIFT_UP_BTN}">UP</button>
    <button id="${SHIFT_DOWN_BTN}">DOWN</button>
    <button id="${SHIFT_LEFT_BTN}">LEFT</button>
    <button id="${SHIFT_RIGHT_BTN}">RIGHT</button>
    
    <button id="${PRINT_BTN}" class="float-right">Print</button>
    <div id="${IMPORT_BTN}" class="float-right hidden">
        <label for="${SELECT_BOX}">Import</label>
        <select id="${SELECT_BOX}" >
            Print a file first
        </select>
    </div>
</div>`;

    function addImportOptions() {
       const selectBox = document.getElementById(SELECT_BOX);
       selectBox.innerHTML = '';
       selectBox.value = "";
       const defaultOption = document.createElement("option");
       defaultOption.innerHTML = 'Please select a file';
       defaultOption.disabled = true;
       selectBox.appendChild(defaultOption);
       imageCache.cache.map((img, index)=> {
           const child = document.createElement("option");
           child.innerHTML = img.filename;
           child.value =  index;
           selectBox
               .appendChild(child);
       });

    }
    function importJson(index) {
        imageCache.import(index);
        panZoom.refresh();
    }
    function addSelectListener() {
         const selectBox = document.getElementById(SELECT_BOX);
         selectBox.oninput = (e) => {
             const index = e.target.value;
             importJson(index);
         }
     }
    return {
       template : template,
       addImportOptions : addImportOptions,
       addSelectListener : addSelectListener
    }

}

export default controlBar();