const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const {sequelize} = require("../controllers/db_controller")


exports.login = async (req, res) => {
  try {
        console.log("login : "+req.body);

    const { email, password } = req.body;
    

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, "78heoytx56drg4ezd16q3df78");
    return res.json({ 
      user,
      token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' }); // ✅ Safe catch
  }
};



  
  
  exports.signup = async (req, res) => {

    try {
      console.log("email registred");

      console.log(req.body);


      

      const existingUser = await User.findOne({ where: {email: req.body.email } });
      if (existingUser != null) {
        console.log("email registred");
        
        return res.status(400).json({ error: 'Email already registered' });
      }

      console.log("user try create");

      req.body.password = await bcrypt.hash(req.body.password, 10);



      const newUser = await User.create(req.body);

      return res.status(201).json({ message: 'User registered successfully :'+newUser });
    } catch (error) {
      console.error(error);
      
      res.status(500).json({ error: 'Server error : '+error });
    }
  };

exports.getAllUser = async (req,res)=>{
    try {

const listUser = await User.findAll({
  attributes: {
    include: [
      [
        sequelize.literal(`(
          SELECT COUNT(*)
          FROM Annonces AS annonce
          WHERE annonce.user_id = User.id
        )`),
        'annonceCount'
        
      ]
    ]
  },
});

        res.json(listUser);
    } catch (error) {
      console.log(error);
      
      res.status(500).send(error)
    }
  }


  exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        await User.update(req.body,{
            where:{
                id
            }
        });
        res.json({ message: 'User updated successfully' });
    }
        catch (error) {
        res.status(500).json({ error: 'Server error: ' + error });
    }
  
  }

  exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await User.destroy({
            where:{
                id
            }
        });
        res.json({ message: 'User deleted successfully' });
    }
        catch (error) {
        res.status(500).json({ error: 'Server error: ' + error });
    }
  }

  exports.getProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({
            where:{
                id
            }
        });
        res.json(user);
    }
        catch (error) {
        res.status(500).json({ error: 'Server error: ' + error });
    }
  }