var express = require('express');
var router = express.Router();

/* GET angular application page. */
router.get('/', function (req, res) {
    res.redirect('app/index.html');
});

module.exports = router;
