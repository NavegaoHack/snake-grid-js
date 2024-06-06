/**@type {HTMLCanvasElement} */
let canvas = document.querySelector(".game__canvas")

/**@type {CanvasRenderingContext2D} */
let context = canvas.getContext("2d")

/**
 * @function
 * @returns {boolean} True for a correct execution | False in case of deprecated browser (without canvas)
 */
function main() {
    if (!canvas.getContext) return false
    
    drawBg()
    
    let tiles = createTilePath(16, canvas.width)
    drawLines(tiles, canvas.width)
    setSnake(-10, -10, tiles)
    return true
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

    for (let i = 1; i < tiles; i++) {
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
        context.beginPath()
        context.moveTo(tile, 0)
        context.lineTo(tile, canvasSize)
        context.stroke()
    });
    tiles.sequence.forEach(tile => {
        context.beginPath()
        context.moveTo(0, tile)
        context.lineTo(canvasSize, tile)
        context.stroke()
    });
 
}

function setSnake(posX, posY, tiles) {
    context.fillStyle = "#ffffff";
    //creates a toroid position (end in a border, begins at the other)
    posX >= 0 ? posX = posX % (tiles.sequence.length + 1) : posX = tiles.sequence.length - (posX + 1)
    posY >= 0 ? posY = posY % (tiles.sequence.length + 1) : posY = tiles.sequence.length - (posY + 1)


    console.log(posX, posY)

    //context.fillRect(pos.x,pos.y,400,400);
}


//setting the canvas size first
setCanvasSize(40)

main() ? console.log("OK") : console.log("tu ordenador es muy VIEJO mardito loco");
