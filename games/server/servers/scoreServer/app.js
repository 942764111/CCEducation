var cfg = require("../../config");
var config = cfg.scoreServer();

var db = require("../../utils/db");
db.init(cfg.mysql());

var us = require("./scoreServer");
us.start(config);