import koa, { Middleware as KoaMiddleware } from 'koa';
import KoaRouter from '@koa/router';
import { PrismaClient } from '@prisma/client';

export interface UserToken {
  id: number;
  username: string;
}

export interface AppState extends koa.DefaultState {}

export interface AppContext extends koa.DefaultContext {
  db: PrismaClient;
  user?: UserToken;
}

export type Middleware = KoaMiddleware<AppState, AppContext>;
export class Router extends KoaRouter<AppState, AppContext> {}
