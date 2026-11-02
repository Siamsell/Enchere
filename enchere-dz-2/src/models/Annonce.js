const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../controllers/db_controller");
const Media = require("../models/Media")
const User = require("../models/User")
const Annonce = sequelize.define('Annonce', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id:{type:DataTypes.INTEGER},
    telephone: { type: DataTypes.INTEGER },
    vues: { type: DataTypes.INTEGER },
    date_debut: { type: DataTypes.DATE },
    date_fin: { type: DataTypes.DATE },
    prix: { type: DataTypes.TEXT },
    titre: { type: DataTypes.TEXT },
    description: { type: DataTypes.TEXT },
    wilaya: { type: DataTypes.TEXT },
    commune: { type: DataTypes.TEXT },
    status:{type:DataTypes.ENUM("attente","refuse","accepte"),defaultValue:"attente"},
    whatsapp:{type:DataTypes.BOOLEAN ,defaultValue:false},
    telegram:{type:DataTypes.BOOLEAN ,defaultValue:false},
    viber:{type:DataTypes.BOOLEAN ,defaultValue:false},
    place_verification: { type: DataTypes.TEXT },
    place_vendre: { type: DataTypes.TEXT }
  }, {
    tableName: 'Annonces',
    timestamps: false
  });

Annonce.hasMany(Media, {
      foreignKey: 'id_annonce',
      as: 'medias',
      onDelete: 'CASCADE'
});
    Media.belongsTo(Annonce, {
      foreignKey: 'id_annonce',
      as: 'annonce'
    });



module.exports = Annonce;
  