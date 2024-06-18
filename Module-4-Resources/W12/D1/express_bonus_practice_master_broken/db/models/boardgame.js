'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Boardgame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Boardgame.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Boardgame.hasMany(models.Review, { foreignkey: 'gameId' })
    }
  }
  Boardgame.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    maxPlayers: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          message: 'A board game must allow at least one player'
        }
      }
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Boardgame',
  });
  return Boardgame;
};