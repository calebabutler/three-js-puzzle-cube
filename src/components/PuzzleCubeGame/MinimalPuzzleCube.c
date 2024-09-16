/* Proof of concept for an eventual WASM implementation
 */

struct _Cubie {
    int id;
    int orientation;
};
typedef struct _Cubie Cubie;

struct _MinimalPuzzleCube {
    Cubie edges[12];
    Cubie corners[8];
};
typedef struct _MinimalPuzzleCube MinimalPuzzleCube;

const MinimalPuzzleCube SOLVED_CUBE = {
    .edges = {
        {
            .id = 0,
            .orientation = 0
        },
        {
            .id = 1,
            .orientation = 0
        },
        {
            .id = 2,
            .orientation = 0
        },
        {
            .id = 3,
            .orientation = 0
        },
        {
            .id = 4,
            .orientation = 0
        },
        {
            .id = 5,
            .orientation = 0
        },
        {
            .id = 6,
            .orientation = 0
        },
        {
            .id = 7,
            .orientation = 0
        },
        {
            .id = 8,
            .orientation = 0
        },
        {
            .id = 9,
            .orientation = 0
        },
        {
            .id = 10,
            .orientation = 0
        },
        {
            .id = 11,
            .orientation = 0
        },
    },
    .corners = {
        {
            .id = 0,
            .orientation = 0
        },
        {
            .id = 1,
            .orientation = 0
        },
        {
            .id = 2,
            .orientation = 0
        },
        {
            .id = 3,
            .orientation = 0
        },
        {
            .id = 4,
            .orientation = 0
        },
        {
            .id = 5,
            .orientation = 0
        },
        {
            .id = 6,
            .orientation = 0
        },
        {
            .id = 7,
            .orientation = 0
        },
    },
};

void shuffleCubies(Cubie cubies[], int length)
{
    // for (let i = array.length - 1; i > 1; i--) {
    //     const j = Math.floor(Math.random() * i);
    //     [array[j], array[i]] = [array[i], array[j]];
    // }
    for (int i = length - 1; i > 1; i--) {
    }
}

void makeRandomCube(MinimalPuzzleCube* cube)
{
}
