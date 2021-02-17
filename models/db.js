var sql = require("mssql");
console.log("in db");
const { database_config} = require('../config');

let _db;


const initDb = (callback) =>{
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }
    // connect to your database
    sql.connect(database_config, function(err){
        if (err) return callback(err);
        console.log("DB initialized ");
        _db = sql;
        return callback(null, _db);   
    })
    
}

function getDb() {
    if (!_db){
        console.log(_db, "Db has not been initialized. Please called init first.");
        return undefined;
    }
    return new _db.Request();
}

module.exports = {
    sql,
    getDb,
    initDb
};