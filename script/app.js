import { settings, index, loginPopup, game, snake } from "./dom.js"
import {clickListener, toggleShowSettings, randomTiles, randomDirection } from "./functions.js";


settings.setSettings()
console.log(settings)

game.setFps(5)
game.setCanvasContext()
game.setCanvasSize(50)
game.setTileSizes()
snake.borderTile = game.tiles

let i = 0
let j = randomTiles(4)
snake.direction = randomDirection(randomTiles(4))
const main = () => {
   
    if (game.notGameOver) {
        game.drawBackground()
        game.notGameOver = snake.moveSnake(snake.direction)
        if (i > j) {
            snake.direction = randomDirection(randomTiles(4))
            j = randomTiles(4)
            i = -1
        }

        //drawing snake
        snake.body.forEach(body => {
            game.drawPoint( game.notGameOver ? "white" : "red", body)
        })
        //drawing food
        snake.foods.forEach(food => {
            game.drawPoint("red", food)
        })

        game.drawLines()
    }
    i += 1
}

game.gameLoop(main)

//hide settings when its close button is pressed
clickListener(settings.closeButton, () => {
    toggleShowSettings()
    settings.saveSettings()

})
//show settings when setting button at index page is pressed
clickListener(index.settings, toggleShowSettings)

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