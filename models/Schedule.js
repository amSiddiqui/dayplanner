const db = require("../modules/database");

const Schedule = db.sequelize.define("Schedule", {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Activity: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    Comment: db.Sequelize.TEXT,
    time_start: {
        type: db.Sequelize.DATE,
        defaultValue: db.Sequelize.NOW,
        allowNull: false
    },
    time_end: {
        type: db.Sequelize.DATE,
        allowNull: false
    }
});

module.exports = Schedule;