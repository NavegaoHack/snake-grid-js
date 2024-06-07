/**@type {HTMLCanvasElement} */
let canvas = document.querySelector(".game__canvas")

/**@type {CanvasRenderingContext2D} */
let context = canvas.getContext("2d")

/**@type {Array[Object{number, number}]} array of Objets (x, y)*/
let snake = [{x: 15, y: 0}, {x:14, y:0}]

/**@type {number} number of tiles that will be drawed in each fps */
let maxTiles = 16

//current direction is a global string variable that contain "left" or "right" or "up" or "down"
let currentDirection = "right"


function sumPositions(posA, posB) {
    return {x: posA.x + posB.x, y: posA.y + posB.y}
}

function checkSnakeOverflow(headPos) {
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

function moveSnake(direction, grow = 0) {
    //setting the directions available
    //whith unitary objects to make it
    //easy the direction change
    let unitObjects = {
        left:  {x: -1, y: 0},
        up:    {x: 0,  y: -1},
        right: {x: 1,  y:  0},
        down:  {x: 0,  y:  1},
    }
    let currentHeadPos = snake.at(0)
    let newHeadPos = sumPositions(currentHeadPos, unitObjects[direction])

    //check if newHeadPos overflow canvas borders
    newHeadPos = checkSnakeOverflow(newHeadPos)

    //set the new snake head
    snake.unshift(newHeadPos)
    //delete the snake tail
    snake.pop() 
}

/**
 * assing nd syncronize the rem size between css style and the canvas size
 * @param {number} size size (in rems) of the canvas
 */
function setCanvasSize(size) {
    canvas.style.width = canvas.style.height = size + "rem" 
    canvas.width = canvas.height = size * 10;
}


/**@function drawBg*
 * @returns {undefined}
 */
function drawBg() {
    context.fillStyle = "#181825";
    context.fillRect(0,0,400,400);
}

function drawPoint(color, pos, tileSize) {
    //declare the color
    let colors = {
        white: "#ffffff",
        red: "#ff3d02"
    }
    //set the color in context to use
    context.fillStyle = colors[color];
    context.fillRect(pos.x, pos.y, tileSize, tileSize);
}


/**
 * 
 * @param {number} tiles number of tiles that are wished to be drawed (same number for both x and y axis)
 * @param {number} canvasSize size (in rems) for calculate the exact tyle size inside the loop
 * @returns {} tiles sequence of position for build a grid inside the canvas with straight lines 
 */
function createTilePath(tiles, canvasSize) {
    let arrTiles = {
        sequence: [],
        size: 0
    }

    let tileSize = Math.floor(canvasSize / tiles)

    arrTiles.size = tileSize

    for (let i = 1; i < tiles + 1; i++) {
        arrTiles.sequence.push(i * tileSize)
    }

    return arrTiles
}

/**
 * 
 * @param {array[number]} tiles sequence of positions for build (draw) the tiles
 * @param {number} canvasSize size (in rems) of the canvas
 */
function drawLines(tiles, canvasSize) {
    context.strokeStyle = "#222738"
    context.lineWidth = 1

    tiles.sequence.forEach(tile => {
        // Y axis
        context.beginPath()
        context.moveTo(tile, 0)
        context.lineTo(tile, canvasSize)
        context.stroke()
        // X axis
        context.beginPath()
        context.moveTo(0, tile)
        context.lineTo(canvasSize, tile)
        context.stroke()
    });
}

/**
 * Setting the position of each body unit that forms the snake (print each square)
 * @param {number} posX position on axis x (top left to top right of canvas)
 * @param {number} posY position on axis y (top left to bottom left of canvas)
 * @param {Object} tiles object with position of tiles and the size of each one 
 */
function setSnake(tiles) {
    context.fillStyle = "#ffffff";
   
    snake.forEach(pos => {
        
        let position = {
            x: tiles.sequence[pos.x] - tiles.size,
            y: tiles.sequence[pos.y] - tiles.size 
        }

        drawPoint("white", position, tiles.size)
        
    })


}

function setKeyboarControls(event) {
    // Object utility for an easier handle of the direction with keyboard inputs
    let directionUtility = {}

    //setting all the input and its respective direction string
    //maybe this can be configurable in the configs section
    directionUtility["w"]          = "up"
    directionUtility["ArrowUp"]    = "up"
    directionUtility["a"]          = "left"
    directionUtility["ArrowLeft"]  = "left"
    directionUtility["s"]          = "down"
    directionUtility["ArrowDown"]  = "down"
    directionUtility["d"]          = "right"
    directionUtility["ArrowRight"] = "right"

    //changing the variable currentDirecion with the direction object and the event
    currentDirection = directionUtility[event.key] ?? currentDirection
}


/**
 * @function
 * @returns {boolean} True for a correct execution | False in case of deprecated browser (without canvas)
 */
function main() {
    if (!canvas.getContext) return false

    //create fps limit
    let fps = Math.floor(1000 / 6) 
    
    //creating the position of lines (in an array) that serve to draw the lines of the "tiles"
    let tiles = createTilePath(maxTiles, canvas.width)

    setInterval(() => {
        //coloring|cleaning the canvas
        drawBg()
        //moving the snake
        moveSnake(currentDirection)
        //drawing the snake
        setSnake(tiles)
        //drawing the "tiles" after that background and snake was drawed
        drawLines(tiles, canvas.width)
    }, fps)

    //set keyboard listener
    document.addEventListener("keydown", setKeyboarControls)

    
    return true
}

//setting the canvas size first
setCanvasSize(40)

main() ? console.log("OK") : console.log("tu ordenador es muy VIEJO mardito loco");

