var express = require('express');
var router = express.Router();
const getDb = require("../models/db").getDb;
console.log("in index");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
