import { Router } from '../types';
import { required } from '../middleware/auth';

const router = new Router({ prefix: '/users' });

router.get('getAllUsers', '/', async ctx => {
  ctx.body = await ctx.db.user.findMany();
});
router.get('currentUser', '/me', required, async ctx => {
  ctx.body = await ctx.db.user.findOne({ where: { id: ctx.state.user!.id } });
});
router.get('getUser', '/:id', async ctx => {
  ctx.body = await ctx.db.user.findOne({ where: { id: ctx.params.id } });
});

export default router;
