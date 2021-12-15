'use strict';
const bcrypjs = require('bcryptjs')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
            email: 'adminkertask1@gmail.com',
            password: await bcrypjs.hash('kertask123management',10),
            role_id: 2,
            createdAt: new Date(),
            updatedAt: new Date()
    }])

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
