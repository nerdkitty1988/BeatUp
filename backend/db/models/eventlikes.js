'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventLikes = sequelize.define('EventLikes', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  }, {});
  EventLikes.associate = function(models) {
    // associations can be defined here
  };
  return EventLikes;
};
