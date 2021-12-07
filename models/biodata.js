'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Biodata extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Biodata.belongsTo(models.User, {
                foreignKey: 'user_id'
            })
        }
    };
    Biodata.init({
        avatar_url: DataTypes.STRING,
        full_name: DataTypes.STRING,
        email: DataTypes.STRING,
        birth_date: DataTypes.DATE,
        phone_number: DataTypes.STRING,
        address: DataTypes.STRING,
        user_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Biodata',
    });
    return Biodata;
};