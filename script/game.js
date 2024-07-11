import { clickListener, keyListener, keyboarControls } from "./functions.js";
import { game, settings, snake } from "./dom.js";

game.setFps(5)
game.setCanvasContext()
game.setCanvasSize()
game.setTileSizes()

//setting tiles in the snake object
snake.borderTile = game.tiles


const main = () => {
   
    console.log(game.notGameOver)
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
})

// Reset game loop when snake speed is changed after reset fps
clickListener(settings.snakeSpeed, () => {
    game.setFps(settings.snakeSpeed.value)
    snake.scoresSum = +settings.snakeSpeed.value
    game.gameLoop(main)
})


//change Snake speed
clickListener(settings.foods, () => {snake.foodNumber = settings.foods.value})

clickListener(game.restart, () => {
    if (game.notGameOver) return

    snake.reStart()
    game.reStart()
})