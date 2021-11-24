const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../config');

class JwtService {
    static async sign(payload, expiry= "1y", secret=jwt_secret){
        return await jwt.sign(payload, secret, {expiresIn: expiry});
    }
    static async verify(token, secret = jwt_secret){
        return  await jwt.verify(token, secret);
    }
}

module.exports = JwtService;