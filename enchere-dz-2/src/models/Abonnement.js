const { DataTypes } = require('sequelize');
const {sequelize} = require('../controllers/db_controller'); 
const User = require('./User');

const Abonnement = sequelize.define('Abonnement', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        onDelete: 'SET NULL'
    },
    date_debut: {
        type: DataTypes.DATE
    },
    date_fin: {
        type: DataTypes.DATE
    },
    duree: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.ENUM("attente", "succes", "annule"),
        defaultValue: "attente"
    },
    payment_type: {
        type: DataTypes.ENUM("virement","cache","virement ccp","virement bancaire"  

),
        defaultValue: "cache"
    }
}, {
    tableName: 'Abonnnement',
    timestamps: false
});

module.exports = Abonnement;