var express = require('express');
var router = express.Router();
var sequelize = require('../models');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const menu = await sequelize.models.Menu.findAll();
  console.log("All users:", JSON.stringify(menu, null, 2));
  res.json(menu);
});

module.exports = router;
