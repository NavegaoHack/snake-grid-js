import { settings, index } from "./dom.js";

const clickListener = (element, func) => {
    element.addEventListener("click", func);
}

const toggleShowSettings = () => {
    settings.toggleShow()
    index.toggleOpacity()
    settings.isShowed = !settings.isShowed
}


const loginUser = (credentials) => {
    console.log(credentials)
    if (credentials.user == "" && credentials.password == "") return {}
    return false
}

export { clickListener, toggleShowSettings, loginUser }