class Map {
    #mapDisplayer;
    #randomPosition;
    #nbCells;
    #nbObstacles;
    #listCells;
    #curListIndex = 0;
    #width;

    constructor(width, height, nbObstacles) {
        this.#mapDisplayer = new MapDisplayer(width, height);
        this.#listCells = [];
        this.#randomPosition = new RandomPosition(this.#listCells, width, height);
        this.#nbCells = width * height;
        this.#nbObstacles = nbObstacles;
        this.#width = width;
    }

    addCell (x, y, type) {
        this.#listCells[this.#curListIndex] = {
            cellId: this.#curListIndex,
            type,
            x,
            y,
        };
        this.#curListIndex++;
    }

    initBoard () {
        this.#mapDisplayer.drawBackground();
        let x = 0;
        let y = 0;

        for (let i = 0; i < this.#nbCells; i++) {
            this.addCell(x, y, CELL_TYPES.EMPTYCELL);
            this.#mapDisplayer.drawBorder(x, y);
            x++;
            if (x === this.#width) {
                x = 0;
                y++;
            }
        }
    }

    initObstacles () {
        for (let i = 0; i < this.#nbObstacles; i++){
            const position = this.#randomPosition.getObstaclePosition();
            this.#listCells[(position.y * this.#width) + position.x].type=CELL_TYPES.OBSTACLE;
            this.#mapDisplayer.drawObstacle(position.x, position.y);
        }
        console.log(this.#listCells);
    }

    createMap() {
        this.initBoard()
        this.initObstacles();
    }
}
