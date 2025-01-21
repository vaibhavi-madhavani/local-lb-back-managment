const { QueryTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const languages = await queryInterface.sequelize.query(
      `SELECT * FROM Languages`,
      { type: QueryTypes.SELECT },
    );
    if (languages.length == 0) {
      await queryInterface.bulkInsert("Languages", [
        {
          name: "Hindi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Gujarati",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "English",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
    }
  },
};
