import { settings, index } from "./dom.js";
import { snake } from "./dom.js";

const clickListener = (element, func) => {
    element.addEventListener("click", func);
}

const keyListener = (func) => {
    document.addEventListener("keydown", func)
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

const sumPositions = (posA, posB) => {
    return {x: posA.x + posB.x, y: posA.y + posB.y}
}

const equalPositions = (posA, posB) => {
    return (posA.x == posB.x && posA.y == posB.y)
}

const generateNewFoodPos = () => {
    //random number between 0 to max tiles number
    let rN = () => {return Math.floor(Math.random() * snake.borderTile)}

    //creating two new positions
    let newPositions = []
    
    for (let i = 0; i < snake.foodNumber; i++) newPositions.push({x: rN(), y: rN()})
    
    return newPositions
}

const checkSnakeOverflow = (headPos, tiles) => {
    //object for simplifies the change of each position case
    let warpUtility = {}
    warpUtility[-1]       = () => {return maxTiles - 1}
    warpUtility[maxTiles] = () => {return 0}

    //setting the headpositions IF the position matches with one of the two cases above (with te "?")
    //and using nullish coallecencing ("??")
    headPos.x = warpUtility[headPos.x]?.() ?? headPos.x
    headPos.y = warpUtility[headPos.y]?.() ?? headPos.y

    //obvious xd
    return headPos
}

const autoCrash = (dir) => {
    const oppositeDirection = {}

    oppositeDirection["left"] = "right";
    oppositeDirection["up"] = "down";
    oppositeDirection["down"] = "up";
    oppositeDirection["right"] = "left";

    if (oppositeDirection[dir] == snake.direction) return true
}

const keyboarControls = (event) => {

    // Object utility for an easier handle of the direction with keyboard inputs
    const direction = {}

    //setting all the input and its respective direction string
    //maybe this can be configurable in the configs section
    direction["w"]          = "up"
    direction["ArrowUp"]    = "up"
    direction["a"]          = "left"
    direction["ArrowLeft"]  = "left"
    direction["s"]          = "down"
    direction["ArrowDown"]  = "down"
    direction["d"]          = "right"
    direction["ArrowRight"] = "right"

    if (autoCrash(direction[event.key])) return

    //changing the variable currentDirecion with the direction object and the event
    snake.direction = direction[event.key] ?? snake.direction
}

const randomTiles = (lenTiles) => {
    return Math.floor(Math.random() * lenTiles)
}

const randomDirection = (n) => {
    const pos = {
        0: "left",
        1: "up",
        2: "right",
        3: "down"
    }

    if (autoCrash(pos[n])) return snake.direction

    return pos[n]
}



export {
    keyboarControls,
    clickListener,
    keyListener,
    toggleShowSettings,
    loginUser,
    sumPositions,
    equalPositions,
    generateNewFoodPos,
    randomTiles,
    randomDirection
}