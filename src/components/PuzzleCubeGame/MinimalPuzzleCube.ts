const SOLVED_CUBE = "WWWWWWWWWOOOOOOOOOGGGGGGGGGRRRRRRRRRBBBBBBBBBYYYYYYYYY";

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

export default class MinimalPuzzleCube {
    private cubeState: string;

    constructor() {
        this.cubeState = SOLVED_CUBE;
    }
}
