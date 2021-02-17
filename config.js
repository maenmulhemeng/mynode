module.exports = {
    database_config:{
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        server: process.env.DATABASE_SERVERNAME,
        database: process.env.DATABASE_NAME,
        "options": {
            "encrypt": true,
            "enableArithAbort": true
            }
    }
};