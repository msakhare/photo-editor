import {FILE_INPUT_ID} from './constants';
import panZoom from "./panZoom";

const fileSelector = () => {
    const fileSelector = document.getElementById( FILE_INPUT_ID);

    fileSelector.onchange = panZoom.handleFileChange;
}
export default fileSelector;