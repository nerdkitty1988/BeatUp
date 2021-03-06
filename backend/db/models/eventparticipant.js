"use strict";
module.exports = (sequelize, DataTypes) => {
	const EventParticipant = sequelize.define(
		"EventParticipant",
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			eventId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{}
	);
	EventParticipant.associate = function (models) {
		// associations can be defined here
		EventParticipant.belongsTo(models.User, { foreignKey: "userId" });
		EventParticipant.belongsTo(models.Event, { foreignKey: "eventId" });
	};
	return EventParticipant;
};
