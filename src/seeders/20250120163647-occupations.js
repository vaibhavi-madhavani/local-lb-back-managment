const { QueryTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const occupations = await queryInterface.sequelize.query(
      `SELECT * FROM Occupations`,
      { type: QueryTypes.SELECT },
    );
    if (occupations.length == 0) {
      await queryInterface.bulkInsert("Occupations", [
        {
          name: "Teacher",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lawyer",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Developer",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
    }
  },
};
