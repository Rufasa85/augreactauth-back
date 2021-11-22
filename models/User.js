const { Model, DataTypes } = require('sequelize');
const bcrypt = require("bcrypt");
const sequelize = require('../config/connection');

class User extends Model {}

User.init({
   
    email: {
         type: DataTypes.STRING,
         allowNull:false
    },
    password: {
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize,
    hooks: {
        beforeCreate: userObj=>{
            userObj.password = bcrypt.hashSync(userObj.password,5);
            return userObj;
        }
    }
});

module.exports=User