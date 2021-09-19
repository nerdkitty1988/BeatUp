'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventComments = sequelize.define('EventComments', {
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
  EventComments.associate = function(models) {
    // associations can be defined here
    EventComments.belongsTo(models.User, { foreignKey: "userId" });
    EventComments.belongsTo(models.Event, { foreignKey: "eventId" });
  };
  return EventComments;
};
