const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const db = require('./config/db.js');
const methodOverride = require('method-override');
const MongoStore = require('connect-mongo');

db.connect();

const passport = require('passport');
const session = require('express-session');
const auth = require('./auth');
auth.setStrategies();


const teamsRoutes = require('./routes/teams.routes');
const indexRoutes = require('./routes/index.routes');
const playersRoutes = require('./routes/players.routes');
const authRoutes = require('./routes/auth.routes');


const PORT = process.env.PORT || 3000;
const app = express();
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    },
    store: MongoStore.create({ mongoUrl: db.DB_URL }),
}));


app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    req.isAuth = req.isAuthenticated();
    next();
 });


const router= express.Router();

//Aqui express reconoe la petición que entra por el post y si tiene algo en el body lo parsea y lo manda en el req.body
app.use(express.json());
//eta función nos interpreta cada vez que recibamos un formulario nativo de HTML
app.use(express.urlencoded({ extended: true }));
//configuración hbs
app.set('views', path.join(__dirname, 'views'));
///motor de vistas de hbs
app.set('view engine', 'hbs');
//configuración de estáticos
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', indexRoutes);
app.use('/teams', teamsRoutes);
app.use('/auth', authRoutes);
app.use('/players', playersRoutes);
app.use('*', (req, res,next) => {
    const error = new Error('Route not found');
    return res.status(404).render('error', {
        message:error.message
    });
});



//Controlador de errores
app.use((error, req, res, next) => {

    console.log(error);
    return res.status(error.status || 500).render('error', {
        message: error.message || "Unexpected Error",
        status: error.status || 500
    });

})


app.listen(PORT, () => {console.log(`Server working on http://localhost:${PORT}`)});