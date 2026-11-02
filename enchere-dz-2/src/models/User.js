const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../controllers/db_controller");
const Annonce = require("./Annonce")
const Abonnement = require("./Abonnement");
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
  },
  {
    tableName: "Users",
    timestamps: true,
  }
);

User.hasMany(Annonce, {
  foreignKey: "user_id",
  as: "annonces",
  onDelete: 'SET NULL'
});


Annonce.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "SET NULL",
});
Abonnement.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "SET NULL",
});

module.exports = User;
