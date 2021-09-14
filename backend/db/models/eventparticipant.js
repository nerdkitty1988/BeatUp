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
			rsvpStatus: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "Not Attending",
			},
		},
		{}
	);
	EventParticipant.associate = function (models) {
		// associations can be defined here
	};
	return EventParticipant;
};
