import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const h = window.innerHeight;
const w = window.innerWidth;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 10);
camera.position.z = 5;
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
controls.enableZoom = true;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);

// Use a light-reactive material
const material = new THREE.MeshLambertMaterial({ color: 0x00ff11,flatShading: true }); 

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Wireframe mesh for edges
const wireMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
const wireCube = new THREE.Mesh(geometry, wireMaterial);
// Slightly scale up to avoid z-fighting
wireCube.scale.set(1.01, 1.01, 1.01); 
scene.add(wireCube);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0x00ff11, 1);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

function animate() {
  requestAnimationFrame(animate);
  // If you want rotation:
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  wireCube.rotation.x = cube.rotation.x;
  wireCube.rotation.y = cube.rotation.y;
  controls.update();
  renderer.render(scene, camera);
}
animate();
