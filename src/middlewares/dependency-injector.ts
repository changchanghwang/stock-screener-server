import { Container } from 'typedi';
import type { Context as KoaContext } from 'koa';

export const dependencyInjectorMiddleware = async (ctx: KoaContext, next: () => Promise<any>) => {
  const { txId } = ctx.state;
  let context;

  try {
    context = Container.of(txId);
    ctx.state.context = context;

    await next();
  } finally {
    Container.reset(txId);
  }
};
