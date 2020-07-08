'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('Users', 'username')
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Users', 'username')
  }
};
