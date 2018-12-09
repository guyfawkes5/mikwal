import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
OBJLoader(THREE);

class IrelandChart {
    scene;
    camera;
    renderer;
    loader = new THREE.ObjectLoader();

    constructor(el, onReady, onLoadingProgress) {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 1000);
        this.camera.position.z = 75;
        this.scene.add(this.camera);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(-0.3, 0, 1);
        this.scene.add(directionalLight);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(el.offsetWidth, el.offsetHeight);

        const rendererElement = this.renderer.domElement;
        rendererElement.className = 'fill-block';
        el.appendChild(rendererElement);

        const animate = () => {
            this.renderer.render(this.scene, this.camera);
            this.scene.children.find(obj => obj.name === 'ireland').rotation.y += 0.01;
            requestAnimationFrame(animate);
        };

        this.loader.load('ireland.json', ireland => {
            ireland.name = 'ireland';

            this.scene.children
                .filter(obj => obj.isDirectionalLight)
                .forEach(light => light.target = ireland);

            this.scene.add(ireland);

            onReady();
            animate();
        }, progressEvent => onLoadingProgress(progressEvent.loaded / progressEvent.total * 100));
    }

    resize(width, height) {
        this.renderer.setSize(width, height);
        this.camera.aspect = (width / height);
        this.camera.updateProjectionMatrix();
    }

    censusData(img) {
    }
}

export default IrelandChart;