var express = require('express');
var router = express.Router();
var sequelize = require('../models');
const { SubMenu } = sequelize.models;

const validateSubMenu = subMenuBody => {
  return (
    subMenuBody.label != undefined &&
    subMenuBody.price != undefined &&
    subMenuBody.menuId != undefined &&
    !isNaN(subMenuBody.price)
  )} 

/* GET all submenu List */
router.get('/', async function(req, res, next) {
  const submenus = await SubMenu.findAll();
  res.json(submenus);
});

// GET submenu by Id
router.get('/:subMenuId', async (req, res, next) => {
  const { subMenuId } = req.params;
  const subMenu = await SubMenu.findByPk(subMenuId);
  res.json(subMenu);
});

// GET submenu by label
router.get('/label/:label', async (req, res, next) => {
  const { label } = req.params;
  const subMenu = await SubMenu.findOne({
    where: { label }
  })
  res.json(subMenu);
});

// DELETE submenu by Id
router.delete('/:subMenuId', async (req, res, next) => {
  const { subMenuId } = req.params;
  const subMenu = await SubMenu.destroy({
    where: {id: subMenuId}
  });
  res.json(subMenu);
});

// POST create submenu
router.post('/', async (req, res, next) => {
  const subMenuBody = req.body;
  let responseBody = {}
  if (validateSubMenu(subMenuBody)) {
    responseBody.data = await SubMenu.create(subMenuBody);
    responseBody.status = "success";
  } else {
    responseBody.status = "error";
  }
  res.json(responseBody);
});


// PUT update submenu
router.put('/:subMenuId', async (req, res, next) => {
  const { subMenuId } = req.params;
  const subMenuBody = req.body;
  let responseBody = {}
  if (validateSubMenu(subMenuBody)) {
    await SubMenu.update(subMenuBody, {
      where: {id: subMenuId}
    });
    responseBody.status = "success";
  } else {
    responseBody.status = "error";
  }
  res.json(responseBody);
});

module.exports = router;
