import 'reflect-metadata';
import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import { dbConnect } from './config/db';
import { globalRouter } from './routes';
import { errorHandlerMiddleware, dependencyInjectorMiddleware } from './middlewares/';
import 'dotenv/config';

const port = process.env.PORT;

(async () => {
  dbConnect();
  const app = new Koa();
  app.use(errorHandlerMiddleware);
  app.use(dependencyInjectorMiddleware);
  app.use(koaBody());
  app.use(globalRouter.middleware());
  app.listen(port, () => console.log('hello'));
})();
