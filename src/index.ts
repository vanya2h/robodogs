/* eslint-disable global-require */
import 'reflect-metadata';
import * as THREE from 'three';
import { run } from '~/runtime';
import { LoopService } from './services/loop';
import { ControlsService } from './services/controls';
import { MAIN_SCENE, MAIN_RENDERER } from './consts';

const container = run();

const controls = container.get(ControlsService);
controls.registerHandlers();

const scene = container.get<THREE.Scene>(MAIN_SCENE);

const renderer = container.get<THREE.WebGLRenderer>(MAIN_RENDERER);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.gammaInput = true;
renderer.gammaOutput = true;

const light = new THREE.DirectionalLight(0xaabbff, 0.3);
light.position.x = 300;
light.position.y = 250;
light.position.z = -500;
scene.add(light);

const uniforms = {
  topColor: { value: new THREE.Color(0x0077ff) },
  bottomColor: { value: new THREE.Color(0xffffff) },
  offset: { value: 400 },
  exponent: { value: 0.6 },
};

uniforms.topColor.value.copy(light.color);

const skyGeo = new THREE.SphereBufferGeometry(4000, 32, 15);
const skyMat = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: require('./vert.glsl').default,
  fragmentShader: require('./frag.glsl').default,
  side: THREE.BackSide,
});
const sky = new THREE.Mesh(skyGeo, skyMat);

scene.add(sky);

const loop = container.get(LoopService);
loop.run();

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 2, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
);

scene.add(cube);

loop.registerSceneHandler(localScene => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  return localScene;
});
