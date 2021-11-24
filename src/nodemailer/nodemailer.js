const nodemailer = require('nodemailer');
const {user, pass, nodemailer_port, host} = require('../../config');

const transporter = nodemailer.createTransport({
    host : host,
    port : nodemailer_port,
    auth : {
        user,
        pass 
    },
    secure : false
});
const main = async (mailData,code) => {
    try{
        return await transporter.sendMail(mailData,code)
    }catch(e){
        console.log(e)
    }
}

module.exports = {main};