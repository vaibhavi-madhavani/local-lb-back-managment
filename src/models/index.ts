'use strict';

import fs from 'fs'
import path from 'path'
import Sequelize, { Op, QueryTypes } from 'sequelize'
const basename = path.basename(__filename);

const config = global.config;
const db: any = {};
let sequelize: any;


if (global.config.use_env_variable) {
    sequelize = new Sequelize.Sequelize(global.config.use_env_variable, config);
} else {
    sequelize = new Sequelize.Sequelize(process.env.DATABASE || "labour_management", process.env.USERNAME || "root", process.env.password || "", config);
}

sequelize.authenticate().then(() => {

}).catch((err: any) => {
    console.log("Db Error", err.message)
    // emailHelper.sendErrorEmail(err)
});
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))
        db[model.default] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op
db.QueryTypes = QueryTypes

export { db, sequelize, QueryTypes }
