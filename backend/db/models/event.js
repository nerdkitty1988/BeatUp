'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    eventName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    eventLocationId: {
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
    eventDescription: {
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
    const commentColumnMapping = {
        through: "EventComment",
        otherKey: "userId",
        foreignKey: "eventId",
        as: "eventComments",
    };
    const participantColumnMapping = {
        through: 'EventParticipant',
        otherKey:'userId',
        foreignKey: 'eventId',
        as: 'groupParticipants'
    };
    const likeColumnMapping = {
        through: "EventLikes",
        otherKey: "userId",
        foreignKey: "eventId",
        as: "eventLikes",
    };
    Event.belongsTo(models.Location, {foreignKey: 'eventLocationId'});
    Event.belongsToMany(models.User, commentColumnMapping);
    Event.belongsToMany(models.User,participantColumnMapping);
    Event.belongsToMany(models.User, likeColumnMapping);
  };
  return Event;
};
