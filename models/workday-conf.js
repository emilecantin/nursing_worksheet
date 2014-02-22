module.exports = function(sequelize, DataTypes) {
	var WorkdayConf = sequelize.define('WorkdayConf', {
		date_begin: DataTypes.DATE,
		date_end: DataTypes.DATE,
		patients_tree: DataTypes.TEXT
	});
	return WorkdayConf;
};
