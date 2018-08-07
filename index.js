const WORLD_SIZE = 64;
const TILE_SIZE = 32;
let generation = new Array(WORLD_SIZE);
let futureGeneration = new Array(WORLD_SIZE);

function getEmpty2DArray() {
    const arr = new Array(WORLD_SIZE);
    for (var i = 0; i < WORLD_SIZE; i++) {
        arr[i] = new Array(WORLD_SIZE);
    }
    return arr;
}

function createGeneration(worldSize, tileSize) {
    generation = getEmpty2DArray();
    futureGeneration = getEmpty2DArray();

    for (var x = 0; x < worldSize; x++) {
        for (var y = 0; y < worldSize; y++) {
            generation[x][y] = Math.random() > 0.5 ? true : false;
        }
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    createGeneration(WORLD_SIZE, TILE_SIZE);
}

function getNeighbours(currentX, currentY) {
    const neighbours = [];
    generation.forEach((col, x) => {
        col.forEach((row, y) => {
            if (currentX === x && currentY === (y - 1)) {
                neighbours.push(row);
            } else if (currentX === x && currentY === (y + 1)) {
                neighbours.push(row);
            } else if (currentX === (x - 1) && currentY === y) {
                neighbours.push(row);
            } else if (currentX === (x + 1) && currentY === y) {
                neighbours.push(row);
            } else if (currentX === (x + 1) && currentY === (y + 1)) {
                neighbours.push(row);
            } else if (currentX === (x - 1) && currentY === (y - 1)) {
                neighbours.push(row);
            } else if (currentX === (x - 1) && currentY === (y + 1)) {
                neighbours.push(row);
            } else if (currentX === (x + 1) && currentY === (y - 1)) {
                neighbours.push(row);
            }
        });
    });
    return neighbours;
}

function getAliveCount(neighbours) {
    return neighbours.filter(neighbour => neighbour).length;
}

function evolve() {
    for (var x = 0; x < WORLD_SIZE; x++) {
        for (var y = 0; y < WORLD_SIZE; y++) {
            const cell = generation[x][y];
            const neighbours = getNeighbours(x, y);
            let futureState = false;

            const aliveCount = getAliveCount(neighbours);

            if (!cell) {
                if (aliveCount === 3) {
                    futureGeneration[x][y] = true;
                    continue;
                }
            }

            if (cell) { 
                if (aliveCount === 2 || aliveCount === 3) {
                    futureGeneration[x][y] = true;
                    continue;
                }
            }

            futureGeneration[x][y] = false;
        }
    }

    generation = [ ...futureGeneration ];
    futureGeneration = getEmpty2DArray();
}

let keyPressed = false;

function keyReleased() {
    keyPressed = true;
}

function draw() {
    background(255);
    fill(0);
    for (var x = 0; x < WORLD_SIZE; x++) {
        for (var y = 0; y < WORLD_SIZE; y++) {
            if (generation[x][y]) {
                fill(100, 100, 100);
            } else {
                fill(0, 0, 0);
            }
            rect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
    
        evolve();

}