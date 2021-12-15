'use strict';


module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Roles', [{
            role: 'user',
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()   
        }
    ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Roles', null, {});
    }
};