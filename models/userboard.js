'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class userBoard extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            userBoard.belongsTo(models.User, {
                foreignKey: "user_id"
            });
            userBoard.hasMany(models.Task, {
                foreignKey: "board_id"
            });
        }
    };
    userBoard.init({
        board_name: DataTypes.STRING,
        user_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'userBoard',
    });
    return userBoard;
};