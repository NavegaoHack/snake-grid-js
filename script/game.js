import { clickListener, keyListener, keyboarControls, resizeCanvas, chooseDirection } from "./functions.js";
import { game, settings, snake } from "./dom.js";

settings.setSettings()
snake.scoresSum = +settings.snakeSpeed.value
game.setFps(settings.snakeSpeed.value)
game.setCanvasContext()

resizeCanvas()
window.onresize = () => { resizeCanvas() }



//setting tiles in the snake object
snake.borderTile = game.tiles
snake.direction = "right"

let playerLogged = false

if (sessionStorage.currentUser) {
    let session = sessionStorage.currentUser.split(",")
    settings.username.innerText = session[1]
    settings.userscore.innerText = session[2]
    settings.usertimeplayed.innerText = session[3]
    playerLogged = true
} else {
    settings.username.innerText = ""
    settings.userscore.parentNode.innerText = ""
    settings.usertimeplayed.parentNode.innerText = ""
}

const main = () => {
   
    if (game.notGameOver) {
        game.drawBackground()
        game.notGameOver = snake.moveSnake(snake.direction)

        
        game.drawScore(snake.scores)

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
}


// Create game loop
game.gameLoop(main)

// Keyboard Controls
keyListener(keyboarControls)

//Listen to setting button for open settings
clickListener(game.settings, () => {
    settings.toggleShow()
    game.toggleOpacity()
})
//Listen to setting close button for close settings
clickListener(settings.closeButton, () => {
    settings.toggleShow()
    game.toggleOpacity()
    settings.saveSettings()
})

// Reset game loop when snake speed is changed after reset fps
settings.snakeSpeed.addEventListener("change", () => {
    game.setFps(settings.snakeSpeed.value)
    snake.scoresSum = +settings.snakeSpeed.value
    game.gameLoop(main)
})

//listen digital controls for phones and tablets
clickListener(game.digitalBtnLeft, () => {
    snake.directionNum -= 1
    if (snake.directionNum < 0) snake.directionNum = 3
    snake.direction = chooseDirection(snake.directionNum)
})
clickListener(game.digitalBtnRight, () => {
    snake.directionNum += 1
    if (snake.directionNum > 3) snake.directionNum = 0
    snake.direction = chooseDirection(snake.directionNum)
})



//change Snake speed
settings.foods.addEventListener("change", () => {snake.foodNumber = settings.foods.value})

clickListener(game.restart, () => {
    if (game.notGameOver) return

    if (playerLogged && snake.scores > +settings.userscore.innerText) {
        let session = sessionStorage.getItem('currentUser').split(",")
        session[2] = snake.scores
        sessionStorage.setItem('currentUser', session)
        
        settings.userscore.innerText = snake.scores
        localStorage.setItem(session[1], session)
    }

    snake.reStart()
    game.reStart()
})