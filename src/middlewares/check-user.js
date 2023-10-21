const checkUser=(req,res,next)=>{
    if(req.session.user.email){
        return next();
    }
    return res.status(401).render('error-page',{msg:'please log in'});
}
export const checkAdmin=(req,res,next)=>{
    if(req.session.user.email&&req.session.user.admin===true){
        return next();
    }else if(req.session.user.email&&req.session.user.admin===false){
        return res.status(403).render('error-page',{msg:'No tienes los privilegios de administrador'});
    }else{
        return res.status(401).render('error-page',{msg:'log in'});
    }
}
export default checkUser;