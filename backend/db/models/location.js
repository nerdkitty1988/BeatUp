'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    locationName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    locationStreet: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    locationCity: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    locationState: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    locationZip: {
        allowNull: false,
        type: DataTypes.STRING,
    }

  }, {});
  Location.associate = function(models) {
    // associations can be defined here
    Location.hasMany(models.Event, {foreignKey: 'eventLocationId'})
  };
  return Location;
};
