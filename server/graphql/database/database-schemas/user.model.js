'use-strict'

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    _id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
    nickname: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    img_url: {type: DataTypes.STRING, allowNull: true},
    bio: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.REAL, allowNull: false},
    num_of_ratings: {type: DataTypes.BIGINT, allowNull: false},
    friends: {type: DataTypes.ARRAY(DataTypes.BIGINT), allowNull: true},
    events_attending: {type: DataTypes.ARRAY(DataTypes.BIGINT), allowNull: false},
    events_hosting: {type: DataTypes.ARRAY(DataTypes.BIGINT), allowNull: false},
    posts: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true},
  },{
    timestamps: false,
  });
  return user;
}