import { sumPositions, equalPositions, generateNewFoodPos } from "./functions.js";


const $ = (element) => document.querySelector(element);


//create settings section
class Settings {
    constructor() {
        this.dom = $(".settings");
        this.closeButton = $(".settings-head .--back-button");
        this.snakeSpeed = $("#snakeSpeed"); //speed of the snake, in blocks per second
        this.foods = $("#numberFood"); //number of foods displayed in the canvas
        this.askLogin = $("#askLogin");
        this.playWithAI = $("#AIPlay");
        this.twoPlayers = $("#twoPlayers");
        this.colorTheme = $("#colorTheme");
    }

    toggleShow() {
        this.dom.classList.toggle("--hide-settings")
    }
}

const settings = new Settings()

//create Index section
class Index {
    constructor() {
        this.settings = $(".settings-btn");
        this.play = $(".play-btn");
        this.users = $(".users-btn");
        this.main = $(".index")
        this.loginPopup = $(".popup-login");
    }

    toggleOpacity() {
        this.main.classList.toggle("--opacity")
    }
}



const index = new Index()

class LoginPopup {
    constructor() {
        this.main = $(".popup-login")
        this.alert = $(".popup-login__alert-msg")
        this.back = $(".popup-back-btn")
        this.continue = $(".popup-play-btn")
        this.login = $(".popup-login-btn")
        this.username = $("#loginUsername")
        this.password = $("#loginUserpassw")
    }

    getCredentials() {
        return {user: this.username.value, password: this.password.value}
    }

    alertMessage(message = false) {
        if (message) {
            console.log(message)
            this.alert.innerText = message
            return
        }
        this.alert.innerText = ""
    }

    cleanFields() {
        this.username.value = ""
        this.password.value = ""
    }
    
    showPopupLogin() {
        this.main.classList.toggle("popup-login-show",) ? 
            this.main.classList.add("popup-enable-display") :
            setTimeout(() => {this.main.classList.remove("popup-enable-display")}, 500)
    }
}

const loginPopup = new LoginPopup()



/* GAME DOM */

class Game {
    constructor() {
        this.main = $(".game__container")
        this.settings = $(".game__settings")
        this.restart = $(".game__start-btn")
        this.scores = $(".game__scores__counter")
        this.canvasSize = 40
        this.canvas = $(".game__canvas")
        this.context = null
        this.tiles = 16
        this.tileSize = null
        this.notGameOver = true
        this.fps = null
        this.gameLoopID = null
    }

    setCanvasContext() {
        this.context = this.canvas.getContext("2d")
    }

    setCanvasSize() {
        this.canvas.style.width = this.canvas.style.height = this.canvasSize + "rem"
        this.canvas.width = this.canvas.height = this.canvasSize * 10
    }

    setTileSizes() {
        this.tileSize = Math.floor((this.canvasSize * 10) / this.tiles)
    }

    setFps(fps) {
        this.fps = 1000 / fps
    }

    drawScore(score) {
        this.scores.innerText = (score > 9) ? `${score}` : `0${score}`
    }

    drawBackground() {
        this.context.fillStyle = "#181825"
        this.context.fillRect(0, 0, this.canvasSize * 10, this.canvasSize * 10)
    }

    drawLines() {
        this.context.strokeStyle = "#222738"
        this.context.lineWidth = 1

        for (let i = 1; i < this.tiles; i++) {
            // Y axis
            this.context.beginPath()
            this.context.moveTo( i * this.tileSize, 0 )
            this.context.lineTo( i * this.tileSize, this.canvasSize * 10 )
            this.context.stroke()
            // X axis
            this.context.beginPath()
            this.context.moveTo( 0, i * this.tileSize )
            this.context.lineTo( this.canvasSize * 10, i * this.tileSize )
            this.context.stroke()
        }
    }

    drawPoint(color, pos) {
        // Available colors
        const colors = {
            white: "#FFFFFF",
            red: "#FF3D02"
        }
        this.context.fillStyle = colors[color]
        this.context.fillRect(
            pos.x * this.tileSize,
            pos.y * this.tileSize,
            this.tileSize,
            this.tileSize
        )
    }

    gameLoop(func) {
        if (this.gameLoopID) clearInterval(this.gameLoopID)
        this.gameLoopID = setInterval(func, this.fps)
    }

    toggleOpacity() {
        this.main.classList.toggle("--opacity")
    }

    reStart() {
        this.notGameOver = true
    }

}

const game = new Game()

class Snake {
    constructor() {
                    // { HEAD }                     { TAIL }                               
        this.body = [{x: 15, y: 0}, {x:14, y: 0}, {x:13, y: 0}]
        this.foods = [{x:15, y: 15}]
        this.foodNumber = 1
        this.direction = "right"
        this.borderTile = null
        this.scores = 0
        this.scoresSum = 5
    }

    checkSnakeCollission(pos) {
        let result = false
        this.body.some(section => {
            if (equalPositions(pos, section)) result = true // cuz array.some no works as I spected :(
        })

        return result
    }
    checkFoodCollission(pos) {
        let result
        this.foods.some((food, i) => {
            result = equalPositions(pos, food)
            if (result) this.foods.splice(i, 1)
            //console.log("for i: ", index, "f: ", food, "p: ", pos, " = ", (pos.x == food.x && pos.y == food.y))
        })
        return result
    }
    newFood() {
        this.foods = generateNewFoodPos()
    }

    checkOverflow(pos) {
        const warp = {}
        warp[-1] = () => {return this.borderTile - 1}
        warp[this.borderTile] = () => {return 0}

        // setting new toroidal position or the same position
        pos.x = warp[pos.x]?.() ?? pos.x
        pos.y = warp[pos.y]?.() ?? pos.y
    }

    moveSnake(direction) {
        const pos = {
            left: {x: -1, y: 0},
            up: {x: 0, y: -1},
            right: {x: 1, y: 0},
            down: {x: 0, y: 1}
        }
        const newHeadPos = sumPositions(this.body.at(0), pos[direction])
        //checking for collission

        this.checkOverflow(newHeadPos)

        const snakeCrash = this.checkSnakeCollission(newHeadPos)
        if (snakeCrash) return false 
       
        
        this.body.unshift(newHeadPos)

        if (this.checkFoodCollission(newHeadPos)) {
            this.scores += this.scoresSum
            if (!this.foods.length) this.newFood()
        }
        else this.body.pop()

        return true
    }

    reStart() {
        this.body = [{x: 2, y: 0}, {x: 1, y: 0}, {x: 0, y:0}]
        this.scores = 0
        this.direction = "right"
    }
}
/*
*/
const snake = new Snake()


export { settings, index, loginPopup, game, snake}