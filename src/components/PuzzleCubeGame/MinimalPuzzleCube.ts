export type MinimalPuzzleCube = string;

export const SOLVED_CUBE: MinimalPuzzleCube =
    "WWWWWWWWWOOOOOOOOOGGGGGGGGGRRRRRRRRRBBBBBBBBBYYYYYYYYY";

interface PrimitiveMove {
    source: string;
    target: string;
}

const MOVE_TYPES: { [key: string]: string | PrimitiveMove } = {
    // Primitives
    F: {
        source: "======ABC==D==E==FGHIJKLMNOP==Q==R===========STU======",
        target: "======FED==S==T==UMJGNKHOLIA==B==C===========RQP======",
    },
    S: {
        source: "===ABC====D==E==F===========G==H==I=============JKL===",
        target: "===FED====J==K==L===========A==B==C=============IHG===",
    },
    y: {
        source: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01",
        target: "GDAHEBIFCSTUVWXYZabcdefghijklmnopqrsJKLMNOPQRvy1ux0twz",
    },

    // Built off of primitives
    z: "S F y2 F' y2",
    x: "y S F y2 F' y",

    // Built off of primitives + x
    U: "x' F x",
    D: "x F x'",
    B: "y2 F y2",
    L: "y' F y",
    R: "y F y'",
    M: "y S y'",
    E: "x S x'",
};

const executeMove = (
    cube: MinimalPuzzleCube,
    move: string,
): MinimalPuzzleCube => {
    if (move.length > 1) {
        if (move[1] === "'") {
            return executeAlgorithm(cube, `${move[0]} ${move[0]} ${move[0]}`);
        } else if (move[1] === "2") {
            return executeAlgorithm(cube, `${move[0]} ${move[0]}`);
        } else {
            throw new Error("Invalid move type!");
        }
    }

    const moveData = MOVE_TYPES[move];

    if (typeof moveData === "string") {
        return executeAlgorithm(cube, moveData);
    } else {
        const map: { [key: string]: string } = {};
        for (let i = 0; i < cube.length; i++) {
            map[moveData.source[i]] = cube[i];
        }
        let newCube: string = "";
        for (let i = 0; i < cube.length; i++) {
            if (moveData.target[i] === "=") {
                newCube += cube[i];
            } else {
                newCube += map[moveData.target[i]];
            }
        }
        return newCube;
    }
};

export const executeAlgorithm = (
    cube: MinimalPuzzleCube,
    algorithm: string,
): MinimalPuzzleCube => {
    try {
        if (algorithm === "") {
            return cube;
        }

        const moveList = algorithm.trim().split(/\s+/);
        let newCube: MinimalPuzzleCube = cube;
        for (const move of moveList) {
            newCube = executeMove(newCube, move);
        }
        return newCube;
    } catch (error) {
        console.log(`Algorithm: ${algorithm}`);
        throw error;
    }
};

const numberToAlgorithm = (n: number): string => {
    const MOVE_ARRAY = [
        "",
        "U",
        "U'",
        "U2",
        "D",
        "D'",
        "D2",
        "F",
        "F'",
        "F2",
        "B",
        "B'",
        "B2",
        "L",
        "L'",
        "L2",
        "R",
        "R'",
        "R2",
    ];
    const numberInMoveArrayRadix = n.toString(MOVE_ARRAY.length);
    const algorithm = [];
    for (const digit of numberInMoveArrayRadix) {
        const index = parseInt(digit, MOVE_ARRAY.length);
        algorithm.push(MOVE_ARRAY[index]);
    }
    return algorithm.join(" ");
};

export const bruteForceSolve = (cube: MinimalPuzzleCube): string => {
    let iterator: number = 0;
    let algorithm: string = "";

    do {
        algorithm = numberToAlgorithm(iterator);
        iterator++;
    } while (executeAlgorithm(cube, algorithm) !== SOLVED_CUBE);
    return algorithm;
};
