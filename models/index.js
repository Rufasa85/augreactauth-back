const User = require("./User");
const Pet = require("./Pet");

Pet.belongsTo(User);
User.hasMany(Pet);

module.exports = {
    User,
    Pet
}