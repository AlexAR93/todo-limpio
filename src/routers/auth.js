import { Router } from "express";
import { UserModel } from "../DAO/models/users.model.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import passport from "passport";
import checkUser, { checkAdmin } from "../middlewares/check-user.js";


const authRouter=Router();

export default authRouter;


authRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

authRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  req.session.user = req.user;
  // Successful authentication, redirect home.
  res.redirect('/api/sessions/perfil');
});

authRouter.get('/logout',async(req,res)=>{
  req.session.destroy((err)=>{
      if(err){
          return res.render('error-page',{msg:'no se pudo cerrar la session'});
      };
      res.redirect('/');
  })
})

authRouter.get('/login',async(req,res)=>{
  res.render('login-form');
})

authRouter.get('/register',async(req,res)=>{
  res.render('register-form');
})
authRouter.get('/admin',checkAdmin,async(req,res)=>{
  res.send('Esto es privado del administrador');
})

authRouter.get('/failregister', async (req, res) => {
    return res.json({ error: 'fail to register' });
});

authRouter.get('/faillogin', async (req, res) => {
return res.json({ error: 'fail to login' });
});

authRouter.post('/register',passport.authenticate('register',{failureRedirect:'/api/sessions/failregister'}), (req, res) => {
    if (!req.user) {
      return res.json({ error: 'something went wrong' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin };
    
    return res.json({ msg: 'ok', payload: req.user });
  });

authRouter.post('/login',passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }), async (req, res) => {
    if (!req.user) {
      return res.json({ error: 'invalid credentials' });
    }
    reqsession.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, admin: req.user.admin };

    return res.json({ msg: 'ok', payload: req.user });
  });

  authRouter.get('/perfil', checkUser, (req, res) => {
    const user = req.session.user;
    console.log(user)
    return res.render('profile');
  });
