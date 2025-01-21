const { QueryTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const religions = await queryInterface.sequelize.query(
      `SELECT * FROM Religions`,
      { type: QueryTypes.SELECT },
    );
    if (religions.length == 0) {
      await queryInterface.bulkInsert("Religions", [
        {
          name: "Hindu",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Christian",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Islam",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
    }
  },
};
