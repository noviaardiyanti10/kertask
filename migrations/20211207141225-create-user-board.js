'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('userBoards', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },
            board_name: {
                type: Sequelize.STRING
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "Users",

                    },
                    key: "id",
                },
                allowNull: true,
                onDelete: 'cascade',
                onUpdate: 'cascade'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('userBoards');
    }
};