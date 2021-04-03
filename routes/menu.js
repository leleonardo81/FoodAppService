var express = require('express');
var router = express.Router();
var sequelize = require('../models');
const {Menu, SubMenu} = sequelize.models;

const defaultOption = {include: [SubMenu]}

const validateMenu = menuBody => {
  return (
    menuBody.label != undefined &&
    menuBody.price != undefined &&
    !isNaN(menuBody.price)
  )} 

/* GET all menu List */
router.get('/', async function(req, res, next) {
  const menus = await Menu.findAll(defaultOption);
  res.json(menus);
});

// GET menu by Id
router.get('/:menuId', async (req, res, next) => {
  const { menuId } = req.params;
  const menu = await Menu.findByPk(menuId, defaultOption);
  res.json(menu);
});

// GET menu by label
router.get('/label/:label', async (req, res, next) => {
  const { label } = req.params;
  const menu = await Menu.findOne({
    where: { label }
  })
  res.json(menu);
});

// DELETE menu by Id
router.delete('/:menuId', async (req, res, next) => {
  const { menuId } = req.params;
  const menu = await Menu.destroy({
    where: {id: menuId}
  });
  res.json(menu);
});

// POST new Menu
router.post('/', async (req, res, next) => {
  const menuBody = req.body;
  let responseBody = {}
  if (validateMenu(menuBody)) {
    responseBody.data = await Menu.create(menuBody);
    responseBody.status = "success"
  } else {
    responseBody.status = "error"
  }
  res.json(responseBody);
});

// PUT update menu
router.put('/:menuId', async (req, res, next) => {
  const { menuId } = req.params;
  const menuBody = req.body;
  let responseBody = {}
  if (validateMenu(menuBody)) {
    await Menu.update(menuBody, {
      where: {id: menuId}
    });
    responseBody.status = "success"
  } else {
    responseBody.status = "error"
  }
  res.json(responseBody);
});

module.exports = router;
