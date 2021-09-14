"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Rsvps", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: "Users" },
			},
			eventId: {
				allowNull: false,
				type: Sequelize.INTEGER,
				references: { model: "Events" },
			},
            rsvpStatus: {
                allowNull: false,
                type: Sequelize.STRING,
                defaultValue: "Not Attending"
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
		return queryInterface.dropTable("Rsvps");
	},
};
