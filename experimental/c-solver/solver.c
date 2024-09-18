
/* Type definitions */

struct _Cubie {
    int id;
    int orientation;
};
typedef struct _Cubie Cubie;

struct _Cube {
    Cubie edges[12];
    Cubie corners[8];
};
typedef struct _Cube Cube;

enum _Move {
    MOVE_U,
    MOVE_UCC,
    MOVE_U2,
    MOVE_D,
    MOVE_DCC,
    MOVE_D2,
    MOVE_R,
    MOVE_RCC,
    MOVE_R2,
    MOVE_L,
    MOVE_LCC,
    MOVE_L2,
    MOVE_F,
    MOVE_FCC,
    MOVE_F2,
    MOVE_B,
    MOVE_BCC,
    MOVE_B2,
    MOVE_UNAVAILABLE,
};
typedef enum _Move Move;

struct _MoveIndex {
    int move;
    int moveType;
    int moveClass;
};
typedef struct _MoveIndex MoveIndex;

struct _AvailableMoves {
    MoveIndex moveToIndex[19];
    Move indexToMove[3][2][3];
};
typedef struct _AvailableMoves AvailableMoves;

enum _Boolean {
    BOOLEAN_FALSE,
    BOOLEAN_TRUE,
};
typedef enum _Boolean Boolean;

/* Globals */

const Cube SOLVED_CUBE = {
    .edges = {
        {
            .id = 0,
            .orientation = 0,
        },
        {
            .id = 1,
            .orientation = 0,
        },
        {
            .id = 2,
            .orientation = 0,
        },
        {
            .id = 3,
            .orientation = 0,
        },
        {
            .id = 4,
            .orientation = 0,
        },
        {
            .id = 5,
            .orientation = 0,
        },
        {
            .id = 6,
            .orientation = 0,
        },
        {
            .id = 7,
            .orientation = 0,
        },
        {
            .id = 8,
            .orientation = 0,
        },
        {
            .id = 9,
            .orientation = 0,
        },
        {
            .id = 10,
            .orientation = 0,
        },
        {
            .id = 11,
            .orientation = 0,
        },
    },
    .corners = {
        {
            .id = 0,
            .orientation = 0,
        },
        {
            .id = 1,
            .orientation = 0,
        },
        {
            .id = 2,
            .orientation = 0,
        },
        {
            .id = 3,
            .orientation = 0,
        },
        {
            .id = 4,
            .orientation = 0,
        },
        {
            .id = 5,
            .orientation = 0,
        },
        {
            .id = 6,
            .orientation = 0,
        },
        {
            .id = 7,
            .orientation = 0,
        },
    },
};

const AvailableMoves AVAILABLE_MOVES_BRUTE_FORCE = {
    .moveToIndex = {
        // MOVE_U
        {
            .moveClass = 0,
            .moveType = 0,
            .move = 0,
        },
        // MOVE_UCC
        {
            .moveClass = 0,
            .moveType = 0,
            .move = 1,
        },
        // MOVE_U2
        {
            .moveClass = 0,
            .moveType = 0,
            .move = 2,
        },
        // MOVE_D
        {
            .moveClass = 0,
            .moveType = 1,
            .move = 0,
        },
        // MOVE_DCC
        {
            .moveClass = 0,
            .moveType = 1,
            .move = 1,
        },
        // MOVE_D2
        {
            .moveClass = 0,
            .moveType = 1,
            .move = 2,
        },
        // MOVE_R
        {
            .moveClass = 1,
            .moveType = 0,
            .move = 0,
        },
        // MOVE_RCC
        {
            .moveClass = 1,
            .moveType = 0,
            .move = 1,
        },
        // MOVE_R2
        {
            .moveClass = 1,
            .moveType = 0,
            .move = 2,
        },
        // MOVE_L
        {
            .moveClass = 1,
            .moveType = 1,
            .move = 0,
        },
        // MOVE_LCC
        {
            .moveClass = 1,
            .moveType = 1,
            .move = 1,
        },
        // MOVE_L2
        {
            .moveClass = 1,
            .moveType = 1,
            .move = 2,
        },
        // MOVE_F
        {
            .moveClass = 2,
            .moveType = 0,
            .move = 0,
        },
        // MOVE_FCC
        {
            .moveClass = 2,
            .moveType = 0,
            .move = 1,
        },
        // MOVE_F2
        {
            .moveClass = 2,
            .moveType = 0,
            .move = 2,
        },
        // MOVE_B
        {
            .moveClass = 2,
            .moveType = 1,
            .move = 0,
        },
        // MOVE_BCC
        {
            .moveClass = 2,
            .moveType = 1,
            .move = 1,
        },
        // MOVE_B2
        {
            .moveClass = 2,
            .moveType = 1,
            .move = 2,
        },
        // MOVE_UNAVAILABLE
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
    },
    .indexToMove = {
        {{ MOVE_U, MOVE_UCC, MOVE_U2 }, { MOVE_D, MOVE_DCC, MOVE_D2 }},
        {{ MOVE_R, MOVE_RCC, MOVE_R2 }, { MOVE_L, MOVE_LCC, MOVE_L2 }},
        {{ MOVE_F, MOVE_FCC, MOVE_F2 }, { MOVE_B, MOVE_BCC, MOVE_B2 }},
    },
};

const AvailableMoves AVAILABLE_MOVES_G1_G2 = {
    .moveToIndex = {
        // MOVE_U
        {
            .moveClass = 0,
            .moveType = 0,
            .move = 0,
        },
        // MOVE_UCC
        {
            .moveClass = 0,
            .moveType = 0,
            .move = 1,
        },
        // MOVE_U2
        {
            .moveClass = 0,
            .moveType = 0,
            .move = 2,
        },
        // MOVE_D
        {
            .moveClass = 0,
            .moveType = 1,
            .move = 0,
        },
        // MOVE_DCC
        {
            .moveClass = 0,
            .moveType = 1,
            .move = 1,
        },
        // MOVE_D2
        {
            .moveClass = 0,
            .moveType = 1,
            .move = 2,
        },
        // MOVE_R
        {
            .moveClass = 1,
            .moveType = 0,
            .move = 0,
        },
        // MOVE_RCC
        {
            .moveClass = 1,
            .moveType = 0,
            .move = 1,
        },
        // MOVE_R2
        {
            .moveClass = 1,
            .moveType = 0,
            .move = 2,
        },
        // MOVE_L
        {
            .moveClass = 1,
            .moveType = 1,
            .move = 0,
        },
        // MOVE_LCC
        {
            .moveClass = 1,
            .moveType = 1,
            .move = 1,
        },
        // MOVE_L2
        {
            .moveClass = 1,
            .moveType = 1,
            .move = 2,
        },
        // MOVE_F
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_FCC
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_F2
        {
            .moveClass = 2,
            .moveType = 0,
            .move = 2,
        },
        // MOVE_B
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_BCC
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_B2
        {
            .moveClass = 2,
            .moveType = 1,
            .move = 2,
        },
        // MOVE_UNAVAILABLE
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
    },
    .indexToMove = {
        {{ MOVE_U, MOVE_UCC, MOVE_U2 }, { MOVE_D, MOVE_DCC, MOVE_D2 }},
        {{ MOVE_R, MOVE_RCC, MOVE_R2 }, { MOVE_L, MOVE_LCC, MOVE_L2 }},
        {{ MOVE_F2, MOVE_UNAVAILABLE, MOVE_UNAVAILABLE }, { MOVE_B2, MOVE_UNAVAILABLE, MOVE_UNAVAILABLE }},
    },
};

const AvailableMoves AVAILABLE_MOVES_G2_G3 = {
    .moveToIndex = {
        // MOVE_U
        {
            .moveClass = 0,
            .moveType = 0,
            .move = 0,
        },
        // MOVE_UCC
        {
            .moveClass = 0,
            .moveType = 0,
            .move = 1,
        },
        // MOVE_U2
        {
            .moveClass = 0,
            .moveType = 0,
            .move = 2,
        },
        // MOVE_D
        {
            .moveClass = 0,
            .moveType = 1,
            .move = 0,
        },
        // MOVE_DCC
        {
            .moveClass = 0,
            .moveType = 1,
            .move = 1,
        },
        // MOVE_D2
        {
            .moveClass = 0,
            .moveType = 1,
            .move = 2,
        },
        // MOVE_R
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_RCC
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_R2
        {
            .moveClass = 1,
            .moveType = 0,
            .move = 0,
        },
        // MOVE_L
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_LCC
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_L2
        {
            .moveClass = 1,
            .moveType = 1,
            .move = 0,
        },
        // MOVE_F
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_FCC
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_F2
        {
            .moveClass = 2,
            .moveType = 0,
            .move = 0,
        },
        // MOVE_B
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_BCC
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_B2
        {
            .moveClass = 2,
            .moveType = 1,
            .move = 0,
        },
        // MOVE_UNAVAILABLE
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
    },
    .indexToMove = {
        {{ MOVE_U, MOVE_UCC, MOVE_U2 }, { MOVE_D, MOVE_DCC, MOVE_D2 }},
        {{ MOVE_R2, MOVE_UNAVAILABLE, MOVE_UNAVAILABLE }, { MOVE_L2, MOVE_UNAVAILABLE, MOVE_UNAVAILABLE }},
        {{ MOVE_F2, MOVE_UNAVAILABLE, MOVE_UNAVAILABLE }, { MOVE_B2, MOVE_UNAVAILABLE, MOVE_UNAVAILABLE }},
    },
};

const AvailableMoves AVAILABLE_MOVES_G3_G4 = {
    .moveToIndex = {
        // MOVE_U
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_UCC
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_U2
        {
            .moveClass = 0,
            .moveType = 0,
            .move = 0,
        },
        // MOVE_D
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_DCC
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_D2
        {
            .moveClass = 0,
            .moveType = 1,
            .move = 0,
        },
        // MOVE_R
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_RCC
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_R2
        {
            .moveClass = 1,
            .moveType = 0,
            .move = 0,
        },
        // MOVE_L
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_LCC
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_L2
        {
            .moveClass = 1,
            .moveType = 1,
            .move = 0,
        },
        // MOVE_F
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_FCC
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_F2
        {
            .moveClass = 2,
            .moveType = 0,
            .move = 0,
        },
        // MOVE_B
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_BCC
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
        // MOVE_B2
        {
            .moveClass = 2,
            .moveType = 1,
            .move = 0,
        },
        // MOVE_UNAVAILABLE
        {
            .moveClass = -1,
            .moveType = -1,
            .move = -1,
        },
    },
    .indexToMove = {
        {{ MOVE_U2, MOVE_UNAVAILABLE, MOVE_UNAVAILABLE }, { MOVE_D2, MOVE_UNAVAILABLE, MOVE_UNAVAILABLE }},
        {{ MOVE_R2, MOVE_UNAVAILABLE, MOVE_UNAVAILABLE }, { MOVE_L2, MOVE_UNAVAILABLE, MOVE_UNAVAILABLE }},
        {{ MOVE_F2, MOVE_UNAVAILABLE, MOVE_UNAVAILABLE }, { MOVE_B2, MOVE_UNAVAILABLE, MOVE_UNAVAILABLE }},
    },
};

// MIGHT add this later for allocating heap, currently unsure

// extern unsigned char __heap_base;

// unsigned char* bumpPointer = &__heap_base;

// void* allocateHeap(int n)
// {
//     unsigned char* r = bumpPointer;
//     bumpPointer += n;
//     return (void*) r;
// }

/* Functions */

void swapFour(
    Cubie array[],
    int resultIndex1,
    int resultIndex2,
    int resultIndex3,
    int resultIndex4,
    int index1,
    int index2,
    int index3,
    int index4)
{
    Cubie tmp1 = array[index1];
    Cubie tmp2 = array[index2];
    Cubie tmp3 = array[index3];
    Cubie tmp4 = array[index4];
    array[resultIndex1] = tmp1;
    array[resultIndex2] = tmp2;
    array[resultIndex3] = tmp3;
    array[resultIndex4] = tmp4;
}

void executeMove(Cube* cube, Move move)
{
    switch (move) {
    case MOVE_U:
        swapFour(cube->edges, 1, 2, 3, 0, 0, 1, 2, 3);
        swapFour(cube->corners, 1, 2, 3, 0, 0, 1, 2, 3);
        break;
    case MOVE_UCC:
        swapFour(cube->edges, 3, 0, 1, 2, 0, 1, 2, 3);
        swapFour(cube->corners, 3, 0, 1, 2, 0, 1, 2, 3);
        break;
    case MOVE_U2:
        swapFour(cube->edges, 2, 3, 0, 1, 0, 1, 2, 3);
        swapFour(cube->corners, 2, 3, 0, 1, 0, 1, 2, 3);
        break;
    case MOVE_D:
        swapFour(cube->edges, 9, 10, 11, 8, 8, 9, 10, 11);
        swapFour(cube->corners, 5, 6, 7, 4, 4, 5, 6, 7);
        break;
    case MOVE_DCC:
        swapFour(cube->edges, 11, 8, 9, 10, 8, 9, 10, 11);
        swapFour(cube->corners, 7, 4, 5, 6, 4, 5, 6, 7);
        break;
    case MOVE_D2:
        swapFour(cube->edges, 10, 11, 8, 9, 8, 9, 10, 11);
        swapFour(cube->corners, 6, 7, 4, 5, 4, 5, 6, 7);
        break;
    case MOVE_R:
        swapFour(cube->edges, 7, 1, 9, 6, 1, 6, 7, 9);
        swapFour(cube->corners, 6, 1, 2, 5, 1, 2, 5, 6);
        cube->corners[1].orientation += 2;
        cube->corners[1].orientation %= 3;
        cube->corners[2].orientation += 1;
        cube->corners[2].orientation %= 3;
        cube->corners[5].orientation += 2;
        cube->corners[5].orientation %= 3;
        cube->corners[6].orientation += 1;
        cube->corners[6].orientation %= 3;
        break;
    case MOVE_RCC:
        swapFour(cube->edges, 6, 9, 1, 7, 1, 6, 7, 9);
        swapFour(cube->corners, 2, 5, 6, 1, 1, 2, 5, 6);
        cube->corners[1].orientation += 2;
        cube->corners[1].orientation %= 3;
        cube->corners[2].orientation += 1;
        cube->corners[2].orientation %= 3;
        cube->corners[5].orientation += 2;
        cube->corners[5].orientation %= 3;
        cube->corners[6].orientation += 1;
        cube->corners[6].orientation %= 3;
        break;
    case MOVE_R2:
        swapFour(cube->edges, 9, 7, 6, 1, 1, 6, 7, 9);
        swapFour(cube->corners, 5, 6, 1, 2, 1, 2, 5, 6);
        break;
    case MOVE_L:
        swapFour(cube->edges, 5, 3, 11, 4, 3, 4, 5, 11);
        swapFour(cube->corners, 3, 4, 7, 0, 0, 3, 4, 7);
        cube->corners[0].orientation += 1;
        cube->corners[0].orientation %= 3;
        cube->corners[3].orientation += 2;
        cube->corners[3].orientation %= 3;
        cube->corners[4].orientation += 1;
        cube->corners[4].orientation %= 3;
        cube->corners[7].orientation += 2;
        cube->corners[7].orientation %= 3;
        break;
    case MOVE_LCC:
        swapFour(cube->edges, 4, 11, 3, 5, 3, 4, 5, 11);
        swapFour(cube->corners, 7, 0, 3, 4, 0, 3, 4, 7);
        cube->corners[0].orientation += 1;
        cube->corners[0].orientation %= 3;
        cube->corners[3].orientation += 2;
        cube->corners[3].orientation %= 3;
        cube->corners[4].orientation += 1;
        cube->corners[4].orientation %= 3;
        cube->corners[7].orientation += 2;
        cube->corners[7].orientation %= 3;
        break;
    case MOVE_L2:
        swapFour(cube->edges, 11, 5, 4, 3, 3, 4, 5, 11);
        swapFour(cube->corners, 4, 7, 0, 3, 0, 3, 4, 7);
        break;
    case MOVE_F:
        swapFour(cube->edges, 6, 2, 8, 5, 2, 5, 6, 8);
        swapFour(cube->corners, 5, 2, 3, 4, 2, 3, 4, 5);
        cube->edges[2].orientation += 1;
        cube->edges[2].orientation %= 2;
        cube->edges[5].orientation += 1;
        cube->edges[5].orientation %= 2;
        cube->edges[6].orientation += 1;
        cube->edges[6].orientation %= 2;
        cube->edges[8].orientation += 1;
        cube->edges[8].orientation %= 2;
        cube->corners[2].orientation += 2;
        cube->corners[2].orientation %= 3;
        cube->corners[3].orientation += 1;
        cube->corners[3].orientation %= 3;
        cube->corners[4].orientation += 2;
        cube->corners[4].orientation %= 3;
        cube->corners[5].orientation += 1;
        cube->corners[5].orientation %= 3;
        break;
    case MOVE_FCC:
        swapFour(cube->edges, 5, 8, 2, 6, 2, 5, 6, 8);
        swapFour(cube->corners, 3, 4, 5, 2, 2, 3, 4, 5);
        cube->edges[2].orientation += 1;
        cube->edges[2].orientation %= 2;
        cube->edges[5].orientation += 1;
        cube->edges[5].orientation %= 2;
        cube->edges[6].orientation += 1;
        cube->edges[6].orientation %= 2;
        cube->edges[8].orientation += 1;
        cube->edges[8].orientation %= 2;
        cube->corners[2].orientation += 2;
        cube->corners[2].orientation %= 3;
        cube->corners[3].orientation += 1;
        cube->corners[3].orientation %= 3;
        cube->corners[4].orientation += 2;
        cube->corners[4].orientation %= 3;
        cube->corners[5].orientation += 1;
        cube->corners[5].orientation %= 3;
        break;
    case MOVE_F2:
        swapFour(cube->edges, 8, 6, 5, 2, 2, 5, 6, 8);
        swapFour(cube->corners, 4, 5, 2, 3, 2, 3, 4, 5);
        break;
    case MOVE_B:
        swapFour(cube->edges, 4, 10, 0, 7, 0, 4, 7, 10);
        swapFour(cube->corners, 7, 0, 1, 6, 0, 1, 6, 7);
        cube->edges[0].orientation += 1;
        cube->edges[0].orientation %= 2;
        cube->edges[4].orientation += 1;
        cube->edges[4].orientation %= 2;
        cube->edges[7].orientation += 1;
        cube->edges[7].orientation %= 2;
        cube->edges[10].orientation += 1;
        cube->edges[10].orientation %= 2;
        cube->corners[0].orientation += 2;
        cube->corners[0].orientation %= 3;
        cube->corners[1].orientation += 1;
        cube->corners[1].orientation %= 3;
        cube->corners[6].orientation += 2;
        cube->corners[6].orientation %= 3;
        cube->corners[7].orientation += 1;
        cube->corners[7].orientation %= 3;
        break;
    case MOVE_BCC:
        swapFour(cube->edges, 7, 0, 10, 4, 0, 4, 7, 10);
        swapFour(cube->corners, 1, 6, 7, 0, 0, 1, 6, 7);
        cube->edges[0].orientation += 1;
        cube->edges[0].orientation %= 2;
        cube->edges[4].orientation += 1;
        cube->edges[4].orientation %= 2;
        cube->edges[7].orientation += 1;
        cube->edges[7].orientation %= 2;
        cube->edges[10].orientation += 1;
        cube->edges[10].orientation %= 2;
        cube->corners[0].orientation += 2;
        cube->corners[0].orientation %= 3;
        cube->corners[1].orientation += 1;
        cube->corners[1].orientation %= 3;
        cube->corners[6].orientation += 2;
        cube->corners[6].orientation %= 3;
        cube->corners[7].orientation += 1;
        cube->corners[7].orientation %= 3;
        break;
    case MOVE_B2:
        swapFour(cube->edges, 10, 7, 4, 0, 0, 4, 7, 10);
        swapFour(cube->corners, 6, 7, 0, 1, 0, 1, 6, 7);
        break;
    default:
        break;
    }
}

void executeAlgorithm(Cube* cube, const Move algorithm[], int length)
{
    for (int i = 0; i < length; i++) {
        executeMove(cube, algorithm[i]);
    }
}

Move iterateMove(
    Move move,
    const AvailableMoves* availableMoves,
    const Move previousMoves[],
    int previousMovesLength)
{
    MoveIndex moveIndex = availableMoves->moveToIndex[move];

    /* Try to increment move */
    for (int i = moveIndex.move + 1; i < 3; i++) {
        Move candidate = availableMoves->indexToMove[moveIndex.moveClass][moveIndex.moveType][i];
        if (candidate != MOVE_UNAVAILABLE) {
            return candidate;
        }
    }

    int previousMoveClass = -1;
    int previousMoveType = -1;

    if (previousMovesLength > 0) {
        previousMoveClass = availableMoves->moveToIndex[previousMoves[previousMovesLength - 1]].moveClass;
        previousMoveType = availableMoves->moveToIndex[previousMoves[previousMovesLength - 1]].moveType;
    }

    /* Try to increment move type */
    if (moveIndex.moveType == 0 && (moveIndex.moveClass != previousMoveClass || previousMoveType != 1)) {
        return availableMoves->indexToMove[moveIndex.moveClass][1][0];
    }

    int secondPreviousMoveClass = -1;
    if (previousMovesLength > 1) {
        secondPreviousMoveClass = availableMoves->moveToIndex[previousMoves[previousMovesLength - 2]].moveClass;
    }

    /* Try to increment move class */
    for (int i = moveIndex.moveClass + 1; i < 3; i++) {
        if (i != previousMoveClass) {
            return availableMoves->indexToMove[i][0][0];
        }
        if (i != secondPreviousMoveClass && previousMoveType == 0) {
            return availableMoves->indexToMove[i][1][0];
        }
    }

    /* If all else fails, return fallback */
    return MOVE_UNAVAILABLE;
}

Move getFirstAllowedMove(
    const AvailableMoves* availableMoves,
    const Move previousMoves[],
    int previousMovesLength)
{
    int previousMoveClass = -1;
    int previousMoveType = -1;

    if (previousMovesLength > 0) {
        previousMoveClass = availableMoves->moveToIndex[previousMoves[previousMovesLength - 1]].moveClass;
        previousMoveType = availableMoves->moveToIndex[previousMoves[previousMovesLength - 1]].moveType;
    }

    if (previousMoveClass == 0 && previousMoveType == 1) {
        return availableMoves->indexToMove[1][0][0];
    }
    if (previousMoveClass == 0 && previousMoveType == 0) {
        return availableMoves->indexToMove[0][1][0];
    }
    return availableMoves->indexToMove[0][0][0];
}

int iterateAlgorithm(
    Move algorithm[],
    int algorithmLength,
    const AvailableMoves* availableMoves)
{
    /* Try not to expand algorithm */
    for (int i = algorithmLength - 1; i >= 0; i--) {
        Move nextMove = iterateMove(algorithm[i], availableMoves, algorithm, i);
        if (nextMove != MOVE_UNAVAILABLE) {
            algorithm[i] = nextMove;
            for (int j = i + 1; j < algorithmLength; j++) {
                algorithm[j] = getFirstAllowedMove(availableMoves, algorithm, j);
            }
            return algorithmLength;
        }
    }

    /* If necessary, add to algorithm length */
    for (int i = 0; i < algorithmLength + 1; i++) {
        algorithm[i] = getFirstAllowedMove(availableMoves, algorithm, i);
    }
    return algorithmLength + 1;
}

Boolean isCubeSolved(const Cube* cube)
{
    for (int i = 0; i < 12; i++) {
        if (cube->edges[i].id != i || cube->edges[i].orientation != 0) {
            return BOOLEAN_FALSE;
        }
        if (i < 8 && (cube->corners[i].id != i || cube->corners[i].orientation != 0)) {
            return BOOLEAN_FALSE;
        }
    }
    return BOOLEAN_TRUE;
}

int bruteForceSolve(
    const Cube* cube,
    Move algorithm[],
    int algorithmCapacity)
{
    int algorithmLength = 0;
    while (algorithmLength < algorithmCapacity) {
        Cube newCube = *cube;
        executeAlgorithm(&newCube, algorithm, algorithmLength);
        if (isCubeSolved(&newCube)) {
            return algorithmLength;
        }
        algorithmLength = iterateAlgorithm(algorithm, algorithmLength, &AVAILABLE_MOVES_BRUTE_FORCE);
    }
    return algorithmLength;
}

int g0ToG1Solve(
    const Cube* cube,
    Move algorithm[],
    int algorithmCapacity)
{
    int algorithmLength = 0;
    while (algorithmLength < algorithmCapacity) {
        Cube newCube = *cube;
        executeAlgorithm(&newCube, algorithm, algorithmLength);
        Boolean isCubeG1 = BOOLEAN_TRUE;
        for (int i = 0; i < 12; i++) {
            if (newCube.edges[i].orientation != 0) {
                isCubeG1 = BOOLEAN_FALSE;
            }
        }
        if (isCubeG1) {
            return algorithmLength;
        }
        algorithmLength = iterateAlgorithm(algorithm, algorithmLength, &AVAILABLE_MOVES_BRUTE_FORCE);
    }
    /* The code should only reach here if algorithmCapacity is <= 7 */
    return algorithmLength;
}

int g1ToG2Solve(
    const Cube* cube,
    Move algorithm[],
    int algorithmCapacity)
{
    int algorithmLength = 0;
    while (algorithmLength < algorithmCapacity) {
        Cube newCube = *cube;
        executeAlgorithm(&newCube, algorithm, algorithmLength);
        Boolean isCubeG2 = BOOLEAN_TRUE;
        for (int i = 0; i < 8; i++) {
            if (newCube.corners[i].orientation != 0) {
                isCubeG2 = BOOLEAN_FALSE;
            }
        }
        for (int i = 4; i < 8; i++) {
            if (newCube.edges[i].id < 4 || newCube.edges[i].id >= 8) {
                isCubeG2 = BOOLEAN_FALSE;
            }
        }
        if (isCubeG2) {
            return algorithmLength;
        }
        algorithmLength = iterateAlgorithm(algorithm, algorithmLength, &AVAILABLE_MOVES_G1_G2);
    }
    /* The code should only reach here if algorithmCapacity is <= 10 */
    return algorithmLength;
}

int g2ToG3Solve(
    const Cube* cube,
    Move algorithm[],
    int algorithmCapacity)
{
    int algorithmLength = 0;
    while (algorithmLength < algorithmCapacity) {
        Cube newCube = *cube;
        executeAlgorithm(&newCube, algorithm, algorithmLength);
        Boolean isCubeG3 = BOOLEAN_TRUE;
        for (int i = 0; i < 4; i++) {
            if (newCube.edges[i].id % 2 != i % 2) {
                isCubeG3 = BOOLEAN_FALSE;
            }
        }
        for (int i = 8; i < 12; i++) {
            if (newCube.edges[i].id % 2 != i % 2) {
                isCubeG3 = BOOLEAN_FALSE;
            }
        }
        for (int i = 0; i < 7; i++) {
            if (newCube.corners[i].id % 2 != i % 2) {
                isCubeG3 = BOOLEAN_FALSE;
            }
        }
        // Check corner orbits!
        int a = newCube.corners[0].id;
        int b = newCube.corners[2].id;
        int c = newCube.corners[4].id;
        int d = newCube.corners[6].id;
        if (!(newCube.corners[1].id == (a + 1) % 8
           && newCube.corners[3].id == (b + 1) % 8
           && newCube.corners[5].id == (c + 1) % 8
           && newCube.corners[7].id == (d + 1) % 8)
         && !(newCube.corners[1].id == (b + 1) % 8
           && newCube.corners[3].id == (a + 1) % 8
           && newCube.corners[5].id == (d + 1) % 8
           && newCube.corners[7].id == (c + 1) % 8)
         && !(newCube.corners[1].id == (c + 1) % 8
           && newCube.corners[3].id == (d + 1) % 8
           && newCube.corners[5].id == (a + 1) % 8
           && newCube.corners[7].id == (b + 1) % 8)
         && !(newCube.corners[1].id == (d + 1) % 8
           && newCube.corners[3].id == (c + 1) % 8
           && newCube.corners[5].id == (b + 1) % 8
           && newCube.corners[7].id == (a + 1) % 8)) {
            isCubeG3 = BOOLEAN_FALSE;
        }
        if (isCubeG3) {
            return algorithmLength;
        }
        algorithmLength = iterateAlgorithm(algorithm, algorithmLength, &AVAILABLE_MOVES_G2_G3);
    }
    /* The code should only reach here if algorithmCapacity is <= 13 */
    return algorithmLength;
}

#include <stdio.h>
void printAlgorithm(const Move algorithm[], int algorithmLength);

int g3ToG4Solve(
    const Cube* cube,
    Move algorithm[],
    int algorithmCapacity)
{
    int algorithmLength = 0;
    while (algorithmLength < algorithmCapacity) {
        Cube newCube = *cube;
        executeAlgorithm(&newCube, algorithm, algorithmLength);
        if (isCubeSolved(&newCube)) {
            return algorithmLength;
        }
        algorithmLength = iterateAlgorithm(algorithm, algorithmLength, &AVAILABLE_MOVES_G3_G4);
    }
    /* The code should only reach here if algorithmCapacity is <= 15 */
    return algorithmLength;
}

int thistlethwaiteSolve(
    const Cube* cube,
    Move algorithm[],
    int algorithmCapacity)
{
    int algorithmLength = 0;
    Cube copyCube = *cube;

    /* G0 to G1 */
    {
        Move g0ToG1Algorithm[8];
        int g0ToG1AlgorithmLength = g0ToG1Solve(&copyCube, g0ToG1Algorithm, 8);
        for (int i = 0; i < g0ToG1AlgorithmLength && algorithmLength < algorithmCapacity; i++) {
            algorithm[algorithmLength] = g0ToG1Algorithm[i];
            algorithmLength++;
        }
        executeAlgorithm(&copyCube, g0ToG1Algorithm, g0ToG1AlgorithmLength);

        printf("G0 to G1 done.\n");
        printAlgorithm(g0ToG1Algorithm, g0ToG1AlgorithmLength);
    }

    /* G1 to G2 */
    {
        Move g1ToG2Algorithm[11];
        int g1ToG2AlgorithmLength = g1ToG2Solve(&copyCube, g1ToG2Algorithm, 11);
        for (int i = 0; i < g1ToG2AlgorithmLength && algorithmLength < algorithmCapacity; i++) {
            algorithm[algorithmLength] = g1ToG2Algorithm[i];
            algorithmLength++;
        }
        executeAlgorithm(&copyCube, g1ToG2Algorithm, g1ToG2AlgorithmLength);

        printf("G1 to G2 done.\n");
        printAlgorithm(g1ToG2Algorithm, g1ToG2AlgorithmLength);
    }

    /* G2 to G3 */
    {
        Move g2ToG3Algorithm[14];
        int g2ToG3AlgorithmLength = g2ToG3Solve(&copyCube, g2ToG3Algorithm, 14);
        for (int i = 0; i < g2ToG3AlgorithmLength && algorithmLength < algorithmCapacity; i++) {
            algorithm[algorithmLength] = g2ToG3Algorithm[i];
            algorithmLength++;
        }
        executeAlgorithm(&copyCube, g2ToG3Algorithm, g2ToG3AlgorithmLength);

        printf("G2 to G3 done.\n");
        printAlgorithm(g2ToG3Algorithm, g2ToG3AlgorithmLength);
    }

    /* G3 to G4 */
    {
        Move g3ToG4Algorithm[16];
        int g3ToG4AlgorithmLength = g3ToG4Solve(&copyCube, g3ToG4Algorithm, 16);
        for (int i = 0; i < g3ToG4AlgorithmLength && algorithmLength < algorithmCapacity; i++) {
            algorithm[algorithmLength] = g3ToG4Algorithm[i];
            algorithmLength++;
        }
        printf("G3 to G4 done.\n");
        printAlgorithm(g3ToG4Algorithm, g3ToG4AlgorithmLength);
    }

    return algorithmLength;
}

/* Debugging */

#include <stdio.h>

void printCube(const Cube* cube)
{
    printf("{\n");
    printf(" \tedges: {\n");
    for (int i = 0; i < 12; i++) {
        printf("\t\t{ id: %d, orientation: %d },\n", cube->edges[i].id,
               cube->edges[i].orientation);
    }
    printf("\t},\n");
    printf(" \tcorners: {\n");
    for (int i = 0; i < 8; i++) {
        printf("\t\t{ id: %d, orientation: %d },\n", cube->corners[i].id,
               cube->corners[i].orientation);
    }
    printf("\t},\n");
    printf("}\n");
}

void printAlgorithm(const Move algorithm[], int algorithmLength)
{
    for (int i = 0; i < algorithmLength; i++) {
        switch (algorithm[i]) {
        case MOVE_U:
            printf("U");
            break;
        case MOVE_UCC:
            printf("U'");
            break;
        case MOVE_U2:
            printf("U2");
            break;
        case MOVE_D:
            printf("D");
            break;
        case MOVE_DCC:
            printf("D'");
            break;
        case MOVE_D2:
            printf("D2");
            break;
        case MOVE_R:
            printf("R");
            break;
        case MOVE_RCC:
            printf("R'");
            break;
        case MOVE_R2:
            printf("R2");
            break;
        case MOVE_L:
            printf("L");
            break;
        case MOVE_LCC:
            printf("L'");
            break;
        case MOVE_L2:
            printf("L2");
            break;
        case MOVE_F:
            printf("F");
            break;
        case MOVE_FCC:
            printf("F'");
            break;
        case MOVE_F2:
            printf("F2");
            break;
        case MOVE_B:
            printf("B");
            break;
        case MOVE_BCC:
            printf("B'");
            break;
        case MOVE_B2:
            printf("B2");
            break;
        case MOVE_UNAVAILABLE:
            printf("UNAVAILABLE");
            break;
        }
        if (i < algorithmLength - 1) {
            printf(" ");
        }
    }
    printf("\n");
}

int main()
{
    const Move tPerm[] = {
        MOVE_L2,
        MOVE_U,
        MOVE_B2,
        MOVE_L2,
        MOVE_B2,
        MOVE_DCC,
        MOVE_R2,
        MOVE_D,
        MOVE_L2,
        MOVE_F2,
        MOVE_D2,
        MOVE_R,
        MOVE_B2,
        MOVE_FCC,
        MOVE_D2,
        MOVE_BCC,
        MOVE_U,
        MOVE_B2,
        MOVE_F2,
        MOVE_U
    };

    Cube cube = SOLVED_CUBE;

    executeAlgorithm(&cube, tPerm, sizeof(tPerm) / sizeof(Move));

    Move algorithm[100];
    int algorithmLength = thistlethwaiteSolve(&cube, algorithm, 100);

    printAlgorithm(algorithm, algorithmLength);

    return 0;
}
