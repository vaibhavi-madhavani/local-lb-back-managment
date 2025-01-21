const { QueryTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const categories = await queryInterface.sequelize.query(
      `SELECT * FROM Categories`,
      { type: QueryTypes.SELECT },
    );
    if (categories.length == 0) {
      await queryInterface.bulkInsert("Categories", [
        {
          name: "SemiSkill",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Skill",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "None",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
    }
  },
};
