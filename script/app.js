import { settings, index, loginPopup } from "./dom.js"
import {clickListener, toggleShowSettings, loginUser} from "./functions.js";


settings.setSettings()
console.log(settings)
//hide settings when its close button is pressed
clickListener(settings.closeButton, () => {
    toggleShowSettings()
    settings.saveSettings()

})
//show settings when setting button at index page is pressed
clickListener(index.settings, toggleShowSettings)

//lickListener(settings.snakeSpeed, () => {console.log(settings.snakeSpeed.value)})
//clickListener(settings.askLogin, () => {console.log(settings.askLogin.checked)})
//clickListener(settings.playWithAI, () => {console.log(settings.askLogin.checked)})
//clickListener(settings.twoPlayers, () => {console.log(settings.twoPlayers.checked)})
//clickListener(settings.colorTheme, () => {console.log(settings.colorTheme.value)})

// Login popup Controls
clickListener(loginPopup.back, () => {loginPopup.showPopupLogin()})
clickListener(loginPopup.continue, () => {
    sessionStorage.clear()
    location.href = "/pages/game.html"
})


clickListener(loginPopup.login, () => {
    const credentials = loginPopup.getCredentials()

    loginPopup.cleanFields()
    
    const account = loginPopup.logUser(credentials)
    console.log(account.state)
    console.log(account.msg)
    console.log(localStorage)

    if (!account.state) loginPopup.alertMessage(account.msg)
    else {
        loginPopup.alertMessage()
        location.href = "/pages/game.html"
    }
})


// Index buttons
clickListener(index.play, () => {
    if (settings.askLogin.checked) 
        loginPopup.showPopupLogin()
    else {
            sessionStorage.clear()
            location.href = "/pages/game.html"
    }
})

clickListener(index.users, () => {
    location.href = "/pages/users.html"
})