'use strict';
/** @type {import('sequelize-cli').Migration} */
  export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        phoneNumber: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.BOOLEAN
        },
        image: {
            type: Sequelize.STRING
        },
        roleId: {
            type: Sequelize.STRING
        },
        positionId: {
            type: Sequelize.STRING
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
  }
export async function down(queryInterface, Sequelize){
    await queryInterface.dropTable('users');
}