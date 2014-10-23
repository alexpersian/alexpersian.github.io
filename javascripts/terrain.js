/**
 * Created by alexpersian on 10/20/14.
 */

$(document).ready(function() {

    var width, height, camera, controls, light, scene, renderer;
    var plane, geometry, material, texture;
    var meshWidth, meshHeight;

    function init() {
        width = 1400;
        height = 700;

        meshWidth = 20;
        meshHeight = 20;

        // Scene
        scene = new THREE.Scene();

        // Camera
        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
        camera.position.z = 800;

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
        geometry = new THREE.PlaneGeometry(1200, 1200, meshWidth, meshHeight);
        texture = new THREE.ImageUtils.loadTexture("images/terrain-texture.png");
        material = new THREE.MeshBasicMaterial({
            //wireframe: true,
            map: texture
        });
        plane = new THREE.Mesh(geometry, material);

        scene.add(plane);

        // Renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(0xffffff);
        renderer.shadowMapEnabled = true;

        var $container = $('#container');
        $container.append(renderer.domElement);

        draw_terrain();
        render();
        //animate();


    }init();

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    //function animate() {
    //    requestAnimationFrame(animate);
    //    renderer.render(scene, camera);
    //    controls.update();
    //}

    function draw_terrain() {
        var j = geometry.vertices.length;
        for (var i = 0; i < j; i++) {
            geometry.vertices[i].z = (Math.pow((Math.random() + 0.1), -1)) * 10;
        }
    }

    function findIndex(x, y, m) {
        return x * m + y;
    }

});