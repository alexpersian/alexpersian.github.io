/**
 * Created by alexpersian on 10/20/14.
 */

$(document).ready(function() {

    var width, height, camera, controls, light, scene, renderer;
    var plane, geometry, material, texture;
    var meshWidth, meshHeight;

    function init() {
        width = window.innerWidth - 16;
        height = window.innerHeight - 16;

        meshWidth = 20;
        meshHeight = 20;

        // Scene
        scene = new THREE.Scene();

        // Camera
        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100000);
        camera.position.set(0, 0, 3000);

        // Controls
        controls = new THREE.OrbitControls(camera);
        controls.damping = 0.2;
        controls.addEventListener('change', render);

        // Lighting
        light = new THREE.AmbientLight(0xffffff, 0.5);
        //light.castShadow = true;
        //light.shadowCameraVisible = true;
        //light.position.set(-60, 20, 100);

        // Plane geometry
        geometry = new THREE.PlaneGeometry(10000, 10000, meshWidth, meshHeight);
        texture = new THREE.ImageUtils.loadTexture("../images/terrain-texture.png");
        material = new THREE.MeshBasicMaterial({
            //wireframe: true,
            map: texture
        });
        plane = new THREE.Mesh(geometry, material);

        scene.add(plane);
        scene.fog = new THREE.FogExp2(0x9CDBFF, 0.0001);

        // Renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(0x9CDBFF);
        renderer.shadowMapEnabled = true;

        var $container = $('#container');
        $container.append(renderer.domElement);

    }init();

    function render() {
        draw_terrain();
        renderer.render(scene, camera);
    }

    function draw_terrain() {
        var j = geometry.vertices.length;
        for (var i = 0; i < j; i++) {
            geometry.vertices[i].z = Math.floor(
                3 * (Math.sin(Math.random())) *
                4 * (Math.sin(Math.random())) * 70);
            
            //geometry.vertices[i].z = (Math.pow((Math.random() + 0.1), -1)) * 10;
            //geometry.vertices[findIndex()] = (Math.seedrandom(i));
        }
    }

    //function randomize(rows, amplitude) {
    //    for (var i = 0; i < rows; i++) {
    //        Math.seedrandom(i);
    //
    //    }
    //}

    function findIndex(x, y, m) {
        return x * m + y;
    }

    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame     ||
            window.webkitRequestAnimationFrame  ||
                window.mozRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                };

    })();

    (function animLoop() {
        requestAnimationFrame(animLoop);
        render();
    })();

});
