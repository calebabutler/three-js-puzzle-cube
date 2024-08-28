import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const addCubeToScene = (scene: THREE.Scene): THREE.Mesh => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    return cube;
};

const addLightsToScene = (scene: THREE.Scene): void => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.castShadow = true;
    directionalLight.position.set(0, 2, 0);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight2.castShadow = true;
    directionalLight2.position.set(2, 0, 0);
    scene.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight3.castShadow = true;
    directionalLight3.position.set(0, 0, 2);
    scene.add(directionalLight3);

    const directionalLight4 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight4.castShadow = true;
    directionalLight4.position.set(-2, 0, 0);
    scene.add(directionalLight4);

    const directionalLight5 = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight5.castShadow = true;
    directionalLight5.position.set(0, 0, -2);
    scene.add(directionalLight5);
};

export const renderPuzzleCube = (canvas: HTMLCanvasElement): void => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
    );

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.update();

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const cube = addCubeToScene(scene);
    addLightsToScene(scene);

    camera.position.z = 5;
    camera.lookAt(cube.position);

    const keyState: { [key: string]: boolean } = {};
    canvas.addEventListener("keydown", (e) => {
        keyState[e.key] = true;
    });
    canvas.addEventListener("keyup", (e) => {
        keyState[e.key] = false;
    });

    let lastTime = 0;
    const velocity = new THREE.Vector3(0, 0, 0);
    const animate: XRFrameRequestCallback = (time) => {
        const deltaTime = (time - lastTime) / 1000;
        lastTime = time;

        const acceleration = new THREE.Vector3(0, 0, 0);
        const accelerationMagnitude = 500; // units/second^2
        if (keyState["w"]) {
            acceleration.z -= 1;
        }
        if (keyState["s"]) {
            acceleration.z += 1;
        }
        if (keyState["a"]) {
            acceleration.x -= 1;
        }
        if (keyState["d"]) {
            acceleration.x += 1;
        }
        acceleration.normalize();
        acceleration.multiplyScalar(
            accelerationMagnitude * deltaTime * deltaTime,
        );
        const FRICTION = 0.2;
        acceleration.add(
            new THREE.Vector3()
                .copy(velocity)
                .negate()
                .multiplyScalar(FRICTION),
        );
        velocity.add(acceleration);
        cube.position.add(velocity);
        renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animate);
};
