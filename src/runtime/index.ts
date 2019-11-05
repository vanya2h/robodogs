import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';

export const run = () => {
  const container = new Container({
    defaultScope: 'Singleton',
  });

  container.load(buildProviderModule());

  return container;
};
