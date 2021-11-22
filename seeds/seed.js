const sequelize = require("../config/connection");
const {User,Pet} = require("../models");

const seed = async ()=>{
    await sequelize.sync({force:true})
    await User.bulkCreate([
        {
            email:"joe@joe.joe",
            password:"password"
        },
        {
            email:"zach@zach.zach",
            password:"Password"
        }
    ],{
        individualHooks:true
    })

    await Pet.bulkCreate([
        {
            name:"Shiva",
            species:"cat",
            age:1,
            description:"tortoiseshell cat, beautiful coat, very dumb, but sweet.  Likes to eat hair ties.",
            UserId:1
        },
        {
            name:"Bahamut",
            species:"cat",
            age:1,
            description:"sandy tabby.  Very chatty. likes to blink.  Can jump way too high.  Hold world record for highest cat jump",
            UserId:1
        },
        {
            name:"Belle",
            species:"dog",
            age:10,
            description:"early riser, loves to 'say hi' to the neighbors. ",
            UserId:2
        }
    ])
    console.log("seeded")
    process.exit(0)
}

seed();