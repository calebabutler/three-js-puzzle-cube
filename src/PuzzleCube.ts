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

const ROTATION_SPEED = Math.PI; // rad/s

enum MoveType {
    NoMove,
    Up,
    Down,
    Front,
    Back,
    Left,
    Right,
}

enum MoveAmount {
    Clockwise,
    Counterclockwise,
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
    private moveQueue: Move[];
    private currentMove: Move;
    private currentRotation: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
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

    private handleKeyDown(event: KeyboardEvent): void {
        let moveAmount;
        if (event.key === event.key.toUpperCase()) {
            moveAmount = MoveAmount.Counterclockwise;
        } else {
            moveAmount = MoveAmount.Clockwise;
        }

        switch (event.key) {
            case "u":
            case "U":
                this.moveQueue.push({ type: MoveType.Up, amount: moveAmount });
                break;
            case "d":
            case "D":
                this.moveQueue.push({
                    type: MoveType.Down,
                    amount: moveAmount,
                });
                break;
            case "f":
            case "F":
                this.moveQueue.push({
                    type: MoveType.Front,
                    amount: moveAmount,
                });
                break;
            case "b":
            case "B":
                this.moveQueue.push({
                    type: MoveType.Back,
                    amount: moveAmount,
                });
                break;
            case "r":
            case "R":
                this.moveQueue.push({
                    type: MoveType.Right,
                    amount: moveAmount,
                });
                break;
            case "l":
            case "L":
                this.moveQueue.push({
                    type: MoveType.Left,
                    amount: moveAmount,
                });
                break;
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

        let speed = ROTATION_SPEED;
        if (this.currentMove.amount === MoveAmount.Counterclockwise) {
            speed *= -1;
        }

        this.currentRotation += ROTATION_SPEED * deltaTime;

        if (this.currentRotation >= Math.PI / 2) {
            speed =
                (Math.PI / 2 -
                    this.currentRotation +
                    ROTATION_SPEED * deltaTime) /
                deltaTime;
            this.currentMove.type = MoveType.NoMove;
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
        }
    }

    // This method is to update the scene
    private update(deltaTime: number): void {
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
