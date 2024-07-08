import { settings, index, loginPopup } from "./dom.js"
import {clickListener, toggleShowSettings, loginUser } from "./functions.js";



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

// Login popup Controls
clickListener(loginPopup.back, () => {loginPopup.showPopupLogin()})
clickListener(loginPopup.continue, () => {location.href = "/pages/game.html"})
clickListener(loginPopup.login, () => {
    const credentials = loginPopup.getCredentials()


    loginPopup.cleanFields()
    
    const account = loginUser(credentials)
    console.log(account)

    if (!account) loginPopup.alertMessage("an error occurs!")
    else loginPopup.alertMessage()
})


// Index buttons
clickListener(index.play, () => {
    settings.askLogin.checked ?
        loginPopup.showPopupLogin() :
        location.href = "/pages/game.html"
})