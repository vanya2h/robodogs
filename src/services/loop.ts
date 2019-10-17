import { provide } from 'inversify-binding-decorators';
import * as THREE from 'three';
import { inject } from 'inversify';
import { MAIN_RENDERER, MAIN_CAMERA, MAIN_SCENE } from '~/consts';

export type SceneHandler = (scene: THREE.Scene) => THREE.Scene;

@provide(LoopService)
export class LoopService {
  private readonly sceneHandlers: SceneHandler[] = [];

  public constructor(
    @inject(MAIN_RENDERER) private readonly renderer: THREE.WebGLRenderer,
    @inject(MAIN_CAMERA) private readonly camera: THREE.PerspectiveCamera,
    @inject(MAIN_SCENE) private readonly scene: THREE.Scene,
  ) {}

  public run = () => {
    requestAnimationFrame(this.run);
    this.sceneHandlers.reduce((prev, curr) => curr(prev), this.scene);
    this.renderer.render(this.scene, this.camera);
  };

  public registerSceneHandler = (handler: SceneHandler): void => {
    this.sceneHandlers.push(handler);
  };
}
