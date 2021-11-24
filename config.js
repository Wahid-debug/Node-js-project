const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port : process.env.PORT,
    db_url: process.env.DB_URL,
    user : process.env.USER,
    pass : process.env.PASS,
    nodemailer_port :  process.env.NODEMAILER_PORT,
    host : process.env.HOST,
    jwt_secret : process.env.JWT_SECRET   
}