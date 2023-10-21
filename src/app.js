import express from "express";
import productsRouter from "./routers/products.router.js";
import { connectMongo } from "./utils/connect-mongo.js";
import loginRouter from "./routers/auth.js";
import handlebars from 'express-handlebars';
import __dirname from "./utils/__dirname.js";
import path from 'path';
import MongoStore from 'connect-mongo';
import session from "express-session";
import passport from "passport";
import { iniPassport } from "./config/passport.config.js";
connectMongo()
const app= express();

const port =3000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Session
app.use(
    session({
      store: MongoStore.create({ mongoUrl: 'mongodb+srv://aleexrodriguez93:0wjxKmx2n6PmeBZl@backend-course-cluster.663woxo.mongodb.net/e-commerce?retryWrites=true&w=majority', ttl: 86400 * 7 }),
      secret: 'un-re-secreto',
      resave: true,
      saveUninitialized: true,
    })
  );


// PASSPORT
iniPassport();
app.use(passport.initialize());
app.use(passport.session());

// handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/products',productsRouter);
app.use("/api/sessions",loginRouter);


app.get('*',(req,res)=>{
    return res.status(404).json({
        status:'error',
        msg:'no encontrado',
        data:{},
    });
});

app.listen(port,()=>{
    console.log(`Corriendo en puerto: ${port}`)
})
