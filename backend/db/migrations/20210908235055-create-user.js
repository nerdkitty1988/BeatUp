"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			username: {
				type: Sequelize.STRING(30),
				allowNull: false,
				unique: true,
			},
			firstName: {
				type: Sequelize.STRING(50),
				allowNull: false,
			},
			lastName: {
				type: Sequelize.STRING(75),
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING(256),
				allowNull: false,
				unique: true,
			},
            photoUrl: {
                type: Sequelize.STRING(1000)
            },
            zipcode: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
			hashedPassword: {
				type: Sequelize.STRING.BINARY,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("Users");
	},
};
