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

export default class PuzzleCube {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private canvas: HTMLCanvasElement;
    private renderer: THREE.WebGLRenderer;
    private keyState: { [key: string]: boolean };
    private cubie: Cubie;

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
        this.keyState = {};
        this.cubie = new Cubie([WHITE, YELLOW, GREEN, BLUE, ORANGE, RED]);
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
        this.cubie.addToScene(this.scene);

        const controls = new OrbitControls(this.camera, this.canvas);
        controls.target.set(0, 0, 0);
        controls.update();
    }

    // This method is to update the scene
    private update(deltaTime: number): void {
        if (this.keyState["w"]) {
            this.cubie.move(
                new THREE.Vector3(1, 0, 0).multiplyScalar(deltaTime),
            );
        }
        if (this.keyState["s"]) {
            this.cubie.rotate(
                new THREE.Euler(0, 3 * deltaTime, 0),
                this.cubie.getPosition(),
            );
        }
    }

    render(): void {
        // Add event listeners to keep track of keyboard state
        this.canvas.addEventListener("keydown", (e) => {
            this.keyState[e.key] = true;
        });
        this.canvas.addEventListener("keyup", (e) => {
            this.keyState[e.key] = false;
        });

        let lastTime = 0;

        this.load();

        const animate: XRFrameRequestCallback = (time) => {
            const deltaTime = (time - lastTime) / 1000;
            lastTime = time;
            this.update(deltaTime);
            this.renderer.render(this.scene, this.camera);
        };
        this.renderer.setAnimationLoop(animate);
    }
}
