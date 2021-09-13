'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupComment = sequelize.define('GroupComment', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {});
  GroupComment.associate = function(models) {
    // associations can be defined here
  };
  return GroupComment;
};