/**
 * User router
 */
module.exports = (app, Router, urlValidators) => {

  const router = new Router({
    prefix: '/users'
  });

  /**
   * Find user by name
   */
  router.get('/:name', urlValidators.user.findByName, async (ctx) => {
    const name = ctx.params.name;
    const user = await ctx.db.model('User').findOne({
      name: name
    }, 'name password');

    ctx.body = {
      success: true,
      data: user
    };
  });

  /**
   * Add new user
   */
  router.post('/add', urlValidators.user.add, async (ctx) => {
    var User = ctx.db.model('User');
    var newUser = new User(ctx.request.body)

    try {
      await ctx.db.validateModel(newUser);
    } catch (e) {
      return ctx.body = {
        success: true,
        errors: e
      };
    }
    await newUser.save();

    ctx.body = {
      success: true,
      data: newUser
    };
  });

  app.use(router.routes());
};
