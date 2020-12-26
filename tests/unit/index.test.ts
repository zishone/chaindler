import { afterEach, describe, it } from 'mocha';
import { Chain } from '../../src/index';
import { EventEmitter } from 'events';
import { createSandbox } from 'sinon';
import { expect } from 'chai';

describe('chain', () => {
  const sandbox = createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it('should call each middlewares and then the controller', async () => {
    const req = new EventEmitter();
    const middleware1 = (_: any, _1: any, next: any) => {
      next();
    };
    const middleware2 = (_: any, _1: any, next: any) => {
      next();
    };
    const middleware3 = (_: any, _1: any, next: any) => {
      next();
    };
    const controller = (_: any, _1: any, next: any) => {
      next();
    };

    const handler = new Chain(middleware1, middleware2, middleware3).handle(controller);
    await handler(req as any, {} as any, (err: any) => {
      expect(err).to.not.exist;
    });
  });

  it('should have error in callback when a middleware fails', async () => {
    const req = new EventEmitter();
    const middleware1 = (_: any, _1: any, next: any) => {
      next();
    };
    const middleware2 = (_: any, _1: any, next: any) => {
      next(new Error());
    };
    const middleware3 = (_: any, _1: any, next: any) => {
      next();
    };
    const controller = (_: any, _1: any, next: any) => {
      next();
    };

    const handler = new Chain(middleware1, middleware2, middleware3).handle(controller);
    await handler(req as any, {} as any, (err: any) => {
      expect(err).to.exist;
    });
  });

  it('should stop when request suddenly closes', async () => {
    const req = new EventEmitter();
    const middleware1 = (_: any, _1: any, next: any) => {
      next();
    };
    const middleware2 = (_: any, _1: any, next: any) => {
      req.emit('close');
      next();
    };
    const middleware3 = (_: any, _1: any, next: any) => {
      next();
    };
    const controller = (_: any, _1: any, next: any) => {
      next();
    };

    const handler = new Chain(middleware1, middleware2, middleware3).handle(controller);
    await handler(req as any, {} as any, (err: any) => {
      expect(err).to.not.exist;
    });
  });
});
