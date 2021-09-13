'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    eventName: DataTypes.STRING,
    eventLocation: DataTypes.INTEGER,
    eventDate: DataTypes.DATE,
    eventTime: DataTypes.INTEGER,
    eventPhotoUrl: DataTypes.STRING,
    eventOwnerId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};