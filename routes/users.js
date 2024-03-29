const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs")

const User = require('../models/User')

// const logUser = (req, res, next) => {
//   if(req.session.logged) {
//       next()
//   }
// }


/* <------- Register User Route--------> */
router.post('/register', async (req, res )=> {
  try {
    const createdUser = await User.create(req.body);
    console.log(createdUser)
    if(createdUser){
      req.session.logged = true;
      req.session.userId = createdUser._id
    }
    res.json({
      data: createdUser,
      logged: req.session.logged,
      success: true
    })   
  } catch (err) {
    res.json({err})   
  }
})

/* <------- Login User Route-------> */
router.post('/login', async (req, res)=> {
  console.log(req.body)
  try {
    const foundUser = await User.findOne({username: req.body.username})
    console.log(foundUser,"<==== found user")
    if (foundUser){
      if (foundUser.validPassword(req.body.password)) {
        req.session.userId = foundUser._id;
        req.session.logged = true;
        console.log("password is correct and sending")
        res.json({
          data: foundUser,
          success: foundUser ? true : false
        });
      }else {
        // res.json({message})
        res.json({error: "problem logging in"})
      }
    }
  } catch (err) {
    res.json(err)
  }
})


/* <------- Logout User Route--------> */
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.json({err});
    } else {
      res.json({
        success: true,
        message: "logged out!"
      });
    }
  })
})

/* <------- Show Route for all Users--------> */
router.get('/index', async (req, res) => {
  try {
    const foundUsers = await User.find({});
    res.json({
      users: foundUsers,
      // user: findUser
    })
  } catch (err) {
    res.json({err}) 
  }
})

// This is the users routes with workouts
router.get('/profile', async (req, res) => {
  try{
    const foundUser = await User.findById(req.session.userId)
      res.json({
        workouts: foundUser.workouts
      })
  }catch (err){
    res.json({err})
  }
})



// This is the users routes with workouts

router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    console.log(user, '-----> this is the delete user')
    user.workout.splice(req.params.id, 1)
    user.save()
    console.log(user, '------>user after workout delete')
    res.json({
      user,
      success: true, 
      message: 'workout deleted'
    })   
  } catch (err) {
    console.log(err)
  }
//   try {
// //     const user = await User.findById(req.session.dbId);
// //     console.log(user, "user in delete route");
// //     user.games.splice(req.params.id, 1);
// //     user.save();
// //     console.log(user);
// //     res.json({ user, success: true, message: "game deleted" });
// //   } catch (err) {
// //     console.log(err);
//   }
});

// This is the show route
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json({
      user,
      currentUser: req.session.userId,
      logged: req.session.logged
    })
  } catch (err) {
    res.json({err})
  }
});

// This is the Edit Route
router.put('/:id/edit', async (req, res) => {
  console.log("updating")
  delete req.body.logged
  try {
    const updatedUser = await User.findById(req.params.id)
    // console.log(updatedUser, '----1')
    updatedUser.name      = (req.body.name.length > 0) ? req.body.name : updatedUser.name
    updatedUser.email     = (req.body.email.length > 0) ? req.body.email : updatedUser.email
    updatedUser.username  = (req.body.username.length > 0) ? req.body.username : updatedUser.username
    updatedUser.password  = (req.body.password.length > 0) ? req.body.password : updatedUser.password
    await updatedUser.save()
    console.log(updatedUser)
    res.json(updatedUser)
  } catch (err) {
    res.json({err})
  }
});


/* <------- Delete User Route --------> */
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    req.sessions.destroy()
    res.json({
      data: user, 
      success: true
    })  
   } catch (err) {
    res.json({err})  
  }
});

router.put('/update/:id', async (req, res) => {
  const userId = req.session.userId || req.params.id
  try {
    const user =  await User.findById(userId)
    if(!req.body.password) {
      delete req.body.password
    } else {
      req.body.password = user.hashPassword(req.body.password);
    } 
    const updateUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true
    });
    res.json({ updateUser });
  } catch (err) {
    res.json({err});
  }
});

router.post("/add", async(req,res)=>{
  try{
    const foundUser = await User.findById(req.session.userId)
    const workout = { 
    }
    foundUser.workouts.push(req.body)
    foundUser.save()
    res.json({
      user: foundUser,
      success: true,
      message: "workout has been added"
    })
  }catch(err){
    console.log(err)
  }
})


module.exports = router;

