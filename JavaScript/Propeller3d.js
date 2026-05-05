const container = document.getElementById('propeller-3d-model');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

let pivot;
const loader = new THREE.GLTFLoader();

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let isAutoRotating = true; 
let resumeTimer;

const targetRotationX = Math.PI / 2;
const targetRotationY = Math.PI / 4;

function init3DModel(bladeCount) {
    if (pivot) scene.remove(pivot);
    isAutoRotating = true;

    let fileName = '3D/prop_' + bladeCount + '.glb';

    loader.load(fileName, function (gltf) {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        model.position.set(-center.x, -center.y, -center.z);

        pivot = new THREE.Group();
        scene.add(pivot);
        pivot.add(model);

        if (bladeCount === 4 || bladeCount === 6) {
            model.rotation.x = Math.PI / 2;
        }
        
        pivot.rotation.x = targetRotationX; 
        pivot.rotation.y = targetRotationY; 

        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = 3.5 / maxDim;
        pivot.scale.set(scaleFactor, scaleFactor, scaleFactor);

        camera.position.z = 6; 
    }, undefined, function (error) {
        console.error('File missing: ' + fileName);
    });
}


container.addEventListener('wheel', (event) => {
    event.preventDefault();
    const zoomSpeed = 0.5;
    if (event.deltaY < 0) {
        if (camera.position.z > 2) camera.position.z -= zoomSpeed;
    } else {
        if (camera.position.z < 20) camera.position.z += zoomSpeed;
    }
    isAutoRotating = false;
    resetResumeTimer();
}, { passive: false });

container.addEventListener('mousedown', (e) => {
    isDragging = true;
    isAutoRotating = false;
    clearTimeout(resumeTimer);
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    resetResumeTimer();
});

container.addEventListener('mousemove', (e) => {
    if (isDragging && pivot) {
        const deltaMove = {
            x: e.offsetX - previousMousePosition.x,
            y: e.offsetY - previousMousePosition.y
        };

        pivot.rotation.y += deltaMove.x * 0.01;
        pivot.rotation.x += deltaMove.y * 0.01;
    }
    previousMousePosition = { x: e.offsetX, y: e.offsetY };
});

function resetResumeTimer() {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
        isAutoRotating = true;
    }, 2000); 
}

function animate() {
    requestAnimationFrame(animate);
    
    if (pivot) {

        if (isAutoRotating) {
            pivot.rotation.z += 0.01; 


            pivot.rotation.x += (targetRotationX - pivot.rotation.x) * 0.05;
            pivot.rotation.y += (targetRotationY - pivot.rotation.y) * 0.05;
        }
    }
    
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});