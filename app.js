const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const validate = require('koa2-validation');
const Joi = require('joi');
const glob = require('glob');
const config = Object.assign(require(__dirname + '/config'), {
  root_dir: __dirname
});

const app = new Koa();
app.use(bodyParser());

const urlValidators = require(__dirname + '/services/url-validators');
const routerPathes = glob.sync(__dirname + '/routes/*.js');
routerPathes.forEach(path => {
  require(path)(app, Router, urlValidators);
});

const db = require(__dirname + '/models');
db.connect(app, config).then(() => {

  app.listen(3000, () => console.log('Server started 3000'));
}).catch(e => {
  console.log('Error while running app');
  console.log(e);
});
