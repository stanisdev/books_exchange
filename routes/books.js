/**
 * User router
 */
module.exports = (app, Router, urlValidators) => {

  const router = new Router({
    prefix: '/books'
  });

  /**
   * List of books
   */
  router.get('/', async (ctx) => {
    const books = await ctx.db.model('Book').find({}, 'title author description').exec();
    ctx.body = {
      success: true,
      data: books
    };
  });

  /**
   * Add new book
   */
  router.post('/add', urlValidators.book.add, async (ctx) => {
    var Book = ctx.db.model('Book');
    var data = await (new Book(ctx.request.body)).save();

    ctx.body = {
      success: true
    };
  });

  app.use(router.routes());
};
