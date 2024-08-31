module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Trains', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });
    await queryInterface.addColumn('Trains', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Trains', 'createdAt');
    await queryInterface.removeColumn('Trains', 'updatedAt');
  }
};
