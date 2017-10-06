const validate = require('koa2-validation');
const Joi = require('joi');

/**
 * Url validators
 */
module.exports = {

  user: {
    findByName: validate({
      params: {
        name: Joi.string().required()
      }
    }),

    add: validate({
      body: {
        name: Joi.string().required()
      },
    }),
  },

  book: {
    add: validate({
      body: {
        title: Joi.string().required(),
        author: Joi.string().required(),
        description: Joi.string().required()
      }
    })
  }

};
