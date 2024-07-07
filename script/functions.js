import { settings, index } from "./dom.js";

const clickListener = (element, func) => {
    element.addEventListener("click", func);
}

const toggleShowSettings = () => {
    settings.toggleShow()
    index.toggleOpacity()
    settings.isShowed = !settings.isShowed
}

const hideSettings = () => {
    settings.hide()
    index.toggleOpacity()
}



export { clickListener, toggleShowSettings, hideSettings}