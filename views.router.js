import {Router} from 'express';
import { checkAdmin } from '../middlewares/check-user.js';

const viewsRouter=Router();
export default viewsRouter;

viewsRouter.get('/logout',async(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.render('error-page',{msg:'no se pudo cerrar la session'});
        };
        res.redirect('/login');
    })
})

viewsRouter.get('/login',async(req,res)=>{
    res.render('login-form');
})

viewsRouter.get('/register',async(req,res)=>{
    res.render('register-form');
})
viewsRouter.get('/admin',checkAdmin,async(req,res)=>{
    res.send('Esto es privado del administrador');
})