var fs        = require('fs')
var path      = require('path')
var Sequelize = require('sequelize')
var lodash    = require('lodash')

var config = {
	host: process.env.OPENSHIFT_POSTGRESQL_DB_HOST || 'localhost',
	db: process.env.PGDATABASE || 'nursing_worksheet',
	username: process.env.OPENSHIFT_POSTGRESQL_DB_USERNAME || 'nursing_worksheet',
	password: process.env.OPENSHIFT_POSTGRESQL_DB_PASSWORD || 'nursing_worksheet'
};




var sequelize = new Sequelize(config.db, config.username, config.password, {
	host: config.host,
	// gimme postgres, please!
	dialect: 'postgres'
})
var db        = {}
fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    console.log(file);
    db[model.name] = model
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
});

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);
