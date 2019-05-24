var canv = document.getElementById('myCanvas');
canv.addEventListener('mousemove', onMouseover);

var renderer = new THREE.WebGLRenderer({
    canvas: canv,
    antialias: true
});

renderer.setClearColor(0x00ff00);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100);

var clock = new THREE.Clock();

var scene = new THREE.Scene();

var light = new THREE.AmbientLight(0xffffff, 0.5);
var light1 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light);
scene.add(light1);

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var gridHelper = new THREE.GridHelper(10, 10);

var geometry = new THREE.OctahedronGeometry(1, 0);
var material = new THREE.MeshStandardMaterial({
    color: 0xF3FFE2,
    metalness: 0.3
});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);

scene.add(mesh);
camera.position.y = 1.0;
camera.position.z = 10.0;
camera.lookAt(mesh.position);
scene.add(gridHelper);

requestAnimationFrame(render);

function onMouseover(event) {
    // normalize mouse coordinates from -1 to 1:
    var rect = canv.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / canv.width) * 2 - 1
    mouse.y = ((event.clientY - rect.top) / canv.height) * -2 + 1
    console.log(mouse);
}

function render() {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    const elapsedTime = clock.getElapsedTime();
    camera.position.x = Math.sin(elapsedTime*0.1)*2.0;
    camera.lookAt(mesh.position);

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects([mesh]);
    intersects.forEach((intersect) => {
        intersect.object.scale.set(1, 2, 1);
    });
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

export default scene;

