// set the scene size
var WIDTH = 800,
    HEIGHT = 600;

// set some camera attributes
var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

// Renderer
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(WIDTH, HEIGHT);

// Camera
var camera = new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);
camera.position.z = 300;

// Scene
var scene = new THREE.Scene();

// jQuery, append renderer to DOM
var $container = $('#container');
$container.append(renderer.domElement);

// Lighting
var pointLight = new THREE.PointLight(0xffffff);

pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// Attempt at using boxes
var geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
var torusKnot = new THREE.Mesh( geometry, material );

scene.add( torusKnot );
scene.add(camera);
scene.add(pointLight);

// Rendering
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}render();
