"use strict";

const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      address: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      cash1: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      cash2: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      cash3: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
