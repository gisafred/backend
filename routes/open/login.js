const route=require('express').Router();
const jwt=require('jsonwebtoken');
const Joi = require("joi");
const { User } = require("../../models/User");
const bcrypt = require('bcryptjs');
const _ = require('lodash');//It helps in javascript management by providing simplified way of getting all string manipulation functions and properties

route.post('/',async (req, res) => {
     try {
          const { error } = validate(req.body);
          if (error) return res.status(400).send({ message: _.get(error, "details[0].message", "Validation error") });

          const user = await User.findOne({ email: req.body.email });
          if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

          const validPassword = await bcrypt.compare( req.body.password,user.password);
          if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

          const token = jwt.sign({ id: user._id },process.env.JWT, { expiresIn: "1h" });
          res.status(200).send({ data: token, message: "logged in successfully" });

     } catch (error) {
          res.status(500).send({ message: "Internal Server Error" });
     }
    
});






const validate = (data) => {
     const schema = Joi.object({
          email: Joi.string().email().required().label("Email"),
          password: Joi.string().required().label("Password"),
     });
     return schema.validate(data);
};

module.exports = route;




























// route.post('/', (req, res) => {
//      // Get the username and password from the request body
//      const { username, password } = req.body;

//      // Find the user in the users array
//      const user = users.find(u => u.username === username && u.password === password);

//      // If the user is not found, return an error response
//      if (!user) {
//           return res.status(401).json({ error: 'Invalid username or password' });
//      }

//      // Generate a JWT token
//      const token = jwt.sign({ id: user.id }, JWT_SECRET);

//      // Return the token in the response
//      res.json({ token });
// });