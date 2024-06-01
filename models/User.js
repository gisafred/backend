const mongoose = require('mongoose');
const Joi = require("joi");

//Define user schema
const userSchema = new mongoose.Schema({
     name: { type: String, required: true },
     email: { type: String, required: true },
     password: { type: String, required: true },
});


const validate = (data) => {
     const schema = Joi.object({
          name: Joi.string().required().label("Name"),
          email: Joi.string().email().required().label("Email"),
          password: Joi.string().required().label("Password"),
     });
     return schema.validate(data);
};

const User = mongoose.model("user", userSchema);

module.exports={validate,User}
