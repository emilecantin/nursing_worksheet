module.exports = function(sequelize, DataTypes) {
	var WorkdayConf = sequelize.define('WorkdayConf', {
		date_begin: DataTypes.STRING,
		date_end: DataTypes.STRING,
		patients_tree: DataTypes.TEXT
	});
	return WorkdayConf;
};
