import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import { threeModule } from './modules/three';

export const run = () => {
  const container = new Container({
    defaultScope: 'Singleton',
  });

  container.load(threeModule, buildProviderModule());

  return container;
};
