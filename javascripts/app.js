// set the scene size
var WIDTH = 400,
	HEIGHT = 300;

// set some camera attributes
var VIEW_ANGLE = 45,
	ASPECT = WIDTH / HEIGHT,
	NEAR = 0.1,
	FAR = 10000;

// get the DOM element to attach to
// - assume we have jQuery to hand
var $container = $('#container');

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(
	VIEW_ANGLE, 
	ASPECT, 
	NEAR, 
	FAR);

var scene = new THREE.Scene();

// add the camera to the scene
scene.add(camera);

// the camera starts at 0, 0, 0
// set it back further
camera.position.z = 300;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
$container.append(renderer.domElement);

// set up the sphere vars
var radius = 50,
	segments = 16,
	rings = 16;

// create a new mesh with sphere
// geometry - sphereMaterial will
// be covered next
var sphere = new THREE.Mesh(
	new THREE.SphereGeometry(
		radius, 
		segments, 
		rings),
	sphereMaterial);

// add the sphere to the scene
scene.add(sphere);

// create the sphere's material
var sphereMaterial = 
	new THREE.MeshLambertMaterial(
	{
		color: 0x000000
	});

// create a point light
var pointLight =
	new THREE.PointLight(0xffffff);

// set the light's position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add the light to the scene
scene.add(pointLight);

// draw it!
renderer.render(scene, camera);
