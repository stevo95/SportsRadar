'use-strict'

module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('events', {
    _id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
    creator_id: {type: DataTypes.BIGINT, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    latitude: {type: DataTypes.FLOAT, allowNull: false},
    longitude: {type: DataTypes.FLOAT, allowNull: false},
    sport: {type: DataTypes.STRING, allowNull: false},
    free: {type: DataTypes.BOOLEAN, allowNull: false},
    price: {type: DataTypes.STRING, allowNull: true},
    datetime: {type: DataTypes.STRING, allowNull: true},
  },{
    timestamps: false,
  });
  return event;
}