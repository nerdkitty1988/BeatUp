'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventComment = sequelize.define('EventComment', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    eventComment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  }, {});
  EventComment.associate = function(models) {
    // associations can be defined here
    EventComment.belongsTo(models.User, { foreignKey: "userId" });
    EventComment.belongsTo(models.Event, { foreignKey: "eventId" });
  };
  return EventComment;
};
