"use strict";
module.exports = (sequelize, DataTypes) => {
	const EventLike = sequelize.define(
		"EventLike",
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
	EventLike.associate = function (models) {
		// associations can be defined here
		EventLike.belongsTo(models.User, { foreignKey: "userId" });
		EventLike.belongsTo(models.Event, { foreignKey: "eventId" });
	};
	return EventLike;
};
