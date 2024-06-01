const mongoose = require('mongoose');
const Joi = require("joi");
const  bookSchema= new mongoose.Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    publisher: { type:String , required: true },
    description: { type:String , required: true },
});
const validate = (data) => {
    const schema = Joi.object({
         author: Joi.string().required().label("author"),
         title: Joi.string().required().label("title"),
         publisher: Joi.string().required().label("publisher"),
         description: Joi.string().required().label("description")
    });
    return schema.validate(data);
};
const Book= mongoose.model("Book", bookSchema);
module.exports={validate,Book}