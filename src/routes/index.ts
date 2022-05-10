import * as Router from 'koa-joi-router';
// import { bindRoutesWithApiDocs } from '../libs';

export const globalRouter = Router();

globalRouter.get('/ping', async (ctx) => {
  ctx.body = 'pong';
});
