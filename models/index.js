const mongoose = require('mongoose');
const glob = require('glob');

/**
 * Connect to MongoDB
 */
module.exports.connect = (app, config) => {
  return new Promise((resolve, reject) => {

    mongoose.Promise = require('bluebird');
    mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`, {
      useMongoClient: true,
      promiseLibrary: require('bluebird')
    }).then(() => {

      const modelPathes = glob.sync(config.root_dir + '/models/*.js').filter(path => !path.endsWith('index.js') );
      modelPathes.forEach(path => {
        require(path)(mongoose);
      });
      mongoose.validateModel = (modelExemplar) => {
        return new Promise(function(resolveValidate, rejectValidate) {

          modelExemplar.validate(output => {
            if (!(output instanceof Object)) {
              return resolveValidate();
            }
            var errors = [];
            for (let key in output.errors) {
               let element = {};
               element[key] = output.errors[key].message;
               errors.push(element);
            }
            rejectValidate(errors);
          });
        });
      };
      app.context.db = mongoose; // Link to mongoose

      resolve();
    }).catch(e => {
      console.log('Error while DB connecting');
      reject(e);
    });
  });
};
