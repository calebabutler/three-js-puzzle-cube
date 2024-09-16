import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Cubie from "./Cubie";

const LIGHT_COLOR = 0xffffff;

const WHITE = 0xffffff;
const YELLOW = 0xffff00;
const BLUE = 0x0000ff;
const GREEN = 0x00ff00;
const RED = 0xff0000;
const ORANGE = 0xffa500;
const BLACK = 0x111111;

const LINE_COLOR = 0xffffff;

const ROTATION_SPEED = 2 * Math.PI; // rad/s

enum MoveType {
    NoMove,
    Up,
    Down,
    Front,
    Back,
    Left,
    Right,
    Middle,
    Equator,
    Side,
    XRotation,
    YRotation,
    ZRotation,
}

enum MoveAmount {
    Clockwise,
    Counterclockwise,
    Halfwise,
}

enum CameraDirection {
    Front,
    Right,
    Back,
    Left,
}

interface Move {
    type: MoveType;
    amount: MoveAmount;
}

export default class PuzzleCube {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private canvas: HTMLCanvasElement;
    private renderer: THREE.WebGLRenderer;
    private cubies: Cubie[];
    private cameraLine: THREE.Line;
    private moveQueue: Move[];
    private currentMove: Move;
    private currentRotation: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            90,
            window.innerWidth / window.innerHeight,
            0.1,
            1000,
        );
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.cubies = [];
        this.moveQueue = [];
        this.currentMove = {
            type: MoveType.NoMove,
            amount: MoveAmount.Clockwise,
        };
        this.currentRotation = 0;

        this.pushCenterCubies();
        this.pushEdgeCubies();
        this.pushCornerCubies();

        this.cameraLine = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 0, -1000),
                new THREE.Vector3(0, 0, 1000),
            ]),
            new THREE.LineBasicMaterial({ color: LINE_COLOR }),
        );
        this.scene.add(this.cameraLine);
    }

    private pushCubie(
        colors: [number, number, number, number, number, number],
        position: THREE.Vector3,
    ): void {
        const cubie = new Cubie(colors);
        cubie.setPosition(position);
        this.cubies.push(cubie);
    }

    private pushCenterCubies(): void {
        this.pushCubie(
            [WHITE, BLACK, BLACK, BLACK, BLACK, BLACK],
            new THREE.Vector3(0, 1, 0),
        );
        this.pushCubie(
            [BLACK, YELLOW, BLACK, BLACK, BLACK, BLACK],
            new THREE.Vector3(0, -1, 0),
        );
        this.pushCubie(
            [BLACK, BLACK, GREEN, BLACK, BLACK, BLACK],
            new THREE.Vector3(0, 0, 1),
        );
        this.pushCubie(
            [BLACK, BLACK, BLACK, BLUE, BLACK, BLACK],
            new THREE.Vector3(0, 0, -1),
        );
        this.pushCubie(
            [BLACK, BLACK, BLACK, BLACK, ORANGE, BLACK],
            new THREE.Vector3(-1, 0, 0),
        );
        this.pushCubie(
            [BLACK, BLACK, BLACK, BLACK, BLACK, RED],
            new THREE.Vector3(1, 0, 0),
        );
    }

    private pushEdgeCubies(): void {
        // Top edges
        this.pushCubie(
            [WHITE, BLACK, GREEN, BLACK, BLACK, BLACK],
            new THREE.Vector3(0, 1, 1),
        );
        this.pushCubie(
            [WHITE, BLACK, BLACK, BLUE, BLACK, BLACK],
            new THREE.Vector3(0, 1, -1),
        );
        this.pushCubie(
            [WHITE, BLACK, BLACK, BLACK, ORANGE, BLACK],
            new THREE.Vector3(-1, 1, 0),
        );
        this.pushCubie(
            [WHITE, BLACK, BLACK, BLACK, BLACK, RED],
            new THREE.Vector3(1, 1, 0),
        );
        // Bottom edges
        this.pushCubie(
            [BLACK, YELLOW, GREEN, BLACK, BLACK, BLACK],
            new THREE.Vector3(0, -1, 1),
        );
        this.pushCubie(
            [BLACK, YELLOW, BLACK, BLUE, BLACK, BLACK],
            new THREE.Vector3(0, -1, -1),
        );
        this.pushCubie(
            [BLACK, YELLOW, BLACK, BLACK, ORANGE, BLACK],
            new THREE.Vector3(-1, -1, 0),
        );
        this.pushCubie(
            [BLACK, YELLOW, BLACK, BLACK, BLACK, RED],
            new THREE.Vector3(1, -1, 0),
        );
        // Middle edges
        this.pushCubie(
            [BLACK, BLACK, GREEN, BLACK, ORANGE, BLACK],
            new THREE.Vector3(-1, 0, 1),
        );
        this.pushCubie(
            [BLACK, BLACK, GREEN, BLACK, BLACK, RED],
            new THREE.Vector3(1, 0, 1),
        );
        this.pushCubie(
            [BLACK, BLACK, BLACK, BLUE, ORANGE, BLACK],
            new THREE.Vector3(-1, 0, -1),
        );
        this.pushCubie(
            [BLACK, BLACK, BLACK, BLUE, BLACK, RED],
            new THREE.Vector3(1, 0, -1),
        );
    }

    private pushCornerCubies(): void {
        // Top corners
        this.pushCubie(
            [WHITE, BLACK, GREEN, BLACK, ORANGE, BLACK],
            new THREE.Vector3(-1, 1, 1),
        );
        this.pushCubie(
            [WHITE, BLACK, GREEN, BLACK, BLACK, RED],
            new THREE.Vector3(1, 1, 1),
        );
        this.pushCubie(
            [WHITE, BLACK, BLACK, BLUE, ORANGE, BLACK],
            new THREE.Vector3(-1, 1, -1),
        );
        this.pushCubie(
            [WHITE, BLACK, BLACK, BLUE, BLACK, RED],
            new THREE.Vector3(1, 1, -1),
        );
        // Bottom corners
        this.pushCubie(
            [BLACK, YELLOW, GREEN, BLACK, ORANGE, BLACK],
            new THREE.Vector3(-1, -1, 1),
        );
        this.pushCubie(
            [BLACK, YELLOW, GREEN, BLACK, BLACK, RED],
            new THREE.Vector3(1, -1, 1),
        );
        this.pushCubie(
            [BLACK, YELLOW, BLACK, BLUE, ORANGE, BLACK],
            new THREE.Vector3(-1, -1, -1),
        );
        this.pushCubie(
            [BLACK, YELLOW, BLACK, BLUE, BLACK, RED],
            new THREE.Vector3(1, -1, -1),
        );
    }

    private addLightsToScene(): void {
        const ambientLight = new THREE.AmbientLight(LIGHT_COLOR, 0.4);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(LIGHT_COLOR, 1.0);
        directionalLight.castShadow = true;
        directionalLight.position.set(0, 2, 0);
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(LIGHT_COLOR, 0.8);
        directionalLight2.castShadow = true;
        directionalLight2.position.set(2, 0, 0);
        this.scene.add(directionalLight2);

        const directionalLight3 = new THREE.DirectionalLight(LIGHT_COLOR, 0.6);
        directionalLight3.castShadow = true;
        directionalLight3.position.set(0, 0, 2);
        this.scene.add(directionalLight3);

        const directionalLight4 = new THREE.DirectionalLight(LIGHT_COLOR, 1.0);
        directionalLight4.castShadow = true;
        directionalLight4.position.set(0, -2, 0);
        this.scene.add(directionalLight4);

        const directionalLight5 = new THREE.DirectionalLight(LIGHT_COLOR, 0.8);
        directionalLight5.castShadow = true;
        directionalLight5.position.set(-2, 0, 0);
        this.scene.add(directionalLight5);

        const directionalLight6 = new THREE.DirectionalLight(LIGHT_COLOR, 0.6);
        directionalLight6.castShadow = true;
        directionalLight6.position.set(0, 0, -2);
        this.scene.add(directionalLight6);
    }

    // This method is to load data to start the scene
    private load(): void {
        this.camera.position.z = 5;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.addLightsToScene();
        for (const cubie of this.cubies) {
            cubie.addToScene(this.scene);
        }

        const controls = new OrbitControls(this.camera, this.canvas);
        controls.target.set(0, 0, 0);
        controls.update();
    }

    private applyMove(move: string): void {
        const reverseMoveAmount = (moveAmount: MoveAmount): MoveAmount => {
            if (moveAmount === MoveAmount.Clockwise) {
                return MoveAmount.Counterclockwise;
            }
            if (moveAmount === MoveAmount.Counterclockwise) {
                return MoveAmount.Clockwise;
            }
            return moveAmount;
        };

        const moveError = (move: string): Error => {
            return new Error(`${move} is not a valid move`);
        };

        let moveAmount: MoveAmount;

        if (move.length > 1) {
            if (move[1] === "'") {
                moveAmount = MoveAmount.Counterclockwise;
            } else if (move[1] === "2") {
                moveAmount = MoveAmount.Halfwise;
            } else {
                throw moveError(move);
            }
        } else if (move.length === 1) {
            moveAmount = MoveAmount.Clockwise;
        } else {
            throw moveError(move);
        }

        const cameraAngle = Math.atan2(
            this.camera.position.x,
            this.camera.position.z,
        );

        let cameraDirection: CameraDirection;

        if (Math.abs(cameraAngle) <= Math.PI / 4) {
            cameraDirection = CameraDirection.Front;
        } else if (
            cameraAngle > Math.PI / 4 &&
            cameraAngle <= (3 * Math.PI) / 4
        ) {
            cameraDirection = CameraDirection.Right;
        } else if (
            cameraAngle <= -Math.PI / 4 &&
            cameraAngle > (-3 * Math.PI) / 4
        ) {
            cameraDirection = CameraDirection.Left;
        } else {
            cameraDirection = CameraDirection.Back;
        }

        switch (move[0]) {
            case "U":
                this.moveQueue.push({ type: MoveType.Up, amount: moveAmount });
                break;
            case "D":
                this.moveQueue.push({
                    type: MoveType.Down,
                    amount: moveAmount,
                });
                break;
            case "E":
                this.moveQueue.push({
                    type: MoveType.Equator,
                    amount: moveAmount,
                });
                break;
            case "y":
                this.moveQueue.push({
                    type: MoveType.YRotation,
                    amount: moveAmount,
                });
                break;
            case "R":
                switch (cameraDirection) {
                    case CameraDirection.Front:
                        this.moveQueue.push({
                            type: MoveType.Right,
                            amount: moveAmount,
                        });
                        break;
                    case CameraDirection.Right:
                        this.moveQueue.push({
                            type: MoveType.Back,
                            amount: moveAmount,
                        });
                        break;
                    case CameraDirection.Back:
                        this.moveQueue.push({
                            type: MoveType.Left,
                            amount: moveAmount,
                        });
                        break;
                    case CameraDirection.Left:
                        this.moveQueue.push({
                            type: MoveType.Front,
                            amount: moveAmount,
                        });
                        break;
                }
                break;
            case "L":
                switch (cameraDirection) {
                    case CameraDirection.Front:
                        this.moveQueue.push({
                            type: MoveType.Left,
                            amount: moveAmount,
                        });
                        break;
                    case CameraDirection.Right:
                        this.moveQueue.push({
                            type: MoveType.Front,
                            amount: moveAmount,
                        });
                        break;
                    case CameraDirection.Back:
                        this.moveQueue.push({
                            type: MoveType.Right,
                            amount: moveAmount,
                        });
                        break;
                    case CameraDirection.Left:
                        this.moveQueue.push({
                            type: MoveType.Back,
                            amount: moveAmount,
                        });
                        break;
                }
                break;
            case "F":
                switch (cameraDirection) {
                    case CameraDirection.Front:
                        this.moveQueue.push({
                            type: MoveType.Front,
                            amount: moveAmount,
                        });
                        break;
                    case CameraDirection.Right:
                        this.moveQueue.push({
                            type: MoveType.Right,
                            amount: moveAmount,
                        });
                        break;
                    case CameraDirection.Back:
                        this.moveQueue.push({
                            type: MoveType.Back,
                            amount: moveAmount,
                        });
                        break;
                    case CameraDirection.Left:
                        this.moveQueue.push({
                            type: MoveType.Left,
                            amount: moveAmount,
                        });
                        break;
                }
                break;
            case "B":
                switch (cameraDirection) {
                    case CameraDirection.Front:
                        this.moveQueue.push({
                            type: MoveType.Back,
                            amount: moveAmount,
                        });
                        break;
                    case CameraDirection.Right:
                        this.moveQueue.push({
                            type: MoveType.Left,
                            amount: moveAmount,
                        });
                        break;
                    case CameraDirection.Back:
                        this.moveQueue.push({
                            type: MoveType.Front,
                            amount: moveAmount,
                        });
                        break;
                    case CameraDirection.Left:
                        this.moveQueue.push({
                            type: MoveType.Right,
                            amount: moveAmount,
                        });
                        break;
                }
                break;
            case "x":
                switch (cameraDirection) {
                    case CameraDirection.Front:
                        this.moveQueue.push({
                            type: MoveType.XRotation,
                            amount: moveAmount,
                        });
                        break;
                    case CameraDirection.Right:
                        this.moveQueue.push({
                            type: MoveType.ZRotation,
                            amount: reverseMoveAmount(moveAmount),
                        });
                        break;
                    case CameraDirection.Back:
                        this.moveQueue.push({
                            type: MoveType.XRotation,
                            amount: reverseMoveAmount(moveAmount),
                        });
                        break;
                    case CameraDirection.Left:
                        this.moveQueue.push({
                            type: MoveType.ZRotation,
                            amount: moveAmount,
                        });
                        break;
                }
                break;
            case "z":
                switch (cameraDirection) {
                    case CameraDirection.Front:
                        this.moveQueue.push({
                            type: MoveType.ZRotation,
                            amount: moveAmount,
                        });
                        break;
                    case CameraDirection.Right:
                        this.moveQueue.push({
                            type: MoveType.XRotation,
                            amount: moveAmount,
                        });
                        break;
                    case CameraDirection.Back:
                        this.moveQueue.push({
                            type: MoveType.ZRotation,
                            amount: reverseMoveAmount(moveAmount),
                        });
                        break;
                    case CameraDirection.Left:
                        this.moveQueue.push({
                            type: MoveType.XRotation,
                            amount: reverseMoveAmount(moveAmount),
                        });
                        break;
                }
                break;
            case "M":
                switch (cameraDirection) {
                    case CameraDirection.Front:
                        this.moveQueue.push({
                            type: MoveType.Middle,
                            amount: moveAmount,
                        });
                        break;
                    case CameraDirection.Right:
                        this.moveQueue.push({
                            type: MoveType.Side,
                            amount: moveAmount,
                        });
                        break;
                    case CameraDirection.Back:
                        this.moveQueue.push({
                            type: MoveType.Middle,
                            amount: reverseMoveAmount(moveAmount),
                        });
                        break;
                    case CameraDirection.Left:
                        this.moveQueue.push({
                            type: MoveType.Side,
                            amount: reverseMoveAmount(moveAmount),
                        });
                        break;
                }
                break;
            case "S":
                switch (cameraDirection) {
                    case CameraDirection.Front:
                        this.moveQueue.push({
                            type: MoveType.Side,
                            amount: moveAmount,
                        });
                        break;
                    case CameraDirection.Right:
                        this.moveQueue.push({
                            type: MoveType.Middle,
                            amount: reverseMoveAmount(moveAmount),
                        });
                        break;
                    case CameraDirection.Back:
                        this.moveQueue.push({
                            type: MoveType.Side,
                            amount: reverseMoveAmount(moveAmount),
                        });
                        break;
                    case CameraDirection.Left:
                        this.moveQueue.push({
                            type: MoveType.Middle,
                            amount: moveAmount,
                        });
                        break;
                }
                break;
            default:
                throw moveError(move);
        }
    }

    private applyAlgorithm(algorithm: string[]): void {
        for (const move of algorithm) {
            this.applyMove(move);
        }
    }

    private generateSimpleScramble(): string[] {
        const MOVES = [
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
        ];
        const SCRAMBLE_LENGTH = 30;

        const scramble: string[] = [];

        let previousMoveType: number = -1;
        let previousMoveClass: number = -1;
        let secondPreviousMoveClass: number = -1;

        for (let i = 0; i < SCRAMBLE_LENGTH; i++) {
            let randomMoveClass: number,
                randomMoveType: number,
                randomMove: number;

            if (
                previousMoveClass >= 0 &&
                (previousMoveClass === secondPreviousMoveClass ||
                    previousMoveType === MOVES[previousMoveClass].length - 1)
            ) {
                const randMax = MOVES.length - 1;
                const rand = Math.floor(Math.random() * randMax);
                randomMoveClass = (previousMoveClass + 1 + rand) % MOVES.length;
            } else {
                const randMax = MOVES.length;
                const rand = Math.floor(Math.random() * randMax);
                randomMoveClass = rand;
            }

            if (previousMoveClass === randomMoveClass) {
                const randMax =
                    MOVES[randomMoveClass].length - previousMoveType - 1;
                const rand = Math.floor(Math.random() * randMax);
                randomMoveType = previousMoveType + 1 + rand;
            } else {
                const randMax = MOVES[randomMoveClass].length;
                const rand = Math.floor(Math.random() * randMax);
                randomMoveType = rand;
            }

            randomMove = Math.floor(
                Math.random() * MOVES[randomMoveClass][randomMoveType].length,
            );

            secondPreviousMoveClass = previousMoveClass;
            previousMoveClass = randomMoveClass;
            previousMoveType = randomMoveType;
            scramble.push(MOVES[randomMoveClass][randomMoveType][randomMove]);
        }

        return scramble;
    }

    private handleKeyDown(event: KeyboardEvent): void {
        let moveAmount: string;
        if (event.key === event.key.toUpperCase()) {
            moveAmount = "'";
        } else {
            moveAmount = "";
        }
        switch (event.key.toLowerCase()) {
            case "u":
                this.applyMove("U" + moveAmount);
                break;
            case "d":
                this.applyMove("D" + moveAmount);
                break;
            case "r":
                this.applyMove("R" + moveAmount);
                break;
            case "l":
                this.applyMove("L" + moveAmount);
                break;
            case "f":
                this.applyMove("F" + moveAmount);
                break;
            case "b":
                this.applyMove("B" + moveAmount);
                break;
            case "m":
                this.applyMove("M" + moveAmount);
                break;
            case "e":
                this.applyMove("E" + moveAmount);
                break;
            case "s":
                this.applyMove("S" + moveAmount);
                break;
            case "x":
                this.applyMove("x" + moveAmount);
                break;
            case "y":
                this.applyMove("y" + moveAmount);
                break;
            case "z":
                this.applyMove("z" + moveAmount);
                break;
            case "t":
                this.applyAlgorithm(
                    "R U R' U' R' F R2 U' R' U' R U R' F'".split(" "),
                );
                break;
            case " ":
                this.applyAlgorithm(this.generateSimpleScramble());
                break;
        }
    }

    private updateCameraLine(): void {
        const cameraAngle = Math.atan2(
            this.camera.position.x,
            this.camera.position.z,
        );

        if (
            Math.abs(cameraAngle) > Math.PI / 4 &&
            Math.abs(cameraAngle) <= (3 * Math.PI) / 4
        ) {
            this.cameraLine.setRotationFromAxisAngle(
                new THREE.Vector3(0, 1, 0),
                Math.PI / 2,
            );
        } else {
            this.cameraLine.setRotationFromAxisAngle(
                new THREE.Vector3(0, 1, 0),
                0,
            );
        }
    }

    private processMoveQueue(deltaTime: number): void {
        if (this.currentMove.type === MoveType.NoMove) {
            const nextMove = this.moveQueue.shift();
            if (nextMove === undefined) {
                return;
            }
            this.currentMove = nextMove;
            this.currentRotation = 0;
        }

        let completeRotation;
        if (this.currentMove.amount === MoveAmount.Halfwise) {
            completeRotation = Math.PI;
        } else {
            completeRotation = Math.PI / 2;
        }

        let speed = ROTATION_SPEED;

        this.currentRotation += ROTATION_SPEED * deltaTime;
        if (this.currentRotation >= completeRotation) {
            speed =
                (completeRotation -
                    this.currentRotation +
                    ROTATION_SPEED * deltaTime) /
                deltaTime;
        }

        if (this.currentMove.amount === MoveAmount.Counterclockwise) {
            speed *= -1;
        }

        const THRESHOLD = 0.1;

        switch (this.currentMove.type) {
            case MoveType.Up:
                for (const cubie of this.cubies) {
                    if (Math.abs(cubie.getPosition().y - 1) < THRESHOLD) {
                        cubie.rotate(
                            new THREE.Euler(0, -speed * deltaTime, 0),
                            new THREE.Vector3(0, 1, 0),
                        );
                    }
                }
                break;
            case MoveType.Down:
                for (const cubie of this.cubies) {
                    if (Math.abs(cubie.getPosition().y - -1) < THRESHOLD) {
                        cubie.rotate(
                            new THREE.Euler(0, speed * deltaTime, 0),
                            new THREE.Vector3(0, -1, 0),
                        );
                    }
                }
                break;
            case MoveType.Front:
                for (const cubie of this.cubies) {
                    if (Math.abs(cubie.getPosition().z - 1) < THRESHOLD) {
                        cubie.rotate(
                            new THREE.Euler(0, 0, -speed * deltaTime),
                            new THREE.Vector3(0, 0, 1),
                        );
                    }
                }
                break;
            case MoveType.Back:
                for (const cubie of this.cubies) {
                    if (Math.abs(cubie.getPosition().z - -1) < THRESHOLD) {
                        cubie.rotate(
                            new THREE.Euler(0, 0, speed * deltaTime),
                            new THREE.Vector3(0, 0, -1),
                        );
                    }
                }
                break;
            case MoveType.Left:
                for (const cubie of this.cubies) {
                    if (Math.abs(cubie.getPosition().x - -1) < THRESHOLD) {
                        cubie.rotate(
                            new THREE.Euler(speed * deltaTime, 0, 0),
                            new THREE.Vector3(-1, 0, 0),
                        );
                    }
                }
                break;
            case MoveType.Right:
                for (const cubie of this.cubies) {
                    if (Math.abs(cubie.getPosition().x - 1) < THRESHOLD) {
                        cubie.rotate(
                            new THREE.Euler(-speed * deltaTime, 0, 0),
                            new THREE.Vector3(1, 0, 0),
                        );
                    }
                }
                break;
            case MoveType.Middle:
                for (const cubie of this.cubies) {
                    if (Math.abs(cubie.getPosition().x - 0) < THRESHOLD) {
                        cubie.rotate(
                            new THREE.Euler(speed * deltaTime, 0, 0),
                            new THREE.Vector3(0, 0, 0),
                        );
                    }
                }
                break;
            case MoveType.Equator:
                for (const cubie of this.cubies) {
                    if (Math.abs(cubie.getPosition().y - 0) < THRESHOLD) {
                        cubie.rotate(
                            new THREE.Euler(0, speed * deltaTime, 0),
                            new THREE.Vector3(0, 0, 0),
                        );
                    }
                }
                break;
            case MoveType.Side:
                for (const cubie of this.cubies) {
                    if (Math.abs(cubie.getPosition().z - 0) < THRESHOLD) {
                        cubie.rotate(
                            new THREE.Euler(0, 0, -speed * deltaTime),
                            new THREE.Vector3(0, 0, 0),
                        );
                    }
                }
                break;
            case MoveType.XRotation:
                for (const cubie of this.cubies) {
                    cubie.rotate(
                        new THREE.Euler(-speed * deltaTime, 0, 0),
                        new THREE.Vector3(0, 0, 0),
                    );
                }
                break;
            case MoveType.YRotation:
                for (const cubie of this.cubies) {
                    cubie.rotate(
                        new THREE.Euler(0, -speed * deltaTime, 0),
                        new THREE.Vector3(0, 0, 0),
                    );
                }
                break;
            case MoveType.ZRotation:
                for (const cubie of this.cubies) {
                    cubie.rotate(
                        new THREE.Euler(0, 0, -speed * deltaTime),
                        new THREE.Vector3(0, 0, 0),
                    );
                }
                break;
        }

        if (this.currentRotation >= completeRotation) {
            this.currentMove.type = MoveType.NoMove;
        }
    }

    // This method is to update the scene
    private update(deltaTime: number): void {
        this.updateCameraLine();
        this.processMoveQueue(deltaTime);
    }

    render(): void {
        // Add event listener to keep track of keyboard state
        this.canvas.addEventListener("keydown", (e) => {
            this.handleKeyDown(e);
        });

        this.load();

        let lastTime = 0;
        const animate: XRFrameRequestCallback = (time) => {
            const deltaTime = (time - lastTime) / 1000;
            lastTime = time;
            this.update(deltaTime);
            this.renderer.render(this.scene, this.camera);
        };
        this.renderer.setAnimationLoop(animate);
    }
}
