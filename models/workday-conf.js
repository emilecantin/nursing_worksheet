module.exports = function(sequelize, DataTypes) {
	var WorkdayConf = sequelize.define('WorkdayConf', {
		date: DataTypes.DATE,
		tree: DataTypes.TEXT
	});
	return WorkdayConf;
};
