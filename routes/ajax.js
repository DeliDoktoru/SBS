var express = require('express');
var router = express.Router();
const db= require('../selfContent/database');

router.post('/changeLanguage', async function(req, res, next) {
  req.session.language = req.body.language;
  res.send({});
});

module.exports = router;
