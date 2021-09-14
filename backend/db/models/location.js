'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    locationName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    locationAddress: {
        allowNull: false,
        type: DataTypes.STRING,
    },

  }, {});
  Location.associate = function(models) {
    // associations can be defined here
    Location.hasMany(models.Event, {foreignKey: 'eventLocation'})
  };
  return Location;
};
