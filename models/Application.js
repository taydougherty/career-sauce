module.exports = function (sequelize, DataTypes) {
    let Application = sequelize.define('Application', {
        position: {
            type: DataTypes.STRING
        },
        company: {
            type: DataTypes.STRING
        },
        location: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        source: {
            type: DataTypes.TEXT
        },
        description: {
            type: DataTypes.TEXT
        }
    });

    Application.associate = function (models) {
        Application.belongsTo(models.User, {
            foreignKey: [
                'UserId',
                { allowNull: false }],
            onDelete: 'CASCADE'
        })
    };
    return Application
};