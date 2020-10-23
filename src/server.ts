import Koa from 'koa';
import koaJwt from 'koa-jwt';
import cors from '@koa/cors';
import { PrismaClient } from '@prisma/client';
import { AppContext, AppState } from './types';
import { jwt } from './constants';
import * as routes from './routes';

const app = new Koa<AppState, AppContext>();
app.use(cors({}));
app.use(koaJwt({ secret: jwt.secret, passthrough: true }));
app.use((ctx, next) => {
  ctx.db = new PrismaClient();
  return next();
});

for (let router of Object.values(routes)) {
  app.use(router.routes()).use(router.allowedMethods());
}
export default app;
