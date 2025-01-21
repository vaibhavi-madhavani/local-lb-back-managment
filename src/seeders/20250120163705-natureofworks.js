const { QueryTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const natureOfWorks = await queryInterface.sequelize.query(
      `SELECT * FROM NatureOfWorks`,
      { type: QueryTypes.SELECT },
    );
    if (natureOfWorks
      .length == 0) {
      await queryInterface.bulkInsert("NatureOfWorks", [
        {
          name: "Office Management",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Data Entry",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Scheduling and Coordination",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
    }
  },
};
