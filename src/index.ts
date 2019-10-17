import 'reflect-metadata';
import * as THREE from 'three';
import { run } from '~/runtime';
import { LoopService } from './services/loop';
import { ControlsService } from './services/controls';
import { MAIN_SCENE, MAIN_RENDERER } from './consts';

const container = run();

const controls = container.get(ControlsService);
controls.registerHandlers();

const geometry = new THREE.BoxGeometry(1, 2, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
const scene = container.get<THREE.Scene>(MAIN_SCENE);

const renderer = container.get<THREE.Renderer>(MAIN_RENDERER);
renderer.setSize(window.innerWidth, window.innerHeight);

const loop = container.get(LoopService);
loop.run();

scene.add(cube);

loop.registerSceneHandler(localScene => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  return localScene;
});
