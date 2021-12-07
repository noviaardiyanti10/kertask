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
            userBoard.belongsTo(models.Task, {
                foreignKey: "task_id"
            });
        }
    };
    userBoard.init({
        board_name: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        task_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'userBoard',
    });
    return userBoard;
};