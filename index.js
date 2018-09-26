class Grid {
    constructor (options) {
        this.numberOfRows = options.numberOfRows;
        this.numberOfColumns = options.numberOfColumns;
        this.targetElement = options.targetElement || document.body; 
        this.cellClasses = options.cellClasses || [];
        this.gridElement = this.createGridElement();
        this.rows = [];
        this.createRows();
        this.gridElement.addEventListener("click", this.clickEvent.bind(this)); 
        console.log(this)
    }

    // general for all prototypes; methods
    clickEvent(event) {
        if(!event.target.classList.contains("cell")) return;
        const cellElement = event.target;
        console.log(cellElement);
        console.log("Row Index:", cellElement.dataset.rowIndex, "| Column Index:", cellElement.dataset.colIndex);
        const rowIndex = Number(cellElement.dataset.rowIndex);
        const colIndex = Number(cellElement.dataset.colIndex);
        const clickedCell = this.findCellByIndexes(rowIndex, colIndex);
        const clickedCellBelow = this.findCellByIndexes(rowIndex + 1, colIndex); 
        console.log("index",clickedCell);
        console.log("index below",clickedCellBelow);
    }

    createGridElement() {
        const element = document.createElement("div");
        element.classList.add("grid");
        this.targetElement.appendChild(element);
        return element;
    }
    createRowElement(rowIndex) {
        const element = document.createElement("div");
        element.classList.add("row");
        element.dataset.rowIndex = rowIndex;
        this.gridElement.appendChild(element);
        return element;
    }
    createRows() {
        const rows = [];
        for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
            this.rows[rowIndex] = [];
            const rowElement = this.createRowElement(rowIndex);
            this.createCells(rowIndex, rowElement)
        }
        return rows;
    }
    createCells(rowIndex, rowElement) {
        for (let colIndex = 0; colIndex < this.numberOfColumns; colIndex++) {
            const cell = new Cell(rowIndex, colIndex, this.cellClasses);
            this.rows[rowIndex][colIndex] = cell;
            rowElement.appendChild(cell.element);
        }
    }
    findCellByIndexes(rowIndex, colIndex) {
        rowIndex = Number(rowIndex);
        colIndex = Number(colIndex);
        const row = this.rows[rowIndex];
        const cell = row ? row[colIndex] : null;
        return cell || null;
    }
}

class Cell {
    constructor (rowIndex, colIndex, cellClasses) {
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.cellClasses = cellClasses || [];
        this.element = this.createElement();
    }

    // generals 
    createElement() {
        const element = document.createElement("div");
        element.classList.add("cell", ...this.cellClasses);
        element.cellInstance = this; 
        element.dataset.rowIndex = this.rowIndex;
        element.dataset.colIndex = this.colIndex;
        return element;
    }
}

// const above = this.findCellByIndexes(rowIndex - 1, colIndex);
//         const aboveRight = this.findCellByIndexes(rowIndex - 1, colIndex + 1);
//         const right = this.findCellByIndexes(rowIndex, colIndex + 1);
//         const belowRight = this.findCellByIndexes(rowIndex + 1, colIndex + 1);
//         const below = this.findCellByIndexes(rowIndex + 1, colIndex);
//         const belowLeft = this.findCellByIndexes(rowIndex + 1, colIndex -1);
//         const left = this.findCellByIndexes(rowIndex, colIndex - 1);
//         const aboveLeft = this.findCellByIndexes(rowIndex - 1, colIndex - 1);
//         const clickedCellNeighbors = [above, aboveRight, right, belowRight, below, belowLeft, left, aboveLeft];
//         console.log("index", clickedCell);
//         console.log("Neighbor Indexes (clockwise from top): ", clickedCellNeighbors);


const genericGrid = new Grid({
    numberOfRows: 10,
    numberOfColumns: 10,
    targetElement: document.querySelector("main"),
    cellClasses: ["brown-border"],
});

const genericGrid2 = new Grid({
    numberOfRows: 5,
    numberOfColumns: 3,
    targetElement: document.querySelector("main"),
    cellClasses: ["blue-border"],
});

