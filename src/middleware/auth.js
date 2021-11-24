const JwtService = require('../../services/jwtService');
const userModel = require('../models/users');

const auth = async (req,res,next) => {
    try{
        const headerAuth = req.headers.authorization;
        // console.log(headerAuth, "headerAuth");
        if(!headerAuth){
            throw new error("No Authorization header")
        }
    
        const token = headerAuth.split(" ")[1];
    
        const {_id} = await JwtService.verify(token);
        const user = {_id}
    
        if(!user){
            throw new error("not Authorized this user")
        }
    
        req.user = user;
        next();
    }catch(e){
        console.log(e, "error middleware");
        return res.status(401).json({error: e});
    }
   
}

module.exports = auth;