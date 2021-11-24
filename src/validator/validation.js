const Joi = require('joi');

const registerValidation = async(req) => {
   const schemaValidation = await Joi.object({
       fname : Joi.string().alphanum().min(3).max(30).required().error(errors => {
           //console.log('i am here', errors)
           errors.forEach(err => {
               //console.log(err.code, "any typeeee");
               switch(err.code){
                   case "any.required":
                       err.message = "First name is required"
                       break;
                    case "string.base":
                        err.message = "First name should be text";
                        break;
                    case "string.empty":
                        err.message = "First name should not be empty";
                        break;
                    default:
                        break;
               }
           })
           return errors;
        }),
        lname : Joi.string().alphanum().min(3).max(30).required().error(errors => {
            //console.log('i am here', errors)
            errors.forEach(err => {
                //console.log(err.code, "any typeeee");
                switch(err.code){
                    case "any.required":
                        err.message = "Last name is required"
                        break;
                     case "string.base":
                         err.message = "Last name should be text";
                         break;
                     case "string.empty":
                         err.message = "Last name should not be empty";
                         break;
                    default:
                        break;
                }
            })
            return errors;
        }),
        email: Joi.string().email().required(),
        phone: Joi.number().required().integer(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
   })
   const data = req.body; 
   const result = await schemaValidation.validate(data);
    console.log("error", result);
   return result;
}

const loginValidation = async(req) => {
    const schemaValidation = await Joi.object({
        email : Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    })
    const data = req.body;
    const result = await schemaValidation.validate(data);
    console.log("error login Validation", result);
    return result;
}

const userValidation = async(req) => {
    const schemaValidation = await Joi.object({
        email: Joi.string().email().required()
    })
    const data = req.body;
    const result = await schemaValidation.validate(data)
    console.log(result, "userValidation ")
    return result;
}

const resetValidation = async(req) => {
    const schemaValidation = await Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        code: Joi.string().required()
    })
    const data = req.body;
    const result = await schemaValidation.validate(data)
    console.log(result, "userValidation ")
    return result;
}

module.exports = {registerValidation, loginValidation, userValidation,resetValidation};