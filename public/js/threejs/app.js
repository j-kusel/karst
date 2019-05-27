import Node from './Node.js';

var canv = document.getElementById('myCanvas');
canv.addEventListener('mousemove', onMouseover);
canv.addEventListener('click', onClick);

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
light1.position.set(0,0, 8);
scene.add(light);
scene.add(light1);

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(-1,-1);
var gridHelper = new THREE.GridHelper(10, 10);

/*var geometry = new THREE.OctahedronGeometry(1, 0);
var material = new THREE.MeshStandardMaterial({
    color: 0xF3FFE2,
    metalness: 0.3
});
*/


var objects = [];

axios.get('/api/dates')
    .then((res) => {
        var beginning = moment(res.data.dates[0].Date).unix();
        var span = moment(res.data.dates[res.data.dates.length-1].Date).unix()
            - beginning;
        objects = res.data.dates.map((date, index) => new Node(date.Date, 
            { x: (moment(date.Date).unix() - beginning)/span*10, y:0, z:0 }, date));
        objects.forEach((obj) => {
            scene.add(obj.mesh);
            scene.add(obj.menuGroup);
        });
    })
    .catch(err => console.log(err));


//var mesh2 = new THREE.Mesh(geometry, material);
//mesh.position.set(0, 0, 0);
//mesh2.position.set(5, 0, 0);


//scene.add(mesh2);
camera.position.y = 1.0;
camera.position.z = 10.0;
camera.lookAt(0, 0, 0);
scene.add(gridHelper);

var hovers = [];

requestAnimationFrame(render);

function onMouseover(event) {
    // normalize mouse coordinates from -1 to 1:
    var rect = canv.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / canv.width) * 4 - 1
    mouse.y = ((event.clientY - rect.top) / canv.height) * -4 + 1
}

function onClick(event) {
    //hovers.forEach((node) => node.onClick());
    objects.forEach((obj) => console.log(obj.menus[0].init()));
}


function easing(x, target, rate) {
    const THRESHOLD = 0.05;
    if (Math.abs(x-target) > THRESHOLD) {
        //console.log(x);
        return x+x*(target-x)*rate;
    }
    else{
        return target;
    }
}

function updateCamera() {
    const elapsedTime = clock.getElapsedTime();
    camera.position.x = Math.sin(elapsedTime*0.1)*2.0
    camera.position.y = Math.sin(elapsedTime*0.1) + 1;

    // parallax
    camera.position.x += (mouse.x * 1.6);
    camera.position.y += (mouse.y * 1.2);
    camera.lookAt(0,0,0);
}

function updateObjects() {
    raycaster.setFromCamera(mouse, camera);
    hovers = [];
    objects.forEach((obj) => {
        obj.mesh.rotation.y += 0.01;
        var intersects = raycaster.intersectObject(obj.mesh);
        if (intersects.length) {
            hovers.push(obj);
            // menus fade
            //obj.menus.forEach((menu) => menu.fade('in'));
            var x = intersects[0].object.scale;
            x.set(1, easing(x.y, 2, 0.05), 1);
        } else {
            obj.mesh.scale.set(0.1, easing(obj.mesh.scale.y, 1, 0.1), 1);

            // menus fade
            //obj.menus.forEach((menu) => menu.fade('out'));
        }

        obj.menus.forEach((menu) => menu.update(camera));
    });
}

function render() {
    updateCamera();
    updateObjects();

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

export default scene;

