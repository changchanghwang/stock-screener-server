import { unauthorized } from '@hapi/boom';
import { Middleware } from 'koa';
import type Container from 'typedi';
import { decodeUserToken } from '../libs';
// import { UserRepository } from '../services/user/infrastructure/repository';

export const authHandlerMiddleware: Middleware = async (ctx, next) => {
  const { context } = ctx.state as { context: Container };
  const bearerToken = ctx.get('Authorization');
  if (!bearerToken) {
    throw unauthorized(`There is no token`);
  }

  const [tokenType, token] = bearerToken.split(' ');
  if (tokenType !== 'Bearer') {
    throw unauthorized(`Token type is not Bearer`);
  }

  const decoded = decodeUserToken(token);
  if (typeof decoded === 'string' || decoded === null) {
    throw unauthorized(`Invalid token`);
  }

  const { id } = decoded;

  //   const userRepository = context.get(UserRepository);
  //   const user = await userRepository.findOneOrFail(id);

  //   ctx.state.user = user;
  await next();
};
