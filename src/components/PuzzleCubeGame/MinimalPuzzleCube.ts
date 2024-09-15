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

const shuffle = (array: any[]): void => {
    for (let i = array.length - 1; i > 1; i--) {
        const j = Math.floor(Math.random() * i);
        [array[j], array[i]] = [array[i], array[j]];
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
                [this.edges[1], this.edges[2], this.edges[3], this.edges[0]] = [
                    this.edges[0],
                    this.edges[1],
                    this.edges[2],
                    this.edges[3],
                ];
                [
                    this.corners[1],
                    this.corners[2],
                    this.corners[3],
                    this.corners[0],
                ] = [
                    this.corners[0],
                    this.corners[1],
                    this.corners[2],
                    this.corners[3],
                ];
                break;
            case "U'":
                [this.edges[3], this.edges[0], this.edges[1], this.edges[2]] = [
                    this.edges[0],
                    this.edges[1],
                    this.edges[2],
                    this.edges[3],
                ];
                [
                    this.corners[3],
                    this.corners[0],
                    this.corners[1],
                    this.corners[2],
                ] = [
                    this.corners[0],
                    this.corners[1],
                    this.corners[2],
                    this.corners[3],
                ];
                break;
            case "U2":
                [this.edges[2], this.edges[3], this.edges[0], this.edges[1]] = [
                    this.edges[0],
                    this.edges[1],
                    this.edges[2],
                    this.edges[3],
                ];
                [
                    this.corners[2],
                    this.corners[3],
                    this.corners[0],
                    this.corners[1],
                ] = [
                    this.corners[0],
                    this.corners[1],
                    this.corners[2],
                    this.corners[3],
                ];
                break;
            case "D":
                [this.edges[9], this.edges[10], this.edges[11], this.edges[8]] =
                    [
                        this.edges[8],
                        this.edges[9],
                        this.edges[10],
                        this.edges[11],
                    ];
                [
                    this.corners[5],
                    this.corners[6],
                    this.corners[7],
                    this.corners[4],
                ] = [
                    this.corners[4],
                    this.corners[5],
                    this.corners[6],
                    this.corners[7],
                ];
                break;
            case "D'":
                [this.edges[11], this.edges[8], this.edges[9], this.edges[10]] =
                    [
                        this.edges[8],
                        this.edges[9],
                        this.edges[10],
                        this.edges[11],
                    ];
                [
                    this.corners[7],
                    this.corners[4],
                    this.corners[5],
                    this.corners[6],
                ] = [
                    this.corners[4],
                    this.corners[5],
                    this.corners[6],
                    this.corners[7],
                ];
                break;
            case "D2":
                [this.edges[10], this.edges[11], this.edges[8], this.edges[9]] =
                    [
                        this.edges[8],
                        this.edges[9],
                        this.edges[10],
                        this.edges[11],
                    ];
                [
                    this.corners[6],
                    this.corners[7],
                    this.corners[4],
                    this.corners[5],
                ] = [
                    this.corners[4],
                    this.corners[5],
                    this.corners[6],
                    this.corners[7],
                ];
                break;
            case "R":
                [this.edges[7], this.edges[1], this.edges[9], this.edges[6]] = [
                    this.edges[1],
                    this.edges[6],
                    this.edges[7],
                    this.edges[9],
                ];
                [
                    this.corners[6],
                    this.corners[1],
                    this.corners[2],
                    this.corners[5],
                ] = [
                    this.corners[1],
                    this.corners[2],
                    this.corners[5],
                    this.corners[6],
                ];
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
                [this.edges[6], this.edges[9], this.edges[1], this.edges[7]] = [
                    this.edges[1],
                    this.edges[6],
                    this.edges[7],
                    this.edges[9],
                ];
                [
                    this.corners[2],
                    this.corners[5],
                    this.corners[6],
                    this.corners[1],
                ] = [
                    this.corners[1],
                    this.corners[2],
                    this.corners[5],
                    this.corners[6],
                ];
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
                [this.edges[9], this.edges[7], this.edges[6], this.edges[1]] = [
                    this.edges[1],
                    this.edges[6],
                    this.edges[7],
                    this.edges[9],
                ];
                [
                    this.corners[5],
                    this.corners[6],
                    this.corners[1],
                    this.corners[2],
                ] = [
                    this.corners[1],
                    this.corners[2],
                    this.corners[5],
                    this.corners[6],
                ];
                break;
            case "L":
                [this.edges[5], this.edges[3], this.edges[11], this.edges[4]] =
                    [
                        this.edges[3],
                        this.edges[4],
                        this.edges[5],
                        this.edges[11],
                    ];
                [
                    this.corners[3],
                    this.corners[4],
                    this.corners[7],
                    this.corners[0],
                ] = [
                    this.corners[0],
                    this.corners[3],
                    this.corners[4],
                    this.corners[7],
                ];
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
                [this.edges[4], this.edges[11], this.edges[3], this.edges[5]] =
                    [
                        this.edges[3],
                        this.edges[4],
                        this.edges[5],
                        this.edges[11],
                    ];
                [
                    this.corners[7],
                    this.corners[0],
                    this.corners[3],
                    this.corners[4],
                ] = [
                    this.corners[0],
                    this.corners[3],
                    this.corners[4],
                    this.corners[7],
                ];
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
                [this.edges[11], this.edges[5], this.edges[4], this.edges[3]] =
                    [
                        this.edges[3],
                        this.edges[4],
                        this.edges[5],
                        this.edges[11],
                    ];
                [
                    this.corners[4],
                    this.corners[7],
                    this.corners[0],
                    this.corners[3],
                ] = [
                    this.corners[0],
                    this.corners[3],
                    this.corners[4],
                    this.corners[7],
                ];
                break;
            case "F":
                [this.edges[6], this.edges[2], this.edges[8], this.edges[5]] = [
                    this.edges[2],
                    this.edges[5],
                    this.edges[6],
                    this.edges[8],
                ];
                [
                    this.corners[5],
                    this.corners[2],
                    this.corners[3],
                    this.corners[4],
                ] = [
                    this.corners[2],
                    this.corners[3],
                    this.corners[4],
                    this.corners[5],
                ];
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
                [this.edges[5], this.edges[8], this.edges[2], this.edges[6]] = [
                    this.edges[2],
                    this.edges[5],
                    this.edges[6],
                    this.edges[8],
                ];
                [
                    this.corners[3],
                    this.corners[4],
                    this.corners[5],
                    this.corners[2],
                ] = [
                    this.corners[2],
                    this.corners[3],
                    this.corners[4],
                    this.corners[5],
                ];
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
                [this.edges[8], this.edges[6], this.edges[5], this.edges[2]] = [
                    this.edges[2],
                    this.edges[5],
                    this.edges[6],
                    this.edges[8],
                ];
                [
                    this.corners[4],
                    this.corners[5],
                    this.corners[2],
                    this.corners[3],
                ] = [
                    this.corners[2],
                    this.corners[3],
                    this.corners[4],
                    this.corners[5],
                ];
                break;
            case "B":
                [this.edges[4], this.edges[10], this.edges[0], this.edges[7]] =
                    [
                        this.edges[0],
                        this.edges[4],
                        this.edges[7],
                        this.edges[10],
                    ];
                [
                    this.corners[7],
                    this.corners[0],
                    this.corners[1],
                    this.corners[6],
                ] = [
                    this.corners[0],
                    this.corners[1],
                    this.corners[6],
                    this.corners[7],
                ];
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
                [this.edges[7], this.edges[0], this.edges[10], this.edges[4]] =
                    [
                        this.edges[0],
                        this.edges[4],
                        this.edges[7],
                        this.edges[10],
                    ];
                [
                    this.corners[1],
                    this.corners[6],
                    this.corners[7],
                    this.corners[0],
                ] = [
                    this.corners[0],
                    this.corners[1],
                    this.corners[6],
                    this.corners[7],
                ];
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
                [this.edges[10], this.edges[7], this.edges[4], this.edges[0]] =
                    [
                        this.edges[0],
                        this.edges[4],
                        this.edges[7],
                        this.edges[10],
                    ];
                [
                    this.corners[6],
                    this.corners[7],
                    this.corners[0],
                    this.corners[1],
                ] = [
                    this.corners[0],
                    this.corners[1],
                    this.corners[6],
                    this.corners[7],
                ];
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
}
