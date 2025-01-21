const { QueryTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const labourRoles = await queryInterface.sequelize.query(
      `SELECT * FROM Role`,
      { type: QueryTypes.SELECT },
    );
    if (labourRoles.length == 0) {
      await queryInterface.bulkInsert("Role", [
        {
          name: "Supervisor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Area Manager",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Approver",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
    }
  },
};
