var express = require('express');
var router = express.Router();
console.log("in user");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource 1234');
});

module.exports = router;
