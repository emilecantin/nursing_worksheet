module.exports = function(sequelize, DataTypes) {
	var PatientsProfile = sequelize.define('PatientsProfile', {
		name: DataTypes.STRING,
		tree: DataTypes.TEXT
	});
	return PatientsProfile;
};
