import { Router } from "express";
import { UserModel } from "../models/users.model.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import passport from "passport";
import checkUser, { checkAdmin } from "../middlewares/check-user.js";


const loginRouter=Router();

export default loginRouter;


loginRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

loginRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  req.session.user = req.user;
  // Successful authentication, redirect home.
  res.redirect('/api/sessions/perfil');
});

loginRouter.get('/logout',async(req,res)=>{
  req.session.destroy((err)=>{
      if(err){
          return res.render('error-page',{msg:'no se pudo cerrar la session'});
      };
      res.redirect('/api/sessions/login');
  })
})

loginRouter.get('/login',async(req,res)=>{
  res.render('login-form');
})

loginRouter.get('/register',async(req,res)=>{
  res.render('register-form');
})
loginRouter.get('/admin',checkAdmin,async(req,res)=>{
  res.send('Esto es privado del administrador');
})

loginRouter.get('/failregister', async (req, res) => {
    return res.json({ error: 'fail to register' });
});

loginRouter.get('/faillogin', async (req, res) => {
return res.json({ error: 'fail to login' });
});

loginRouter.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/failregister'}), (req, res) => {
    if (!req.user) {
      return res.json({ error: 'something went wrong' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin };
    
    return res.json({ msg: 'ok', payload: req.user });
  });

loginRouter.post('/login',passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }), async (req, res) => {
    if (!req.user) {
      return res.json({ error: 'invalid credentials' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, admin: req.user.admin };

    return res.json({ msg: 'ok', payload: req.user });
  });

  loginRouter.get('/perfil', checkUser, (req, res) => {
    const user = req.session.user;
    console.log(user)
    return res.render('profile');
  });
