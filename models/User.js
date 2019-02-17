const db = require('../modules/database');

const User = db.sequelize.define('User', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: db.Sequelize.INTEGER
    },
    first_name: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: db.Sequelize.STRING,
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    last_login: {
        type: db.Sequelize.DATE,
        defaultValue: db.Sequelize.NOW
    },
});

module.exports = User;