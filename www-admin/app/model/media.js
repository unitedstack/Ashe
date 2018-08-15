'use strict';

module.exports = {
  config: {
    www: false
  },
  model: (mysql, DataTypes) => {
    return mysql.define('media', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tags: {
        type: DataTypes.STRING
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      mimetype: {
        type: DataTypes.STRING,
        allowNull: false
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: false
      },
      prefix: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    }, {
      paranoid: false,
      charset: 'utf8',
      freezeTableName: true,
      tableName: 'media',
      // classMethods: {
      //   associate: function (models) {
      //     models.media.hasMany(models.media_tag, {foreignKey: 'mediaId'});
      //   }
      // }
    });
    
  }
};
