import { ContainerModule } from 'inversify';
import * as THREE from 'three';
import { MAIN_CAMERA, MAIN_SCENE, MAIN_RENDERER } from '~/consts';

export const threeModule = new ContainerModule(bind => {
  const scene = new THREE.Scene();
  bind(MAIN_SCENE).toConstantValue(scene);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  bind(MAIN_CAMERA).toConstantValue(camera);

  const renderer = new THREE.WebGLRenderer();
  document.body.appendChild(renderer.domElement);
  bind(MAIN_RENDERER).toConstantValue(renderer);
});
