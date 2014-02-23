var db = require('../../models');


/*
 * GET workday-conf
 */
exports.get = function(req, res) {
	db.WorkdayConf.find(req.params.id).success(function(workdayConf) {
		if (workdayConf) {
			try {
				var patients = JSON.parse(workdayConf.patients_tree);
				var result = {
					date_begin: workdayConf.date_begin,
					date_end: workdayConf.date_end,
					patients: patients
				};
				res.send(result);
			} catch (e) {
				res.send(500);
			}
		} else {
			res.send(404);
		}
	});
};

/*
 * GET latest workday-conf
 */
exports.getLatest = function(req, res) {
	db.WorkdayConf.find({order: [['id', 'DESC']]}).success(function(workdayConf) {
		if (workdayConf) {
			try {
				var patients = JSON.parse(workdayConf.patients_tree);
				var result = {
					date_begin: workdayConf.date_begin,
					date_end: workdayConf.date_end,
					patients: patients
				};
				res.send(result);
			} catch (e) {
				res.send(500);
			}
		} else {
			res.send(404);
		}
	});
};

exports.create = function(req, res) {
	db.WorkdayConf.create({
		date_start: req.body.date_start,
		date_end: req.body.date_end,
		patients_tree: JSON.stringify(req.body.patients)
	}).success(function(workdayConf) {
		res.send(204);
	})
};
