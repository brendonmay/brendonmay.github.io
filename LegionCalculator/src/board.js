import { Point } from './modules/point.js';
import { LegionSolver } from './modules/legion_solver.js';
import { pieceColours, pieces } from './pieces.js';
import { i18n } from './i18n.js';

document.getElementById('disableBoard').addEventListener('click', function () {
    //here

    //introduce checks to ensure given their legion level that they are indicating the correct number of attackers
    //have them write in their old legion stat boosts to determine a damage gain from BIS distribution

    //optimizing
    //1. initialBoardTemplate(crit_rate_amount); setup initial board
    //2. allStatCombinations(crit_rate_amount); all the possible distributions on the legion board
    //3. Determine which permutation is the one which raises dmg the most; build it into hyper stat optimization algorithm
    //4. buildBoard(stat, attack, IED, crit_rate, crit_dmg, boss); setup board to be solved with best stats
    //5. Solve the board

    //buildBoard(board_stat, board_attack, board_ied, board_crit_rate, board_cdmg, board_boss)
    // document.getElementById("clearBoard").click();
    // buildBoard(35, 10, 0, 10, 10, 10);

})


document.getElementById('result').addEventListener("DOMSubtreeModified", function () {
    var goBuild = document.getElementById('result').innerHTML == 'Step 3/6. Building Legion Board...';

    if (goBuild) {

        var board_stat = parseInt(JSON.parse(localStorage.getItem('board_stat')))
        var board_attack = parseInt(JSON.parse(localStorage.getItem('board_attack')))
        var board_ied = parseFloat(JSON.parse(localStorage.getItem('board_ied')))
        var board_crit_rate = parseInt(JSON.parse(localStorage.getItem('legion_crit_blocks')));
        var board_cdmg = parseFloat(JSON.parse(localStorage.getItem('board_cdmg')))
        var board_boss = parseInt(JSON.parse(localStorage.getItem('board_boss')))

        // document.getElementById("clearBoard").click();
        // clearBoard();
        //console.log(board_stat, board_attack, board_ied, board_crit_rate, board_cdmg, board_boss)
        buildBoard(board_stat, board_attack, board_ied, board_crit_rate, board_cdmg, board_boss);

        //move to step 4
        document.getElementById('result').innerHTML = 'Step 4/6. Solving Legion Board...';
        runSolver();
    }
});


function initialBoardTemplate(crit_rate_amount) {
    var row = 10;
    if (crit_rate_amount > 0) row = 9;
    var column = 5;
    while (column < 17) {
        setBoard(row, column, 0);
        column++;
    }
}

function isFirstPiece(legion_group) {
    //run initial check if its first block assigned in group
    var i = 0;
    while (i < legion_group.length) {
        var row = legion_group[i].x;
        var column = legion_group[i].y;
        if (board[row][column] == 0) return false
        i++;
    }

    return true
}
function isValidSpace(row, column, group_number) {
    //need to check that spot is unlocked on legion board
    //here this region should work but isnt tested (checking youre within restrictions)
    var layers_unlocked = JSON.parse(localStorage.getItem('layersUnlocked')); //avoid using local storage
    var layer_data = {
        0: { row_span: [5, 14], col_span: [5, 16] },
        1: { row_span: [4, 15], col_span: [4, 17] },
        2: { row_span: [3, 16], col_span: [3, 18] },
        3: { row_span: [2, 17], col_span: [2, 19] },
        4: { row_span: [1, 18], col_span: [1, 20] },
        5: { row_span: [0, 19], col_span: [0, 21] }
    }

    var restrictions = layer_data[parseInt(layers_unlocked)];

    if (row < restrictions.row_span[0] || row > restrictions.row_span[1] || column < restrictions.col_span[0] || column > restrictions.col_span[1]) {
        return false
    }

    //check left
    if (column - 1 >= 0) {
        if (group_number == findGroupNumber(row, column - 1)) {
            if (board[row][column - 1] == 0) {
                return true
            }
        }

    }
    //check right
    if (column + 1 <= 21) {
        if (group_number == findGroupNumber(row, column + 1)) {
            if (board[row][column + 1] == 0) {
                return true
            }
        }

    }
    //check down
    if (row + 1 <= 19) {
        if (group_number == findGroupNumber(row + 1, column)) {
            if (board[row + 1][column] == 0) {
                return true
            }
        }

    }
    //check up
    if (row - 1 >= 0) {
        if (group_number == findGroupNumber(row - 1, column)) {
            if (board[row - 1][column] == 0) {
                return true
            }
        }

    }
    return false
}

function buildBoard(stat, attack, IED, crit_rate, crit_dmg, boss) {
    //attack >= 5 and stat >= 25
    board = [];
    for (let i = 0; i < 20; i++) {
        board[i] = [];
        for (let j = 0; j < 22; j++) {
            board[i][j] = -1;
        }
    }
    boardFilled = 0;
    localStorage.setItem("legionBoard", JSON.stringify(board));
    localStorage.setItem("boardFilled", JSON.stringify(0));

    resetBoard();

    var has_crit_rate = crit_rate != 0
    initialBoardTemplate(has_crit_rate);

    var stat_blocks = (stat / 5) - 5;
    var attack_blocks = attack - 5;
    var IED_blocks = IED;
    var crit_rate_blocks = crit_rate;
    var crit_dmg_blocks = crit_dmg * 2;
    var boss_dmg_blocks = boss;

    //assume stat on left, attack on right
    var block_types = [crit_rate_blocks, crit_dmg_blocks, IED_blocks, boss_dmg_blocks];
    var legion_groups = [{ x: 9, y: 17 }, { x: 9, y: 4 }, { x: 10, y: 4 }, { x: 10, y: 17 }];

    var crit_block_types = [stat_blocks, attack_blocks];
    var crit_legion_groups = [{ x: 9, y: 5 }, { x: 9, y: 13 }];

    if (!has_crit_rate) { //update these 
        var crit_block_types = [stat_blocks, attack_blocks];
        var crit_legion_groups = [{ x: 10, y: 5 }, { x: 10, y: 13 }];
    }

    var w = 0
    while (w < 2) {
        if (w == 0) {
            var types = crit_block_types;
            var groups = crit_legion_groups;
        }
        else {
            var types = block_types;
            var groups = legion_groups;
        }
        var z = 0;
        while (z < types.length) {
            var group_number = findGroupNumber(groups[z].x, groups[z].y);
            var legion_group = legionGroups[group_number];
            var i = 0;
            var blocks_distributed = 0;

            while (blocks_distributed < types[z]) {
                var row = legion_group[i].x;
                var column = legion_group[i].y;

                if (board[row][column] != 0) {
                    if (isFirstPiece(legion_group)) {
                        setBoard(groups[z].x, groups[z].y, 0);
                        blocks_distributed++;
                    }
                    else {
                        //check that its touching another enabled block within the group
                        if (isValidSpace(row, column, group_number)) {
                            setBoard(row, column, 0);
                            blocks_distributed++;
                        }
                    }
                }
                i++;
                if (i == legion_group.length) i = 0;
            }
            z++;
        }
        w++
    }
}

//i = row #, j = col #
//let board = JSON.parse(localStorage.getItem("legionBoard"));//rows (0-19), columns (0-21)
//if (!board) {
let board = [];
for (let i = 0; i < 20; i++) {
    board[i] = [];
    for (let j = 0; j < 22; j++) {
        board[i][j] = -1;
    }
}
//}
let legionSolvers = [];

const states = {
    START: 'start',
    RUNNING: 'running',
    PAUSED: 'paused',
    COMPLETED: 'completed',
}
let state = states.START;

const legionGroups = [];
for (let i = 0; i < 16; i++) {
    legionGroups[i] = [];
}

document.querySelector('#legionBoard tbody').innerHTML =
    board.map(row => `<tr>${row.map(_ => `<td class="legionCell"></td>`).join('')}</tr>`).join('');

setLegionBorders();
setLegionGroups();
colourBoard();

let boardFilled = 0;
if (localStorage.getItem("boardFilled")) {
    boardFilled = JSON.parse(localStorage.getItem("boardFilled"));
    document.getElementById('boardFilledValue').innerText = `${boardFilled}`;
}

let isBigClick = false;
if (localStorage.getItem("isBigClick")) {
    document.getElementById("bigClick").checked = JSON.parse(localStorage.getItem("isBigClick"));
    if (JSON.parse(localStorage.getItem("isBigClick"))) {
        activateBigClick();
    }
}

//activateLiveSolve();

// if (localStorage.getItem("isLiveSolve")) {
//     document.getElementById("liveSolve").checked = JSON.parse(localStorage.getItem("isLiveSolve"));
//     if (JSON.parse(localStorage.getItem("isLiveSolve"))) {
//         activateLiveSolve();
//     }
// }

document.getElementById("bigClick").addEventListener("click", activateBigClick);
document.getElementById("liveSolve").addEventListener("click", activateLiveSolve);
document.getElementById("clearBoard").addEventListener("click", clearBoard);
document.getElementById("boardButton").addEventListener("click", handleButton);
document.getElementById("resetButton").addEventListener("click", reset);
document.getElementById("darkMode").addEventListener("click", activateDarkMode);

// let dragging = false;
// let dragValue;
// for (let i = 0; i < board.length; i++) {
//     for (let j = 0; j < board[0].length; j++) {
//         let grid = getLegionCell(i, j)

//         grid.addEventListener("mousedown", () => {
//             dragValue = board[i][j] == 0 ? -1 : 0;
//             setBoard(i, j, dragValue); // dragValue = 0 (filled), dragValue = -1 (not filled)
//             dragging = true;
//         });
//         grid.addEventListener("mouseover", () => {
//             if (dragging) {
//                 setBoard(i, j, dragValue);
//             } else {
//                 hoverOverBoard(i, j);
//             }
//         });
//         grid.addEventListener("mouseout", () => {
//             if (!dragging) {
//                 hoverOffBoard(i, j);
//             }
//         });
//     }
// }
// document.documentElement.addEventListener("mouseup", () => { dragging = false });
// document.getElementById("legion").addEventListener("dragstart", (evt) => evt.preventDefault());

function setLegionGroups() {
    for (let i = 0; i < board.length / 4; i++) {
        for (let j = i; j < board.length / 2; j++) {
            legionGroups[0].push(new Point(j, i));
            legionGroups[1].push(new Point(i, j + 1))
            legionGroups[2].push(new Point(i, board[0].length - 2 - j))
            legionGroups[3].push(new Point(j, board[0].length - 1 - i))
            legionGroups[4].push(new Point(board.length - 1 - j, board[0].length - 1 - i))
            legionGroups[5].push(new Point(board.length - 1 - i, board[0].length - 2 - j))
            legionGroups[6].push(new Point(board.length - 1 - i, j + 1))
            legionGroups[7].push(new Point(board.length - 1 - j, i))
        }
    }
    for (let i = board.length / 4; i < board.length / 2; i++) {
        for (let j = i; j < board.length / 2; j++) {
            legionGroups[8].push(new Point(j, i));
            legionGroups[9].push(new Point(i, j + 1));
            legionGroups[10].push(new Point(3 * board.length / 4 - 1 - j, board.length / 4 + 1 + i));
            legionGroups[11].push(new Point(j, board[0].length - 1 - i));
            legionGroups[12].push(new Point(board.length - 1 - j, board[0].length - 1 - i));
            legionGroups[13].push(new Point(j + board.length / 4, i + board.length / 4 + 1));
            legionGroups[14].push(new Point(j + board.length / 4, 3 * board.length / 4 - i));
            legionGroups[15].push(new Point(board.length - j - 1, i));
        }
    }
}

function setLegionBorders() {
    for (let i = 0; i < board[0].length / 2; i++) {
        getLegionCell(i, i).style.borderTopWidth = '3px';
        getLegionCell(i, i).style.borderRightWidth = '3px';
        getLegionCell(board.length - i - 1, i).style.borderBottomWidth = '3px';
        getLegionCell(board.length - i - 1, i).style.borderRightWidth = '3px';
        getLegionCell(i, board[0].length - i - 1).style.borderTopWidth = '3px';
        getLegionCell(i, board[0].length - i - 1).style.borderLeftWidth = '3px';
        getLegionCell(board.length - i - 1, board[0].length - i - 1).style.borderBottomWidth = '3px';
        getLegionCell(board.length - i - 1, board[0].length - i - 1).style.borderLeftWidth = '3px';
    }
    for (let i = 0; i < board.length; i++) {
        getLegionCell(i, 0).style.borderLeftWidth = '3px';
        getLegionCell(i, board[0].length / 2).style.borderLeftWidth = '3px';
        getLegionCell(i, board[0].length - 1).style.borderRightWidth = '3px';
    }
    for (let i = 0; i < board[0].length; i++) {
        getLegionCell(0, i).style.borderTopWidth = '3px';
        getLegionCell(board.length / 2, i).style.borderTopWidth = '3px';
        getLegionCell(board.length - 1, i).style.borderBottomWidth = '3px';
    }
    for (let i = board.length / 4; i < 3 * board.length / 4; i++) {
        getLegionCell(i, Math.floor(board[0].length / 4)).style.borderLeftWidth = '3px';
        getLegionCell(i, Math.floor(3 * board[0].length / 4)).style.borderRightWidth = '3px';
    }
    for (let i = Math.ceil(board[0].length / 4); i < Math.floor(3 * board[0].length / 4); i++) {
        getLegionCell(board.length / 4, i).style.borderTopWidth = '3px';
        getLegionCell(3 * board.length / 4, i).style.borderTopWidth = '3px';
    }
}
//let isDarkMode = false;
// if (localStorage.getItem("isDarkMode")) {
//     document.getElementById("darkMode").checked = JSON.parse(localStorage.getItem("isDarkMode"));
//     if (JSON.parse(localStorage.getItem("isDarkMode"))) {
//         activateDarkMode();
//     }
// }


function findGroupNumber(i, j) {
    for (let k = 0; k < legionGroups.length; k++) {
        for (let point of legionGroups[k]) {
            if (point.x == i && point.y == j) {
                return k;
            }
        }
    }
}

function getLegionCell(i, j) {
    return document.getElementById("legionBoard")
        .getElementsByTagName("tr")[i]
        .getElementsByTagName("td")[j];
}

function clearBoard() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            board[i][j] = -1;
            getLegionCell(i, j).style.background = pieceColours.get(board[i][j])
        }
    }
    boardFilled = 0;
    localStorage.setItem("legionBoard", JSON.stringify(board));
    localStorage.setItem("boardFilled", JSON.stringify(0));
    document.getElementById('boardFilledValue').innerText = `${boardFilled}`;
}

function setBoard(i, j, value) {
    if (state != states.START) {
        return;
    }

    if (isBigClick) {
        if (value == 0) {
            for (let point of legionGroups[findGroupNumber(i, j)]) {
                let grid = getLegionCell(point.x, point.y);
                grid.style.background = pieceColours.get(0);
                if (board[point.x][point.y] == -1) {
                    boardFilled++;
                }
                board[point.x][point.y] = 0;
            }
        } else {
            for (let point of legionGroups[findGroupNumber(i, j)]) {
                let grid = getLegionCell(point.x, point.y);
                grid.style.background = pieceColours.get(-1);
                if (board[point.x][point.y] == 0) {
                    boardFilled--;
                }
                board[point.x][point.y] = -1;
            }
        }
    } else {
        let grid = getLegionCell(i, j);
        if (value == -1) {
            if (board[i][j] != -1) {
                board[i][j] = -1;
                grid.style.background = pieceColours.get(-1);
                boardFilled--;
            }
        } else {
            if (board[i][j] != 0) {
                board[i][j] = 0;
                grid.style.background = pieceColours.get(0);
                boardFilled++;
            }
        }
    }
    localStorage.setItem("legionBoard", JSON.stringify(board));
    localStorage.setItem("boardFilled", JSON.stringify(boardFilled));
    document.getElementById('boardFilledValue').innerText = `${boardFilled}`;
}

function hoverOverBoard(i, j) {
    if (state != states.START) {
        return;
    }
    if (isBigClick) {
        for (let point of legionGroups[findGroupNumber(i, j)]) {
            if (board[point.x][point.y] == -1) {
                if (isDarkMode) {
                    getLegionCell(point.x, point.y).style.background = 'dimgrey';
                } else {
                    getLegionCell(point.x, point.y).style.background = 'silver';
                }
            } else {
                if (isDarkMode) {
                    getLegionCell(point.x, point.y).style.background = 'rgb(20, 20, 20)';
                } else {
                    getLegionCell(point.x, point.y).style.background = 'dimgrey';
                }

            }

        }
    } else {
        if (board[i][j] == -1) {
            if (isDarkMode) {
                getLegionCell(i, j).style.background = 'dimgrey';
            } else {
                getLegionCell(i, j).style.background = 'silver';
            }
        } else {
            if (isDarkMode) {
                getLegionCell(i, j).style.background = 'rgb(20, 20, 20)';
            } else {
                getLegionCell(i, j).style.background = 'dimgrey';
            }
        }

    }
}

function hoverOffBoard(i, j) {
    if (state != states.START) {
        return;
    }
    if (isBigClick) {
        for (let point of legionGroups[findGroupNumber(i, j)]) {
            if (board[point.x][point.y] == -1) {
                getLegionCell(point.x, point.y).style.background = pieceColours.get(-1);
            } else {
                getLegionCell(point.x, point.y).style.background = pieceColours.get(0);
            }
        }
    } else {
        if (board[i][j] == -1) {
            getLegionCell(i, j).style.background = pieceColours.get(-1);
        } else {
            getLegionCell(i, j).style.background = pieceColours.get(0);
        }
    }
}

function resetBoard() {
    for (let k = 0; k < legionSolvers.length; k++) {
        for (let i = 0; i < legionSolvers[k].board.length; i++) {
            for (let j = 0; j < legionSolvers[k].board[0].length; j++) {
                if (k == 0) {
                    if (legionSolvers[k].board[i][j] >= 0) {
                        getLegionCell(i, j).style.background = pieceColours.get(0);
                        legionSolvers[k].board[i][j] = 0;
                    }
                } else {
                    if (legionSolvers[k].board[i][j] >= 0) {
                        legionSolvers[k].board[i][j] = 0;
                    }
                }
            }
        }
    }

    legionSolvers = [];
}

function colourBoard() {
    let spot;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            spot = board[i][j];
            getLegionCell(i, j).style.background = pieceColours.get(spot);
        }
    }
}

function activateDarkMode() {
    // isDarkMode = !isDarkMode;
    // localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    let cell;
    let switchTo;
    // if (isDarkMode) {
    switchTo = 'white';
    // document.getElementById("body").style.backgroundColor = 'rgb(54, 57, 63)';
    // for (let i = 0; i < pieces.length; i++) {
    //     document.getElementById(`piece${i + 1}`).style.backgroundColor = 'silver';
    // }
    pieceColours.set(-1, 'grey');
    pieceColours.set(0, 'rgb(50, 50, 50)');
    // } else {
    //switchTo = 'black';
    //     document.getElementById("body").style.backgroundColor = 'white';
    //     for (let i = 0; i < pieces.length; i++) {
    //         document.getElementById(`piece${i + 1}`).style.backgroundColor = 'white';
    //     }
    //     pieceColours.set(-1, 'white');
    //     pieceColours.set(0, 'grey');
    // }
    colourBoard();
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            cell = getLegionCell(i, j);
            if (cell.style.borderTopColor != switchTo) {
                cell.style.borderTopColor = switchTo
            }
            if (cell.style.borderBottomColor != switchTo) {
                cell.style.borderBottomColor = switchTo
            }
            if (cell.style.borderRightColor != switchTo) {
                cell.style.borderRightColor = switchTo
            }
            if (cell.style.borderLeftColor != switchTo) {
                cell.style.borderLeftColor = switchTo
            }
        }
    }
    // document.getElementById("body").style.color = switchTo;
}

function activateBigClick() {
    isBigClick = !isBigClick;
    localStorage.setItem("isBigClick", JSON.stringify(isBigClick));
}

function activateLiveSolve() {
    if (state != states.COMPLETED) {
        colourBoard();
    }
}

function reset() {
    resetBoard();
    document.getElementById("clearBoard").disabled = false;
    document.getElementById("boardButton").innerText = i18n("start");
    document.getElementById("resetButton").style.visibility = 'hidden';
    document.getElementById("iterations").style.visibility = 'hidden';
    document.getElementById("time").style.visibility = 'hidden';
    document.getElementById("failText").style.visibility = 'hidden';
    state = states.START;
}

async function handleButton(evt) {
    if (state == states.START) {
        evt.target.innerText = i18n("pause");
        document.getElementById("clearBoard").disabled = true;
        state = states.RUNNING;
        let success = await runSolver();
        if (!success) {
            document.getElementById("failText").style.visibility = 'visible';
        }
        evt.target.innerText = i18n("reset");
        state = states.COMPLETED;
    } else if (state == states.RUNNING) {
        evt.target.innerText = i18n("continue");
        for (let solvers of legionSolvers) {
            solvers.pause();
        }
        state = states.PAUSED;
        document.getElementById("resetButton").style.visibility = 'visible';
    } else if (state == states.PAUSED) {
        evt.target.innerText = i18n("pause");
        for (let solvers of legionSolvers) {
            solvers.continue();
        }
        state = states.RUNNING
        document.getElementById("resetButton").style.visibility = 'hidden';
    } else if (state == states.COMPLETED) {
        reset();
    }
}

async function runSolver() {
    activateLiveSolve()
    if (boardFilled == 0 && currentPieces > 0) {
        console.log('run solver stopping')
        return false;
    }
    let downBoard = [];
    for (let i = 0; i < board.length; i++) {
        downBoard[i] = [];
        for (let j = 0; j < board[0].length; j++) {
            downBoard[i][j] = board[board.length - 1 - i][board[0].length - 1 - j];
        }
    }
    let rightBoard = [];
    for (let i = 0; i < board[0].length; i++) {
        rightBoard[i] = [];
        for (let j = 0; j < board.length; j++) {
            rightBoard[i][j] = board[board.length - j - 1][i];
        }
    }
    let leftBoard = [];
    for (let i = 0; i < board[0].length; i++) {
        leftBoard[i] = [];
        for (let j = 0; j < board.length; j++) {
            leftBoard[i][j] = board[j][board[0].length - 1 - i];
        }
    }

    legionSolvers.push(new LegionSolver(board, _.cloneDeep(pieces), onBoardUpdated));
    legionSolvers.push(new LegionSolver(rightBoard, _.cloneDeep(pieces), () => false));
    legionSolvers.push(new LegionSolver(downBoard, _.cloneDeep(pieces), () => false));
    legionSolvers.push(new LegionSolver(leftBoard, _.cloneDeep(pieces), () => false));

    let runRotated = legionSolvers[0].longSpaces.length != 0;
    const boardPromise = legionSolvers[0].solve();
    let success;
    if (runRotated) {
        const rightBoardPromise = legionSolvers[1].solve();
        const downBoardPromise = legionSolvers[2].solve();
        const leftBoardPromise = legionSolvers[3].solve();
        success = await Promise.race([boardPromise, rightBoardPromise, downBoardPromise, leftBoardPromise]);
    } else {
        success = await boardPromise;
    }

    for (let solver of legionSolvers) {
        solver.stop();
    }

    let finishedSolver;

    if (legionSolvers[0].success !== undefined) {
        for (let i = 0; i < legionSolvers[0].board.length; i++) {
            for (let j = 0; j < legionSolvers[0].board[0].length; j++) {
                board[i][j] = legionSolvers[0].board[i][j];
            }
        }
        finishedSolver = legionSolvers[0];
    } else if (legionSolvers[1].success !== undefined) {
        for (let i = 0; i < legionSolvers[1].board[0].length; i++) {
            for (let j = 0; j < legionSolvers[1].board.length; j++) {
                board[i][j] = legionSolvers[1].board[j][legionSolvers[1].board[0].length - 1 - i];
            }
        }
        finishedSolver = legionSolvers[1];
    } else if (legionSolvers[2].success !== undefined) {
        for (let i = 0; i < legionSolvers[2].board.length; i++) {
            for (let j = 0; j < legionSolvers[2].board[0].length; j++) {
                board[i][j] = legionSolvers[2].board[legionSolvers[2].board.length - 1 - i][legionSolvers[2].board[0].length - 1 - j];
            }
        }
        finishedSolver = legionSolvers[2];
    } else if (legionSolvers[3].success !== undefined) {
        for (let i = 0; i < legionSolvers[3].board[0].length; i++) {
            for (let j = 0; j < legionSolvers[3].board.length; j++) {
                board[i][j] = legionSolvers[3].board[legionSolvers[3].board.length - j - 1][i];
            }
        }
        finishedSolver = legionSolvers[3];
    }

    document.getElementById("iterations").style.visibility = 'visible';
    document.getElementById("iterationsValue").innerText = `${finishedSolver.iterations}`;

    document.getElementById("time").style.visibility = 'visible';
    document.getElementById("timeValue").innerText = `${new Date().getTime() - finishedSolver.time}ms`;
    if (success) {
        colourBoard();
        document.getElementById('result').innerHTML = 'Step 5/6. Configuring Hyper Stats...';
    }
    return success;
}

function onBoardUpdated() {
    colourBoard();
}

export { pieceColours };