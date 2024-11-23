"use strict";
const bcrypt = require("bcrypt");
const saltRounds = 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Admin-Admin",
          email: "admin@mail.ru",
          password: await bcrypt.hash("123", saltRounds),
          role: "Admin",
        },
        {
          name: "Moderator-Moderator",
          email: "moderator@mail.ru",
          password: await bcrypt.hash("123", saltRounds),
          role: "Moderator",
        },
        {
          name: "User-User",
          email: "user@mail.ru",
          password: await bcrypt.hash("123", saltRounds),
          role: "User",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
