const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pet extends Model {}

Pet.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         allowNull:false,
    },
    species: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    description: {
        type:DataTypes.TEXT,
        allowNull:false
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
    
},{
    sequelize
});

module.exports=Pet