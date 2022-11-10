const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('./middleware/fetchuser');

const JWT_SECRET ='AndTheNameIsThomasShelby';


//create a User using: POSt "/api/auth/createuser". NO login required
router.post('/createuser',[
    body('name','Enter valid name').isLength({ min: 3 }),
    body('email','Enter valid email').isEmail(),
    body('password','Enter Valid Password').isLength({ min: 5 }),
],async (req,res)=>{
  let success = false;
  //if there are error return  BAd request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success,errors: errors.array() });
    }
    //check whether the user exist with same email
    try{
    let user  = await User.findOne({email: req.body.email}); 


    if(user){
      return res.status(400).json({success, error: "sorry a user with this email already exists "})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      
      // .then(user => res.json(user)).catch(err=>{console.log(err)
      // res.json({error: "Please enter a unique value value for email", message : err.message})});
     const data ={
      user:{
        id: user.id
      }
     }
     
      const authtoken = jwt.sign(data,JWT_SECRET);
      const name = user.name;
      success = true;
      res.json({success,authtoken,name})
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal server Error");
    }
})


//Authenticate a user using: POSt "/api/auth/login". No login required
router.post('/login',[
  body('email','Enter valid email').isEmail(),
  body('password','Password cannot be blank').exists(),
],async (req,res)=>{
  let success = false;

    //if there are error return  BAd request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password}= req.body;
    try {
      let user = await User.findOne({email});

      if(!user){
        success = false
        return res.status(400).json({error: "Please try to login with correct credentials"});
      }
      const passwordCompare = await bcrypt.compare(password,user.password);

      if(!passwordCompare){
        success = false
        return res.status(400).json({ success, error: "Please try to login with correct credentials"});
      }

      const data ={
        user:{
          id: user.id
        }
       }
       
        const authtoken = jwt.sign(data,JWT_SECRET);
        success = true;
        const name = user.name;
        res.json({success, authtoken,name})
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server Error");
    }

})

router.post('/getuser',fetchuser,async (req,res)=>{


try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
  
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server Error");
}
})
module.exports = router