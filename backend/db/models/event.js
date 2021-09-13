'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    eventName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    eventLocation: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    eventDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    eventTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    eventPhotoUrl: {
        type: DataTypes.STRING,
    },
    eventOwnerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    groupId: {
        type: DataTypes.INTEGER,
    },
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.Location, {foreignKey: 'eventLocation'})
  };
  return Event;
};
