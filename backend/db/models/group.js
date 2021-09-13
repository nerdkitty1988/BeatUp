"use strict";
module.exports = (sequelize, DataTypes) => {
	const Group = sequelize.define(
		"Group",
		{
			groupName: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{}
	);
	Group.associate = function (models) {
		// associations can be defined here
		const commentColumnMapping = {
			through: "GroupComment",
			otherKey: "userId",
			foreignKey: "groupId",
			as: "groupComments",
		};
		Group.belongsToMany(models.User, commentColumnMapping);
	};
	return Group;
};
