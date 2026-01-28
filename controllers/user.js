const User=require('../models/user');


async function userSignUp(req,res){         // User signup with password length validation

      const{name, email, password}= req.body;
      if(!password || password.length<10)
        {
         return res.status(400).json({error: "password must be atleast 10 characters long"});
         }

      await User.create
      ({
        name,
        email,
        password,
    });
    return res.status(201).json({message : "user created successfully"});
}

async function userLogIn(req,res){          // User login to permit valid users
    const{ email, password}= req.body;
    const user= await User.findOne({email, password});

      if(!user)
        {
         return res.json({error: "Invalid email or password"});
         }

      return res.status(200).json({message: "logged in successfully"});
}


module.exports= {
    userSignUp,
    userLogIn,
}