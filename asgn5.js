import * as THREE from './js/three.js';
import {GUI} from './js/dat.gui.module.js';
import {OrbitControls} from './js/OrbitControls.js';

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    const loader = new THREE.TextureLoader();

    const fov = 100;
    const aspect = canvas.height / canvas.width;
    const near = 0.01;
    const far = 10;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // camera.position.z = 2;
    camera.position.set(0, 10, 20);

    const scene = new THREE.Scene();

    let cubes = [];
    let texturedCubes = [];

    function updateCamera()
    {
        camera.updateProjectionMatrix();
    }

    function makeCubeInstance(geometry, color, x)
    {
        const material = new THREE.MeshPhongMaterial({color});

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;
        cube.position.y = 1.5;

        return cube;
    }

    function makeTexturedCubeInstance(geometry, x)
    {
        const texture = new THREE.MeshBasicMaterial({
            map: loader.load('textures/stone.jpg')
        });
        const cube = new THREE.Mesh(geometry, texture);
        scene.add(cube);

        cube.position.x = x;
        // cube.position.y = 3;

        return cube;
    }

    function resizeRendererToDisplaySize(renderer)
    {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;

        if (needResize)
        {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time)
    {
        time *= 0.001;

        if(resizeRendererToDisplaySize(renderer))
        {
            console.log("resizing");
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientHeight / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        // texturedCubes.forEach((cube, ndx) => {
        //     const speed = 1 + ndx * 0.1;
        //     const rot = time * speed;
        //     cube.rotation.x = rot;
        //     cube.rotation.y = rot;
        // });

        // cubes.forEach((cube, ndx) => {
        //     const speed = 1 + ndx * 0.1;
        //     const rot = time * speed;
        //     cube.rotation.x = rot;
        //     cube.rotation.y = rot;
        // });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    // defines and adds directional lighting
    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const material = new THREE.MeshPhongMaterial({color: 0x44aa88}); //greenish blue

    cubes = [
        makeCubeInstance(geometry, 0x44aa88, 0),
        makeCubeInstance(geometry, 0x8844aa, -2),
        makeCubeInstance(geometry, 0xaa8844, 2)
    ];

    texturedCubes.push(makeTexturedCubeInstance(geometry, 0));
    texturedCubes.push(makeTexturedCubeInstance(geometry, -2));
    texturedCubes.push(makeTexturedCubeInstance(geometry, 2));

    requestAnimationFrame(render);
}



// main();