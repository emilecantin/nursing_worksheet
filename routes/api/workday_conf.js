var db = require('../../models');

/*
 * GET workday-conf
 */
exports.get = function(req, res) {
	db.WorkdayConf.find(req.params.id).success(function(workdayConf) {
		if (workdayConf) {
			res.send(workdayConf.tree);
		} else {
			res.send(404);
		}
	});


}
