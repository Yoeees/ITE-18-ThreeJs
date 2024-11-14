import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

canvas.width = sizes.width;
canvas.height = sizes.height;

// Scene
const scene = new THREE.Scene()

// Object
const rubikCube = new THREE.Group();

const colors = [
    0xff0000, // red
    0x0000ff, // blue
    0x00ff00, // green
    0xffff00, // yellow
    0xffffff, // white
    0xff8c00 // dark orange
];

// Create materials for each face color
const materials = colors.map(color => new THREE.MeshBasicMaterial({ color }));

// Size of each small cube
const cubeSize = 0.95;
const spacing = 1;

for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {

            const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

            const cube = new THREE.Mesh(geometry, materials);

            cube.position.set(x * spacing, y * spacing, z * spacing);

            rubikCube.add(cube);
        }
    }
}

scene.add(rubikCube);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
camera.lookAt(rubikCube.position);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Rotate the cube 360 degrees
    rubikCube.rotation.y = (elapsedTime % (Math.PI * 2)); // Loop from 0 to 2 * PI (360 degrees)
    // rubikCube.rotation.x = (elapsedTime % (Math.PI * 2)); // Loop from 0 to 2 * PI (360 degrees)

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();
