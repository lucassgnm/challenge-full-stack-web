module.exports = (sequelize, DataTypes) => {
    const student = sequelize.define(
      'student',
      {
        ra: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          field: 'ra'
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          field: 'name'
        },
        cpf: {
          type: DataTypes.STRING(11),
          allowNull: false,
          field: 'cpf'
        },
        cep: {
          type: DataTypes.STRING(8),
          allowNull: false,
          field: 'cep'
        },
        street: {
          type: DataTypes.STRING(150),
          allowNull: false,
          field: 'street'
        },
        number: {
          type: DataTypes.STRING(15),
          allowNull: false,
          field: 'number'
        },
        state: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'state'
        },
        city: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'city'
        },
      },
      {
        initialAutoIncrement: 100000
      },
      {
        tableName: 'student',
        indexes: [
          {
              unique: false,
              fields: ['ra']
          }
        ]
      }
    );
  
    return student;
  }

  