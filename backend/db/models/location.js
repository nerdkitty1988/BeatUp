'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    locationName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    streetAddress: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5],
            is: /^[0-9]{5}(?:-[0-9]{4})?$/,
        },
    },
    locationPhotoUrl: DataTypes.STRING
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
    Location.hasMany(models.Event, {foreignKey: 'eventLocation'})
  };
  return Location;
};
