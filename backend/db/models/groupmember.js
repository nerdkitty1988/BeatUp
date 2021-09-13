'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define('GroupMember', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {});
  GroupMember.associate = function(models) {
    // associations can be defined here
  };
  return GroupMember;
};