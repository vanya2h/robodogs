import { provide } from 'inversify-binding-decorators';
import * as THREE from 'three';
import { inject } from 'inversify';
import { observable, set } from 'mobx';
import { LoopService } from '~/services/loop';
import { MAIN_CAMERA } from '~/consts';

export interface INavigationState {
  left: boolean;
  top: boolean;
  right: boolean;
  bottom: boolean;
}

export interface IControlsServiceState {
  navigation: INavigationState;
}

@provide(ControlsService)
export class ControlsService {
  @observable
  public readonly state: IControlsServiceState = {
    navigation: {
      left: false,
      top: false,
      right: false,
      bottom: false,
    },
  };

  public constructor(
    @inject(MAIN_CAMERA) private readonly camera: THREE.PerspectiveCamera,
    private readonly loopService: LoopService,
  ) {}

  public registerHandlers = () => {
    document.addEventListener('keydown', e => {
      switch (e.keyCode) {
        case 37: {
          set(this.state.navigation, { left: true });
          break;
        }
        case 38: {
          set(this.state.navigation, { top: true });
          break;
        }
        case 39: {
          set(this.state.navigation, { right: true });
          break;
        }
        case 40: {
          set(this.state.navigation, { bottom: true });
          break;
        }
        default: {
          break;
        }
      }
    });

    document.addEventListener('keyup', e => {
      switch (e.keyCode) {
        case 37: {
          set(this.state.navigation, { left: false });
          break;
        }
        case 38: {
          set(this.state.navigation, { top: false });
          break;
        }
        case 39: {
          set(this.state.navigation, { right: false });
          break;
        }
        case 40: {
          set(this.state.navigation, { bottom: false });
          break;
        }
        default: {
          break;
        }
      }
    });

    this.loopService.registerSceneHandler(scene => {
      if (this.state.navigation.left) {
        scene.translateX(-0.1);
      }
      if (this.state.navigation.right) {
        scene.translateX(0.1);
      }
      if (this.state.navigation.bottom) {
        scene.translateY(-0.1);
      }
      if (this.state.navigation.top) {
        scene.translateY(0.1);
      }
      return scene;
    });
  };
}
