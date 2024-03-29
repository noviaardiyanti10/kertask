'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Task.belongsTo(models.userBoard, {
                foreignKey: 'board_id'
            })
            Task.belongsTo(models.User, {
                foreignKey: 'user_id'
            })

            Task.hasMany(models.List, {
                foreignKey: 'task_id'
            })
        }
    };
    Task.init({
        title: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        board_id: DataTypes.INTEGER,
        description: DataTypes.STRING,
        start_date: DataTypes.DATE,
        due_date: DataTypes.DATE,
        duration: DataTypes.INTEGER,
        percentage: DataTypes.INTEGER,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Task',
    });
    return Task;
};