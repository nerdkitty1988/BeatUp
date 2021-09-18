'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupComment = sequelize.define('GroupComment', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    groupComment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  }, {});
  GroupComment.associate = function(models) {
    // associations can be defined here
  };
  return GroupComment;
};
