const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const passport = require('./config/passport');
const router = require('./routes');

//Configuração e modelos BD
const db = require('./config/db');
    require('./models/Usuarios');
    require('./models/Categorias');
    db.sync().then(() => console.log('DB Conectada')).catch((error) => console.log(error));

// Variables de Desarrollo    
require('dotenv').config({path: 'variables.env'});


//App Principal
const app = express();

//Body parser, ler formulários
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//Express validator (validação com muitas funções)
app.use(expressValidator());

//Habilitar EJS como template engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Ubicação vistas
app.set('views', path.join(__dirname, './views'));

//Arquivos estáticos
app.use(express.static('public'));

//Habilitar cookie parser
app.use(cookieParser());

//Criar a sessão
app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized : false
}))

//Inicializar passport
app.use(passport.initialize());
app.use(passport.session());

//Adiciona flash messages
app.use(flash());   

//Middleware (User, Flash messages, Data atual)
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    next();
});

//Rounting
app.use('/', router());


//Adicione a porta
app.listen(process.env.PORT, () => {
    console.log('O servidor está funcionando');
});