import express from 'express';
import User from './userModel';
import jwt from 'jsonwebtoken';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', (req, res, next) => {
    User.find().then(users =>  res.status(200).json(users)).catch(next);
});
// Get a single user
router.get('/:user_id', (req, res, next) => {
  const user_id = req.params.user_id;
  User.findByUserId(user_id).then(
    user =>  res.status(201).json(user)
  ).catch(next);
});
 //authenticate a user
router.post('/login', async (req, res, next) => {
   if (!req.body.username || !req.body.password) {
    res.status(401).json({
       success: false,
       msg: 'Please pass username and password.',
     });
   } else {
     const user = await User.findByUserName(req.body.username).catch(next);
       if (!user) return res.status(401).json({ code: 401, msg: 'Authentication failed. User not found.' });
       user.comparePassword(req.body.password, (err, isMatch) => {
         if (isMatch && !err) {
           // if user is found and password is right create a token
           const token = jwt.sign(user.username, process.env.SECRET);
           // return the information including token as JSON
           res.status(200).json({
             success: true,
              token: 'BEARER ' + token,
           });
         } else {
           res.status(401).json({
             code: 401,
             msg: 'Authentication failed. Wrong password.'
           });
         }
       });
     }
 });
router.post('/register', async (req,res,next) =>{
  const user = await User.findByUserName(req.body.username).catch(next);
  if (user) {
    res.status(401).json({ code: 401, msg: 'The username has already been used!' });
  }else {
  await User.create(req.body).catch(next);
  res.status(201).json({
    code: 201,
    msg: 'Successful created new user.',
  });
}
});
router.put('/:user_id/update',async(req, res,next) =>{
  User.findOneAndUpdate({user_id: req.params.user_id}, {username:req.body.username,password:req.body.password })
  .then(function(){
    User.findByUserId(req.params.user_id)
    .then(user => res.json(200,user)).catch(next);
  });

});
router.delete('/:user_id/delete', async (req, res, next) =>{
  const user_id = req.params.user_id;
  User.deleteOne({user_id: user_id})
  .then(() => res.status(200).json({message:"Successfully Deleted!"})).catch(next);
})



export default router;
