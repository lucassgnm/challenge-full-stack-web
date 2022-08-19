const crypto = require("crypto");

module.exports = async (sequelize, DataTypes) => {
    const auth = await sequelize.define(
      'auth',
      {
        username: {
          type: DataTypes.STRING(20),
          allowNull: false,
          field: 'username'
        },
        password: {
          type: DataTypes.STRING(64),
          allowNull: false,
          field: 'password'
        },
      },
      {
        tableName: 'auth',
        indexes: [
          {
              unique: false,
              fields: ['username']
          }
        ]
      }
    );

    const userExists = await auth.findOne({
        where: {
          username: 'admin',
          password: crypto.createHash('sha256').update('admin').digest('hex')
        }
    });

    if (userExists == null) {
        auth.create({
            username: 'admin',
            password: crypto.createHash('sha256').update('admin').digest('hex')
        });
    }
  
    return auth;
  }

  