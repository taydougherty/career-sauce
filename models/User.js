'use strict';

const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define('User', {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
        // password hashing hook
        {
            hooks: {
                beforeCreate: function (user, options) {
                    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
                }
            }
        });
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password)
    };
    User.associate = (models) => {
        User.hasMany(models.Application, {
            foreignKey: 'UserId',
            onDelete: 'CASCADE',
            hooks: true
        })
    };
    return User
}