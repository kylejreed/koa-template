import { compare } from 'bcrypt';
import { Router } from '../types';
import { sign } from 'jsonwebtoken';
import { jwt } from '../constants';

const router = new Router({ prefix: '/' });

router.post('login', '/login', async ctx => {
  const { username, password } = ctx.request.body;
  const user = await ctx.state.db.user.findOne({ where: { username } });
  if (!user) ctx.throw('User not found');
  else if (!(await compare(password, user.password))) ctx.throw('Invalid Credentials');
  else {
    ctx.body = {
      token: sign({ id: user.id, username: user.username }, jwt.secret),
      user
    };
  }
});

router.post('register', '/register', async ctx => {
  const { username, password } = ctx.request.body;
  const user = await ctx.state.db.user.create({ data: { username, password } });
  ctx.body = {
    token: sign({ id: user.id, username: user.username }, jwt.secret),
    user
  };
});

export default router;
