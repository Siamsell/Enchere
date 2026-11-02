const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../controllers/db_controller");
  const Annonce = require("./Annonce")
  const Media = sequelize.define('Media', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_annonce: { type: DataTypes.INTEGER },
    path: { type: DataTypes.TEXT },
    image: { type: DataTypes.BOOLEAN }
  }, {
    tableName: 'Media',
    timestamps: false
  });


  

  module.exports = Media;