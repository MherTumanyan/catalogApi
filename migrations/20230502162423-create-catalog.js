"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("catalogs", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cost1: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cost2: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cost3: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      req1: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      req2: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      req3: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      category: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("catalogs");
  },
};
