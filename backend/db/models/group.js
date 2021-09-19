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
        const memberColumnMapping = {
            through: 'GroupMember',
            otherKey:'userId',
            foreignKey: 'groupId',
            as: 'groupMembers'
        };
		Group.belongsToMany(models.User, commentColumnMapping);
        Group.belongsToMany(models.User, memberColumnMapping);
        Group.hasMany(models.GroupMember, {foreignKey: "groupId"});
        Group.hasMany(models.GroupComment, {foreignKey: "groupId"});
        Group.hasMany(models.Event, { foreignKey: "groupId" });
	};
	return Group;
};
