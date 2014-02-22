"use strict";

var patientsProfile = require('./patients-profile');

// API routes
exports.api = {};
exports.api.workdayConf = require('./api/workday_conf');

/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.patientsProfile = patientsProfile;
