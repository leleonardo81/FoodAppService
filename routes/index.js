var express = require('express');
var router = express.Router();
var sequelize = require('../models');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var model = await sequelize.models.Menu.create({
    label: "Menu 1",
    price: 14000,
    description: "hahahaha"
  }, {isNewRecord: true});

  console.log(model)
  res.json({message: "Hello"});
});

module.exports = router;
