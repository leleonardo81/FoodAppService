var {Sequelize, DataTypes, UUIDV1 } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../db.sqlite3'
});

const Menu = sequelize.define('Menu', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV1,
    allowNull: false,
    primaryKey: true,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
  }
}, {
  timestamps: true,
})

const SubMenu = sequelize.define('SubMenu', {
  id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV1,
    allowNull: false,
    primaryKey: true,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  timestamps: true,
})

Menu.hasMany(SubMenu, {
  foreignKey: {name: 'menuId'}
});

sequelize.sync({alter: true});

module.exports = sequelize;
