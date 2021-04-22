'use-strict'

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    _id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
    nickname: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    img_url: {type: DataTypes.STRING, allowNull: true},
    rating: {type: DataTypes.REAL, allowNull: true},
    friends: {type: DataTypes.ARRAY(DataTypes.BIGINT), allowNull: true},
    events: {type: DataTypes.ARRAY(DataTypes.BIGINT), allowNull: true},
  },{
    timestamps: false,
  });
  return user;
}