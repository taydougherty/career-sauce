'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn("Users", "is_authenticated")
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.addColumn("Users", "is_authenticated", {
      defaultValue: null,
      type: Sequelize.BOOLEAN
    })
  }
};
