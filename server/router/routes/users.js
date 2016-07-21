var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    success: true,
    user: {
      firstName: "Apollo",
      lastName: "Creed",
      age: 34
    }
  });
});

module.exports = router;
