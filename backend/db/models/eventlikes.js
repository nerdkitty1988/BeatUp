"use strict";
module.exports = (sequelize, DataTypes) => {
	const EventLikes = sequelize.define(
		"EventLikes",
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
	EventLikes.associate = function (models) {
		// associations can be defined here
		EventLikes.belongsTo(models.User, { foreignKey: "userId" });
		EventLikes.belongsTo(models.Event, { foreignKey: "eventId" });
	};
	return EventLikes;
};
