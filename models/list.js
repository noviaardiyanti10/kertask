'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class List extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            List.belongsTo(models.Task, {
                foreignKey: 'task_id'
            })
        }
    };
    List.init({
        item: DataTypes.STRING,
        is_complete: DataTypes.BOOLEAN,
        task_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'List',
    });
    return List;
};