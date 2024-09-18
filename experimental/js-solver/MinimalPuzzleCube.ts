/* This code is experimental code for an eventual solver to be implemented
 * into this application. Right now, this solver is too slow to be useful, but
 * after some optimizations (such that it would be able to solve a cube in
 * under a minute) I would like to add it to the greater program, either as a
 * button the user could press (solve cube from this state!) or to implement a
 * more advanced scrambler, like the one the WCA uses.
 */

interface Edge {
    id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
    orientation: number;
}

interface Corner {
    id: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    orientation: number;
}

type Edges = [
    Edge,
    Edge,
    Edge,
    Edge,
    Edge,
    Edge,
    Edge,
    Edge,
    Edge,
    Edge,
    Edge,
    Edge,
];

type Corners = [Corner, Corner, Corner, Corner, Corner, Corner, Corner, Corner];

const swapTwo = (array: any[], index1: number, index2: number): void => {
    const tmp = array[index2];
    array[index2] = array[index1];
    array[index1] = tmp;
};

const swapFour = (
    array: any[],
    resultIndex1: number,
    resultIndex2: number,
    resultIndex3: number,
    resultIndex4: number,
    index1: number,
    index2: number,
    index3: number,
    index4: number,
): void => {
    const tmp1 = array[index1];
    const tmp2 = array[index2];
    const tmp3 = array[index3];
    const tmp4 = array[index4];
    array[resultIndex1] = tmp1;
    array[resultIndex2] = tmp2;
    array[resultIndex3] = tmp3;
    array[resultIndex4] = tmp4;
};

const shuffle = (array: any[]): void => {
    for (let i = array.length - 1; i > 1; i--) {
        const j = Math.floor(Math.random() * i);
        swapTwo(array, i, j);
    }
};

const randomizeEdgeOrientations = (edges: Edges): void => {
    for (let i = 0; i < edges.length - 1; i++) {
        for (let j = i + 1; j < edges.length; j++) {
            const doChangeOrientation = Math.floor(Math.random() * 2);
            if (doChangeOrientation === 1) {
                edges[i].orientation = (edges[i].orientation + 1) % 2;
                edges[j].orientation = (edges[j].orientation + 1) % 2;
            }
        }
    }
};

const randomizeCornerOrientations = (corners: Corners): void => {
    for (let i = 0; i < corners.length - 1; i++) {
        for (let j = i + 1; j < corners.length; j++) {
            const doChangeOrientation = Math.floor(Math.random() * 3);
            if (doChangeOrientation === 1) {
                corners[i].orientation = (corners[i].orientation + 1) % 3;
                corners[j].orientation = (corners[j].orientation + 2) % 3;
            } else if (doChangeOrientation === 2) {
                corners[i].orientation = (corners[i].orientation + 2) % 3;
                corners[j].orientation = (corners[j].orientation + 1) % 3;
            }
        }
    }
};

const findMove = (
    move: string,
    availableMoves: string[][][],
): [number, number, number] => {
    for (let i = 0; i < availableMoves.length; i++) {
        for (let j = 0; j < availableMoves[i].length; j++) {
            for (let k = 0; k < availableMoves[i][j].length; k++) {
                if (move === availableMoves[i][j][k]) {
                    return [i, j, k];
                }
            }
        }
    }
    throw new Error(`${move} not an available move!`);
};

const iterateMove = (
    move: string,
    availableMoves: string[][][],
    previousMoves: string[],
): string => {
    const [moveClassNumber, moveTypeNumber, moveNumber] = findMove(
        move,
        availableMoves,
    );

    let secondPreviousMoveClassNumber: number,
        previousMoveClassNumber: number,
        previousMoveTypeNumber: number;

    if (previousMoves.length < 1) {
        secondPreviousMoveClassNumber = -1;
        previousMoveClassNumber = -1;
        previousMoveTypeNumber = -1;
    } else if (previousMoves.length < 2) {
        secondPreviousMoveClassNumber = -1;
        [previousMoveClassNumber, previousMoveTypeNumber] = findMove(
            previousMoves[previousMoves.length - 1],
            availableMoves,
        );
    } else {
        [secondPreviousMoveClassNumber] = findMove(
            previousMoves[previousMoves.length - 2],
            availableMoves,
        );
        [previousMoveClassNumber, previousMoveTypeNumber] = findMove(
            previousMoves[previousMoves.length - 1],
            availableMoves,
        );
    }

    if (
        moveNumber + 1 <
        availableMoves[moveClassNumber][moveTypeNumber].length
    ) {
        return availableMoves[moveClassNumber][moveTypeNumber][moveNumber + 1];
    }

    for (
        let i = moveTypeNumber + 1;
        i < availableMoves[moveClassNumber].length;
        i++
    ) {
        if (
            moveClassNumber !== previousMoveClassNumber ||
            i !== previousMoveTypeNumber
        ) {
            return availableMoves[moveClassNumber][i][0];
        }
    }

    for (let i = moveClassNumber + 1; i < availableMoves.length; i++) {
        if (i !== previousMoveClassNumber) {
            return availableMoves[i][0][0];
        }
        if (
            previousMoveClassNumber !== secondPreviousMoveClassNumber &&
            previousMoveTypeNumber + 1 < availableMoves[i].length
        ) {
            return availableMoves[i][previousMoveTypeNumber + 1][0];
        }
    }

    return "done";
};

const getFirstAllowedMove = (
    availableMoves: string[][][],
    previousMoves: string[],
): string => {
    let previousMoveClassNumber: number, previousMoveTypeNumber: number;

    if (previousMoves.length < 1) {
        previousMoveClassNumber = -1;
        previousMoveTypeNumber = -1;
    } else {
        [previousMoveClassNumber, previousMoveTypeNumber] = findMove(
            previousMoves[previousMoves.length - 1],
            availableMoves,
        );
    }

    if (previousMoveClassNumber === 0 && previousMoveTypeNumber === 1) {
        return availableMoves[1][0][0];
    }
    if (previousMoveClassNumber === 0 && previousMoveTypeNumber === 0) {
        return availableMoves[0][1][0];
    }
    return availableMoves[0][0][0];
};

const iterateAlgorithm = (
    algorithm: string[],
    availableMoves: string[][][],
): void => {
    let doExpandAlgorithm = true;

    for (let i = algorithm.length - 1; i >= 0; i--) {
        const nextMove = iterateMove(
            algorithm[i],
            availableMoves,
            algorithm.slice(0, i),
        );
        if (nextMove !== "done") {
            algorithm[i] = nextMove;
            for (let j = i + 1; j < algorithm.length; j++) {
                algorithm[j] = getFirstAllowedMove(
                    availableMoves,
                    algorithm.slice(0, j),
                );
            }
            doExpandAlgorithm = false;
            break;
        }
    }

    if (doExpandAlgorithm) {
        for (let i = 0; i < algorithm.length; i++) {
            algorithm[i] = getFirstAllowedMove(
                availableMoves,
                algorithm.slice(0, i),
            );
        }
        algorithm.push(getFirstAllowedMove(availableMoves, algorithm));
    }
};

let experimentalSolveLevel = 0;

export class MinimalPuzzleCube {
    private edges: Edges;
    private corners: Corners;

    constructor(edges: Edges, corners: Corners) {
        this.edges = edges;
        this.corners = corners;
    }

    static getSolvedCube(): MinimalPuzzleCube {
        return new MinimalPuzzleCube(
            [
                { id: 0, orientation: 0 },
                { id: 1, orientation: 0 },
                { id: 2, orientation: 0 },
                { id: 3, orientation: 0 },
                { id: 4, orientation: 0 },
                { id: 5, orientation: 0 },
                { id: 6, orientation: 0 },
                { id: 7, orientation: 0 },
                { id: 8, orientation: 0 },
                { id: 9, orientation: 0 },
                { id: 10, orientation: 0 },
                { id: 11, orientation: 0 },
            ],
            [
                { id: 0, orientation: 0 },
                { id: 1, orientation: 0 },
                { id: 2, orientation: 0 },
                { id: 3, orientation: 0 },
                { id: 4, orientation: 0 },
                { id: 5, orientation: 0 },
                { id: 6, orientation: 0 },
                { id: 7, orientation: 0 },
            ],
        );
    }

    static getRandomCube(): MinimalPuzzleCube {
        const cube = this.getSolvedCube();
        shuffle(cube.edges);
        shuffle(cube.corners);
        randomizeEdgeOrientations(cube.edges);
        randomizeCornerOrientations(cube.corners);
        return cube;
    }

    private executeMove(move: string): void {
        switch (move) {
            case "U":
                swapFour(this.edges, 1, 2, 3, 0, 0, 1, 2, 3);
                swapFour(this.corners, 1, 2, 3, 0, 0, 1, 2, 3);
                break;
            case "U'":
                swapFour(this.edges, 3, 0, 1, 2, 0, 1, 2, 3);
                swapFour(this.corners, 3, 0, 1, 2, 0, 1, 2, 3);
                break;
            case "U2":
                swapFour(this.edges, 2, 3, 0, 1, 0, 1, 2, 3);
                swapFour(this.corners, 2, 3, 0, 1, 0, 1, 2, 3);
                break;
            case "D":
                swapFour(this.edges, 9, 10, 11, 8, 8, 9, 10, 11);
                swapFour(this.corners, 5, 6, 7, 4, 4, 5, 6, 7);
                break;
            case "D'":
                swapFour(this.edges, 11, 8, 9, 10, 8, 9, 10, 11);
                swapFour(this.corners, 7, 4, 5, 6, 4, 5, 6, 7);
                break;
            case "D2":
                swapFour(this.edges, 10, 11, 8, 9, 8, 9, 10, 11);
                swapFour(this.corners, 6, 7, 4, 5, 4, 5, 6, 7);
                break;
            case "R":
                swapFour(this.edges, 7, 1, 9, 6, 1, 6, 7, 9);
                swapFour(this.corners, 6, 1, 2, 5, 1, 2, 5, 6);
                this.corners[1].orientation =
                    (this.corners[1].orientation + 2) % 3;
                this.corners[2].orientation =
                    (this.corners[2].orientation + 1) % 3;
                this.corners[5].orientation =
                    (this.corners[5].orientation + 2) % 3;
                this.corners[6].orientation =
                    (this.corners[6].orientation + 1) % 3;
                break;
            case "R'":
                swapFour(this.edges, 6, 9, 1, 7, 1, 6, 7, 9);
                swapFour(this.corners, 2, 5, 6, 1, 1, 2, 5, 6);
                this.corners[1].orientation =
                    (this.corners[1].orientation + 2) % 3;
                this.corners[2].orientation =
                    (this.corners[2].orientation + 1) % 3;
                this.corners[5].orientation =
                    (this.corners[5].orientation + 2) % 3;
                this.corners[6].orientation =
                    (this.corners[6].orientation + 1) % 3;
                break;
            case "R2":
                swapFour(this.edges, 9, 7, 6, 1, 1, 6, 7, 9);
                swapFour(this.corners, 5, 6, 1, 2, 1, 2, 5, 6);
                break;
            case "L":
                swapFour(this.edges, 5, 3, 11, 4, 3, 4, 5, 11);
                swapFour(this.corners, 3, 4, 7, 0, 0, 3, 4, 7);
                this.corners[0].orientation =
                    (this.corners[0].orientation + 1) % 3;
                this.corners[3].orientation =
                    (this.corners[3].orientation + 2) % 3;
                this.corners[4].orientation =
                    (this.corners[4].orientation + 1) % 3;
                this.corners[7].orientation =
                    (this.corners[7].orientation + 2) % 3;
                break;
            case "L'":
                swapFour(this.edges, 4, 11, 3, 5, 3, 4, 5, 11);
                swapFour(this.corners, 7, 0, 3, 4, 0, 3, 4, 7);
                this.corners[0].orientation =
                    (this.corners[0].orientation + 1) % 3;
                this.corners[3].orientation =
                    (this.corners[3].orientation + 2) % 3;
                this.corners[4].orientation =
                    (this.corners[4].orientation + 1) % 3;
                this.corners[7].orientation =
                    (this.corners[7].orientation + 2) % 3;
                break;
            case "L2":
                swapFour(this.edges, 11, 5, 4, 3, 3, 4, 5, 11);
                swapFour(this.corners, 4, 7, 0, 3, 0, 3, 4, 7);
                break;
            case "F":
                swapFour(this.edges, 6, 2, 8, 5, 2, 5, 6, 8);
                swapFour(this.corners, 5, 2, 3, 4, 2, 3, 4, 5);
                this.edges[2].orientation = (this.edges[2].orientation + 1) % 2;
                this.edges[5].orientation = (this.edges[5].orientation + 1) % 2;
                this.edges[6].orientation = (this.edges[6].orientation + 1) % 2;
                this.edges[8].orientation = (this.edges[8].orientation + 1) % 2;
                this.corners[2].orientation =
                    (this.corners[2].orientation + 2) % 3;
                this.corners[3].orientation =
                    (this.corners[3].orientation + 1) % 3;
                this.corners[4].orientation =
                    (this.corners[4].orientation + 2) % 3;
                this.corners[5].orientation =
                    (this.corners[5].orientation + 1) % 3;
                break;
            case "F'":
                swapFour(this.edges, 5, 8, 2, 6, 2, 5, 6, 8);
                swapFour(this.corners, 3, 4, 5, 2, 2, 3, 4, 5);
                this.edges[2].orientation = (this.edges[2].orientation + 1) % 2;
                this.edges[5].orientation = (this.edges[5].orientation + 1) % 2;
                this.edges[6].orientation = (this.edges[6].orientation + 1) % 2;
                this.edges[8].orientation = (this.edges[8].orientation + 1) % 2;
                this.corners[2].orientation =
                    (this.corners[2].orientation + 2) % 3;
                this.corners[3].orientation =
                    (this.corners[3].orientation + 1) % 3;
                this.corners[4].orientation =
                    (this.corners[4].orientation + 2) % 3;
                this.corners[5].orientation =
                    (this.corners[5].orientation + 1) % 3;
                break;
            case "F2":
                swapFour(this.edges, 8, 6, 5, 2, 2, 5, 6, 8);
                swapFour(this.corners, 4, 5, 2, 3, 2, 3, 4, 5);
                break;
            case "B":
                swapFour(this.edges, 4, 10, 0, 7, 0, 4, 7, 10);
                swapFour(this.corners, 7, 0, 1, 6, 0, 1, 6, 7);
                this.edges[0].orientation = (this.edges[0].orientation + 1) % 2;
                this.edges[4].orientation = (this.edges[4].orientation + 1) % 2;
                this.edges[7].orientation = (this.edges[7].orientation + 1) % 2;
                this.edges[10].orientation =
                    (this.edges[10].orientation + 1) % 2;
                this.corners[0].orientation =
                    (this.corners[0].orientation + 2) % 3;
                this.corners[1].orientation =
                    (this.corners[1].orientation + 1) % 3;
                this.corners[6].orientation =
                    (this.corners[6].orientation + 2) % 3;
                this.corners[7].orientation =
                    (this.corners[7].orientation + 1) % 3;
                break;
            case "B'":
                swapFour(this.edges, 7, 0, 10, 4, 0, 4, 7, 10);
                swapFour(this.corners, 1, 6, 7, 0, 0, 1, 6, 7);
                this.edges[0].orientation = (this.edges[0].orientation + 1) % 2;
                this.edges[4].orientation = (this.edges[4].orientation + 1) % 2;
                this.edges[7].orientation = (this.edges[7].orientation + 1) % 2;
                this.edges[10].orientation =
                    (this.edges[10].orientation + 1) % 2;
                this.corners[0].orientation =
                    (this.corners[0].orientation + 2) % 3;
                this.corners[1].orientation =
                    (this.corners[1].orientation + 1) % 3;
                this.corners[6].orientation =
                    (this.corners[6].orientation + 2) % 3;
                this.corners[7].orientation =
                    (this.corners[7].orientation + 1) % 3;
                break;
            case "B2":
                swapFour(this.edges, 10, 7, 4, 0, 0, 4, 7, 10);
                swapFour(this.corners, 6, 7, 0, 1, 0, 1, 6, 7);
                break;
            default:
                throw new Error(`Cannot execute move ${move}`);
        }
    }

    executeAlgorithm(algorithm: string[]): void {
        for (const move of algorithm) {
            this.executeMove(move);
        }
    }

    equals(other: MinimalPuzzleCube): boolean {
        for (let i = 0; i < this.edges.length; i++) {
            if (
                this.edges[i].id !== other.edges[i].id ||
                this.edges[i].orientation !== other.edges[i].orientation
            ) {
                return false;
            }
        }
        for (let i = 0; i < this.corners.length; i++) {
            if (
                this.corners[i].id !== other.corners[i].id ||
                this.corners[i].orientation !== other.corners[i].orientation
            ) {
                return false;
            }
        }
        return true;
    }

    copy(): MinimalPuzzleCube {
        return new MinimalPuzzleCube(
            [
                {
                    id: this.edges[0].id,
                    orientation: this.edges[0].orientation,
                },
                {
                    id: this.edges[1].id,
                    orientation: this.edges[1].orientation,
                },
                {
                    id: this.edges[2].id,
                    orientation: this.edges[2].orientation,
                },
                {
                    id: this.edges[3].id,
                    orientation: this.edges[3].orientation,
                },
                {
                    id: this.edges[4].id,
                    orientation: this.edges[4].orientation,
                },
                {
                    id: this.edges[5].id,
                    orientation: this.edges[5].orientation,
                },
                {
                    id: this.edges[6].id,
                    orientation: this.edges[6].orientation,
                },
                {
                    id: this.edges[7].id,
                    orientation: this.edges[7].orientation,
                },
                {
                    id: this.edges[8].id,
                    orientation: this.edges[8].orientation,
                },
                {
                    id: this.edges[9].id,
                    orientation: this.edges[9].orientation,
                },
                {
                    id: this.edges[10].id,
                    orientation: this.edges[10].orientation,
                },
                {
                    id: this.edges[11].id,
                    orientation: this.edges[11].orientation,
                },
            ],
            [
                {
                    id: this.corners[0].id,
                    orientation: this.corners[0].orientation,
                },
                {
                    id: this.corners[1].id,
                    orientation: this.corners[1].orientation,
                },
                {
                    id: this.corners[2].id,
                    orientation: this.corners[2].orientation,
                },
                {
                    id: this.corners[3].id,
                    orientation: this.corners[3].orientation,
                },
                {
                    id: this.corners[4].id,
                    orientation: this.corners[4].orientation,
                },
                {
                    id: this.corners[5].id,
                    orientation: this.corners[5].orientation,
                },
                {
                    id: this.corners[6].id,
                    orientation: this.corners[6].orientation,
                },
                {
                    id: this.corners[7].id,
                    orientation: this.corners[7].orientation,
                },
            ],
        );
    }

    private bruteForceSolve(
        availableMoves: string[][][],
        isSolved: (cube: MinimalPuzzleCube) => boolean,
    ): string[] {
        const MAX_SOLUTION_LENGTH = 20;
        const algorithm: string[] = [];
        while (algorithm.length <= MAX_SOLUTION_LENGTH) {
            const cube = this.copy();
            cube.executeAlgorithm(algorithm);
            if (isSolved(cube)) {
                return algorithm;
            }
            iterateAlgorithm(algorithm, availableMoves);
        }
        throw new Error(`Solution is longer than ${MAX_SOLUTION_LENGTH} moves`);
    }

    private heuristic(): number {
        let distance = 0;
        // for (let i = 0; i < 12; i++) {
        //     distance += this.bruteForceSolve([
        //         [
        //             ["U", "U'", "U2"],
        //             ["D", "D'", "D2"],
        //         ],
        //         [
        //             ["R", "R'", "R2"],
        //             ["L", "L'", "L2"],
        //         ],
        //         [
        //             ["F", "F'", "F2"],
        //             ["B", "B'", "B2"],
        //         ],
        //     ],
        //     (cube: MinimalPuzzleCube): boolean => cube.edges[i].id === i && cube.edges[i].orientation === 0
        //     ).length;
        // }
        for (let i = 0; i < 8; i++) {
            distance += this.bruteForceSolve([
                [
                    ["U", "U'", "U2"],
                    ["D", "D'", "D2"],
                ],
                [
                    ["R", "R'", "R2"],
                    ["L", "L'", "L2"],
                ],
                [
                    ["F", "F'", "F2"],
                    ["B", "B'", "B2"],
                ],
            ],
            (cube: MinimalPuzzleCube): boolean => cube.corners[i].id === i && cube.corners[i].orientation === 0
            ).length;
        }
        return distance / 4;
    }

    private getNextNodes(algorithm: string[]): string[][] {
        const AVAILABLE_MOVES = [
            [["U", "U'", "U2"], ["D", "D'", "D2"]],
            [["R", "R'", "R2"], ["L", "L'", "L2"]],
            [["F", "F'", "F2"], ["B", "B'", "B2"]],
        ];
        const algorithms: string[][] = [];
        if (algorithm.length === 0) {
            for (let i = 0; i < AVAILABLE_MOVES.length; i++) {
                for (let j = 0; j < AVAILABLE_MOVES[i].length; j++) {
                    for (let k = 0; k < AVAILABLE_MOVES[i][j].length; k++) {
                        algorithms.push(algorithm.concat([AVAILABLE_MOVES[i][j][k]]));
                    }
                }
            }
        } else if (algorithm.length === 1) {
            const [previousMoveClass, previousMoveType] = findMove(algorithm[algorithm.length - 1], AVAILABLE_MOVES);
            for (let i = 0; i < AVAILABLE_MOVES.length; i++) {
                for (let j = 0; j < AVAILABLE_MOVES[i].length; j++) {
                    if (previousMoveClass === i && previousMoveType >= j) {
                        continue;
                    }
                    for (let k = 0; k < AVAILABLE_MOVES[i][j].length; k++) {
                        algorithms.push(algorithm.concat([AVAILABLE_MOVES[i][j][k]]));
                    }
                }
            }
        } else {
            const [secondPreviousMoveClass] = findMove(algorithm[algorithm.length - 2], AVAILABLE_MOVES);
            const [previousMoveClass, previousMoveType] = findMove(algorithm[algorithm.length - 1], AVAILABLE_MOVES);
            for (let i = 0; i < AVAILABLE_MOVES.length; i++) {
                if (previousMoveClass === i && previousMoveClass === secondPreviousMoveClass) {
                    continue;
                }
                for (let j = 0; j < AVAILABLE_MOVES[i].length; j++) {
                    if (previousMoveClass === i && previousMoveType >= j) {
                        continue;
                    }
                    for (let k = 0; k < AVAILABLE_MOVES[i][j].length; k++) {
                        algorithms.push(algorithm.concat([AVAILABLE_MOVES[i][j][k]]));
                    }
                }
            }
        }
        return algorithms;
    }

    private areCornersSolved(): boolean {
        for (let i = 0; i < 8; i++) {
            if (this.corners[i].id !== i || this.corners[i].orientation !== 0) {
                return false;
            }
        }
        return true;
    }

    // Here I am trying out the IDA* algorithm
    solveWithHeuristic(): string[] {
        const solvedCube = MinimalPuzzleCube.getSolvedCube();
        const search = (path: string[], depth: number, bound: number) => {
            const node: string[] = JSON.parse(path[path.length - 1]);

            const cube = this.copy();
            cube.executeAlgorithm(node);
            const f: number = depth + cube.heuristic();
            if (f > bound) {
                return f;
            }
            if (cube.areCornersSolved()) {
                return "found";
            }
            let min: number = Infinity;
            for (const successor of this.getNextNodes(node)) {
                if (path.indexOf(JSON.stringify(successor)) < 0) {
                    path.push(JSON.stringify(successor));
                    const t = search(path, depth + 1, bound);
                    if (t === "found") {
                        return "found";
                    }
                    if (typeof t === "number" && t < min) {
                        min = t;
                    }
                    path.pop();
                }
            }
            return min;
        };

        let bound = this.heuristic();
        const path = ["[]"];
        while (true) {
            const t = search(path, 0, bound);
            if (t === "found") {
                return JSON.parse(path[path.length - 1]);
            }
            if (typeof t === "number" && t === Infinity) {
                return [];
            }
            bound = t;
        }
    }

    thistlethwaiteSolve(): string[] {
        const g0ToG1 = this.bruteForceSolve(
            [
                [
                    ["U", "U'", "U2"],
                    ["D", "D'", "D2"],
                ],
                [
                    ["R", "R'", "R2"],
                    ["L", "L'", "L2"],
                ],
                [
                    ["F", "F'", "F2"],
                    ["B", "B'", "B2"],
                ],
            ],
            (cube: MinimalPuzzleCube): boolean => {
                for (const edge of cube.edges) {
                    if (edge.orientation !== 0) {
                        return false;
                    }
                }
                return true;
            },
        );
        const g1Cube = this.copy();
        g1Cube.executeAlgorithm(g0ToG1);

        console.log(`G1 Done: ${g0ToG1}`);

        const g1ToG2 = g1Cube.bruteForceSolve(
            [
                [
                    ["U", "U'", "U2"],
                    ["D", "D'", "D2"],
                ],
                [
                    ["R", "R'", "R2"],
                    ["L", "L'", "L2"],
                ],
                [["F2"], ["B2"]],
            ],
            (cube: MinimalPuzzleCube): boolean => {
                for (const corner of cube.corners) {
                    if (corner.orientation !== 0) {
                        return false;
                    }
                }
                for (let i = 4; i < 8; i++) {
                    if (cube.edges[i].id < 4 || cube.edges[i].id >= 8) {
                        return false;
                    }
                }
                return true;
            },
        );
        const g2Cube = g1Cube.copy();
        g2Cube.executeAlgorithm(g1ToG2);

        console.log(`G2 Done: ${g1ToG2}`);

        const g2ToG3 = g2Cube.bruteForceSolve(
            [
                [
                    ["U", "U'", "U2"],
                    ["D", "D'", "D2"],
                ],
                [["R2"], ["L2"]],
                [["F2"], ["B2"]],
            ],
            (cube: MinimalPuzzleCube): boolean => {
                for (let i = 0; i < 4; i++) {
                    if (cube.edges[i].id % 2 !== i % 2) {
                        return false;
                    }
                }
                for (let i = 8; i < 12; i++) {
                    if (cube.edges[i].id % 2 !== i % 2) {
                        return false;
                    }
                }
                for (let i = 0; i < 8; i++) {
                    if (cube.corners[i].id % 2 !== i % 2) {
                        return false;
                    }
                }
                // Check the orbits!
                const a = cube.corners[0].id;
                const b = cube.corners[2].id;
                const c = cube.corners[4].id;
                const d = cube.corners[6].id;
                if (!(cube.corners[1].id === (a + 1) % 8
                && cube.corners[3].id === (b + 1) % 8
                && cube.corners[5].id === (c + 1) % 8
                && cube.corners[7].id === (d + 1) % 8)
                && !(cube.corners[1].id === (b + 1) % 8
                && cube.corners[3].id === (a + 1) % 8
                && cube.corners[5].id === (d + 1) % 8
                && cube.corners[7].id === (c + 1) % 8)
                && !(cube.corners[1].id === (c + 1) % 8
                && cube.corners[3].id === (d + 1) % 8
                && cube.corners[5].id === (a + 1) % 8
                && cube.corners[7].id === (b + 1) % 8)
                && !(cube.corners[1].id === (d + 1) % 8
                && cube.corners[3].id === (c + 1) % 8
                && cube.corners[5].id === (b + 1) % 8
                && cube.corners[7].id === (a + 1) % 8)) {
                    return false;
                }
                return true;
            },
        );
        const g3Cube = g2Cube.copy();
        g3Cube.executeAlgorithm(g2ToG3);

        console.log(`G3 Done: ${g2ToG3}`);

        const solvedCube = MinimalPuzzleCube.getSolvedCube();

        const g3ToG4 = g3Cube.bruteForceSolve(
            [
                [["U2"], ["D2"]],
                [["R2"], ["L2"]],
                [["F2"], ["B2"]],
            ],
            (cube: MinimalPuzzleCube): boolean => cube.equals(solvedCube),
        );

        return g0ToG1.concat(g1ToG2).concat(g2ToG3).concat(g3ToG4);
    }

    
    kociembaSolve(): string[] {
        const g0ToG1 = this.bruteForceSolve(
            [
                [
                    ["U", "U'", "U2"],
                    ["D", "D'", "D2"],
                ],
                [
                    ["R", "R'", "R2"],
                    ["L", "L'", "L2"],
                ],
                [
                    ["F", "F'", "F2"],
                    ["B", "B'", "B2"],
                ],
            ],
            (cube: MinimalPuzzleCube): boolean => {
                for (const corner of cube.corners) {
                    if (corner.orientation !== 0) {
                        return false;
                    }
                }
                for (const edge of cube.edges) {
                    if (edge.orientation !== 0) {
                        return false;
                    }
                }
                for (let i = 4; i < 8; i++) {
                    if (cube.edges[i].id < 4 || cube.edges[i].id >= 8) {
                        return false;
                    }
                }
                return true;
            },
        );
        const g1Cube = this.copy();
        g1Cube.executeAlgorithm(g0ToG1);

        console.log(`G1 Done: ${g0ToG1}`);

        const solvedCube = MinimalPuzzleCube.getSolvedCube();

        const g1ToG2 = g1Cube.bruteForceSolve(
            [
                [
                    ["U", "U'", "U2"],
                    ["D", "D'", "D2"],
                ],
                [["R2"], ["L2"]],
                [["F2"], ["B2"]],
            ],
            (cube: MinimalPuzzleCube): boolean => cube.equals(solvedCube),
        );

        return g0ToG1.concat(g1ToG2);
    }

    solve(): string[] {
        return this.thistlethwaiteSolve();
    }
}
