import { Application, Renderer } from "pixi.js";
import { provide } from "inversify-binding-decorators";
import { throttle } from 'throttle-debounce';
import { inject, optional } from "inversify";
import { APP_NODE, INJECTED_PIXI_APP } from "~/consts";

@provide(PixiApp)
export class PixiApp {
	private readonly _app: Application;

	public get app(): Application {
		return this._app;
	}

	private readonly resizeHandler = throttle(66, () => {
		this.app.renderer.resize(window.innerWidth, window.innerHeight);
});

	public constructor(
		@inject(APP_NODE) private readonly appNode: HTMLElement, 
		@optional() @inject(INJECTED_PIXI_APP) injectedApp?: Application,
	) {
		this._app = injectedApp || new Application({
			width: window.innerWidth,
			height: window.innerHeight,
			backgroundColor: 0x1099bb,
			autoDensity: true,
			autoStart: false,
			resolution: window.devicePixelRatio,
		})
	}

	public start = () => {
		this.appNode.appendChild(this._app.view);
		this._app.start();

		this.bindResize();
	}

	private bindResize = () => {
		window.addEventListener("resize", this.resizeHandler);
	}

	public get width() {
		return this._app.renderer.width;
	}

	public get height() {
		return this._app.renderer.height;
	}
}

