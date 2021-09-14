"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Locations", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			locationName: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			locationStreet: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			locationCity: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			locationState: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			locationZip: {
				allowNull: false,
				type: Sequelize.STRING,
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
		return queryInterface.dropTable("Locations");
	},
};
