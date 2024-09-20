import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const container = document.getElementById("modelcontainer");

const camera = new THREE.PerspectiveCamera(75, 1000/500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(1000, 500);

// Append the renderer's DOM element to the container
container.appendChild(renderer.domElement);

// Set clear color to white instead of the default black
renderer.setClearColor(0xffffff); // white background

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.zoomSpeed = 0.5;

const loader = new GLTFLoader();
const baseURL = 'https://coding-jod.github.io/ecommerce2/';
loader.load(
    `${baseURL}assets/shoe/scene.gltf`,
    (gltf) => {
        scene.add(gltf.scene);
        gltf.scene.position.set(0, 0, 0);
        const scaleFactor = 5.5 ; // Adjust scale factor as needed
        gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor);
        gltf.scene.rotation.set(0, 3* (Math.PI / 4), 0);

        // Set camera position directly
        const cameraDistance = 3.5; // Set a default distance, adjust as needed
        camera.position.set(cameraDistance, cameraDistance, cameraDistance);
        camera.lookAt(0, 0, 0); // Ensure camera looks at the center of the scene

        controls.minDistance = 4;
        controls.maxDistance = 60;
        controls.target.set(0, 0, 0); // Set the target to the center of the scene

        
        console.log("Model loaded successfully");
    },
    undefined,
    (error) => {
        console.error("An error happened while loading the model:", error);
    }
);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

