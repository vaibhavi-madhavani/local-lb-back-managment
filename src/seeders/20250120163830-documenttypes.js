const { QueryTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const documentTypes = await queryInterface.sequelize.query(
      `SELECT * FROM DocumentTypes`,
      { type: QueryTypes.SELECT },
    );
    if (documentTypes.length == 0) {
      await queryInterface.bulkInsert("DocumentTypes", [
        {
          document_type: "AadharCard (front)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          document_type: "AadharCard (Back)",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          document_type: "PAN card",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          document_type: "Bank Passbook",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
    }
  },
};
