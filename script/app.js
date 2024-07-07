import { settings, index } from "./dom.js"
import {clickListener, toggleShowSettings } from "./functions.js";



console.log(settings)
//hide settings when its close button is pressed
clickListener(settings.closeButton, toggleShowSettings)
//show settings when setting button at index page is pressed
clickListener(index.settings, toggleShowSettings)

clickListener(settings.snakeSpeed, () => {console.log(settings.snakeSpeed.value)})
clickListener(settings.askLogin, () => {console.log(settings.askLogin.checked)})
clickListener(settings.playWithAI, () => {console.log(settings.askLogin.checked)})
clickListener(settings.twoPlayers, () => {console.log(settings.twoPlayers.checked)})
clickListener(settings.colorTheme, () => {console.log(settings.colorTheme.value)})