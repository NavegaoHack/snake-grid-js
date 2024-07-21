import { sumPositions, equalPositions, generateNewFoodPos } from "./functions.js";


const $ = (element) => document.querySelector(element);

const getBodyClass = () => {
    return $("body").className
}

const getColorVar = (colorvar) => {
    return getComputedStyle($(`:root .${getBodyClass()}`))
                                        .getPropertyValue(colorvar);
}

const bodyLayout = $("body")

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

        this.username = $(".userstat-username");
        this.userscore = $(".userstat-scores span");
        this.usertimeplayed = $(".userstat-timeplayed span");
    }

    toggleShow() {
        this.dom.classList.toggle("--hide-settings")
    }

    altSetSettings() {
        let saved = localStorage.getItem("saveSettings")
        if (!saved) {
            //  [snakeSpeed, food, askLogin, colorTheme]
            saved = [5, 1, false, "default"]
        } else
            saved = JSON.parse(saved)

        bodyLayout.className = saved.at(3)
    }

    setSettings() {
        let saved = localStorage.getItem("saveSettings")
        if (!saved) {
            //  [snakeSpeed, food, askLogin, colorTheme]
            saved = [5, 1, false, "default"]
        } else
            saved = JSON.parse(saved)

        this.snakeSpeed.value = saved.at(0)
        this.foods.value = saved.at(1)
        this.askLogin.checked = saved.at(2)
        this.colorTheme.value = saved.at(3)
        
        bodyLayout.className = saved.at(3)
    }

    saveSettings() {
        let saved = [1, 1, false, "default"]
        saved[0] = +this.snakeSpeed.value
        saved[1] = +this.foods.value
        saved[2] = this.askLogin.checked
        saved[3] = this.colorTheme.value
        bodyLayout.className = this.colorTheme.value
        localStorage.setItem("saveSettings", JSON.stringify(saved))

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

    logUser(credentials) {
        let user =  localStorage.getItem(credentials.user)
        if (user == null) {
            user = [credentials.password, credentials.user, 0, 0]

            let userList
            if (!localStorage.getItem("userList")) userList = []
            else userList = localStorage.getItem("userList").split(",")
            
            console.log(userList)

            userList.push(credentials.user) 

            localStorage.setItem("userList", userList)

            localStorage.setItem(credentials.user, user)
            sessionStorage.clear()
            sessionStorage.setItem("currentUser", user)     
            return {state: true, msg: "A new user has been created"}
        }
        user = user.split(",")
        if (user.at(0) == credentials.password) {
            sessionStorage.clear()
            sessionStorage.setItem("currentUser", user)     
            
            return {state: true, msg: "User validated"}
        }
        else return {state: false, msg: "Incorrect Password"}

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
        this.canvasSize = null 
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

    setCanvasSize(size = 40) {
        this.canvasSize = size
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

        this.context.fillStyle = getColorVar('--dark-blue');
        this.context.fillRect(0, 0, this.canvasSize * 10, this.canvasSize * 10)
    }

    drawLines() {
        this.context.strokeStyle = getColorVar('--mid-blue');
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

const snake = new Snake()

class Users {
    constructor () {
        this.list = $(".users__list")
        this.stats = $(".user__stats")
        this.name = $(".user__stats__name span")
        this.email = $(".user__stats__email span")
        this.scores = $(".user__stats__scores span")
        this.time = $(".user__stats__time span")
        this.edit = $(".user__stats__edit")
        this.remove = $(".user__stats__delete")
    }

    printList() {
        const userBtnModel = (name) => {
            let btn = document.createElement("article")
            let text = document.createElement("h2")
            
            btn.className = "user__list__client --button"
            text.className = "user__list__clientname"

            text.dataset.name = name
            text.innerText = name
            btn.appendChild(text)

            return btn
        }

        let usersList = localStorage.getItem("userList")
        if (!usersList) return 
        usersList = usersList.split(",")
        usersList.forEach(user => {
            this.list.appendChild(userBtnModel(user))
        })
    }

    showUserStats(user) {
        this.name.innerText = user[1]
        this.email.innerText = user[1]
        this.scores.innerText = user[2]
        this.time.innerText = user[3]
    }

    resetUserStats() {
        this.name.innerText = "---"
        this.email.innerText = "---"
        this.scores.innerText = "---" 
        this.time.innerText = "---" 
    }

    resetList() {
        this.list.innerHTML = ""
    }

    removeUser(name) {
        let usersList = localStorage.getItem("userList").split(",")
        usersList.splice(usersList.indexOf(name), 1)
        usersList.length ?
            localStorage.setItem("userList", usersList) :
            localStorage.removeItem("userList")

        localStorage.removeItem(name.toLowerCase())
        console.log("item removed")
        this.resetList()
        this.printList()
        this.resetUserStats()
    }

    editUser(name) {
        this.resetUserStats()
    }

}

const users = new Users()


export { settings, index, loginPopup, game, snake, users, bodyLayout}