import { Middleware } from '../types';

export const required: Middleware = (ctx, next) => {
  if (!ctx.user) ctx.throw(401, 'Unauthorized!');
  else next();
};
