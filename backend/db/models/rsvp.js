"use strict";
module.exports = (sequelize, DataTypes) => {
	const Rsvp = sequelize.define(
		"Rsvp",
		{
			userId: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: { model: "Users" },
			},
			eventId: {
				allowNull: false,
				type: DataTypes.INTEGER,
				references: { model: "Events" },
			},
			rsvpStatus: {
				allowNull: false,
				type: DataTypes.STRING,
				defaultValue: "Not Attending",
			},
		},
		{}
	);
	Rsvp.associate = function (models) {
		// associations can be defined here
        Rsvp.belongsTo(models.User, { foreignKey: "userId" });
		Rsvp.belongsTo(models.Event, { foreignKey: "eventId" });
	};
	return Rsvp;
};
