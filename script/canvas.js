let canvas = document.querySelector(".game__canvas")
canvas.width = canvas.height = 400;
let context = canvas.getContext("2d")


function main() {
    if (!canvas.getContext) return false
    
    drawBg()
    
    let tiles = createTilePath(16,400)
    drawLines(tiles, 400)    
    return true
}

function drawBg() {
    context.fillStyle = "#181825";
    context.fillRect(0,0,400,400);
}

function createTilePath(tiles, canvasSize) {
    let arrTiles = []

    let tileSize = Math.floor(canvasSize / tiles)

    for (let i = 1; i < tiles; i++) {
        arrTiles.push(i * tileSize)
    }

    return arrTiles
}

function drawLines(tiles, canvasSize) {
    context.strokeStyle = "#222738"
    context.lineWidth = 1

    tiles.forEach(tile => {
        context.beginPath()
        context.moveTo(tile, 0)
        context.lineTo(tile, canvasSize)
        context.stroke()
    });
    tiles.forEach(tile => {
        context.beginPath()
        context.moveTo(0, tile)
        context.lineTo(canvasSize, tile)
        context.stroke()
    });
 
}

main() ? console.log("OK") : console.log("tu ordenador es muy VIEJO mardito loco");
