import * as THREE from "three";

export default class Cubie {
    private planes: THREE.Mesh[];
    private position: THREE.Vector3;
    private rotation: THREE.Euler;

    // The colors should be in the order:
    //  [top, bottom, front, back, left, right]
    // Each color should be an rgb hex code.
    constructor(colors: [number, number, number, number, number, number]) {
        const geometry = new THREE.PlaneGeometry(1, 1);

        const topMaterial = new THREE.MeshLambertMaterial({
            color: colors[0],
        });
        const topMesh = new THREE.Mesh(geometry, topMaterial);
        topMesh.position.set(0, 0.5, 0);
        topMesh.rotation.set(-Math.PI / 2, 0, 0);

        const bottomMaterial = new THREE.MeshLambertMaterial({
            color: colors[1],
        });
        const bottomMesh = new THREE.Mesh(geometry, bottomMaterial);
        bottomMesh.position.set(0, -0.5, 0);
        bottomMesh.rotation.set(Math.PI / 2, 0, 0);

        const frontMaterial = new THREE.MeshLambertMaterial({
            color: colors[2],
        });
        const frontMesh = new THREE.Mesh(geometry, frontMaterial);
        frontMesh.position.set(0, 0, 0.5);

        const backMaterial = new THREE.MeshLambertMaterial({
            color: colors[3],
        });
        const backMesh = new THREE.Mesh(geometry, backMaterial);
        backMesh.position.set(0, 0, -0.5);
        backMesh.rotation.set(Math.PI, 0, 0);

        const leftMaterial = new THREE.MeshLambertMaterial({
            color: colors[4],
        });
        const leftMesh = new THREE.Mesh(geometry, leftMaterial);
        leftMesh.position.set(-0.5, 0, 0);
        leftMesh.rotation.set(0, -Math.PI / 2, 0);

        const rightMaterial = new THREE.MeshLambertMaterial({
            color: colors[5],
        });
        const rightMesh = new THREE.Mesh(geometry, rightMaterial);
        rightMesh.position.set(0.5, 0, 0);
        rightMesh.rotation.set(0, Math.PI / 2, 0);

        this.planes = [
            topMesh,
            bottomMesh,
            frontMesh,
            backMesh,
            leftMesh,
            rightMesh,
        ];
        this.position = new THREE.Vector3(0, 0, 0);
        this.rotation = new THREE.Euler(0, 0, 0);
    }

    getPosition(): THREE.Vector3 {
        return new THREE.Vector3().copy(this.position);
    }

    move(velocity: THREE.Vector3): void {
        this.position.add(velocity);
        for (const plane of this.planes) {
            plane.position.add(velocity);
        }
    }

    getRotation(): THREE.Euler {
        return new THREE.Euler().copy(this.rotation);
    }

    rotate(angle: THREE.Euler, around: THREE.Vector3): void {
        const newRotationMatrix = new THREE.Matrix4().makeRotationFromEuler(
            angle,
        );
        for (const plane of this.planes) {
            const planeRotationMatrix =
                new THREE.Matrix4().makeRotationFromEuler(plane.rotation);
            plane.position
                .sub(around)
                .applyMatrix4(newRotationMatrix)
                .add(around);
            plane.rotation.setFromRotationMatrix(
                planeRotationMatrix.premultiply(newRotationMatrix),
            );
        }
        const cubieRotationMatrix = new THREE.Matrix4().makeRotationFromEuler(
            this.rotation,
        );
        this.position.sub(around).applyMatrix4(newRotationMatrix).add(around);
        this.rotation.setFromRotationMatrix(
            cubieRotationMatrix.premultiply(newRotationMatrix),
        );
    }

    addToScene(scene: THREE.Scene): void {
        for (const plane of this.planes) {
            scene.add(plane);
        }
    }
}
