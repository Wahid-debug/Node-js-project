const bcrypt = require('bcrypt');

const hashingPassword = async(password, saltRounds=10) => {
    try{
        const salt = await bcrypt.genSalt(saltRounds);

        //Hash password
        return await bcrypt.hash(password, salt);

    }catch(error){
        console.log(error, " hashing error");
    }

    // return null if error
    return null 
}

const comparePassword = async(password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    }catch(error){
        console.log(error, "compare password")
    }
    
    //return false if error

    return false;
}

module.exports = { hashingPassword, comparePassword };