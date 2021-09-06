const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User.model');

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validatePass = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(String(password));
}

const registerStrategy = new LocalStrategy(
    {
        /**
         * usernameField y passwordField hacen referencia al atributo name del formulario de registro
         * <input name="email">
         */
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        /**
         * 1. Comprobar que el usuario no existe previamente.
         *      - Validar email
         *      - Validar contraseña
         * 2. Encriptar la contraseña para guardarla encriptada
         * 3. Crear la instancia del modelo User con los datos del usuario.
         * 4. user.save() y devolver el usuario creado.
         * 
         * done: función que podemos invocar con dos argumentos, const done = (error, user) => {}
         */

        try {
            const existingUser = await User.findOne({ email });

            if(existingUser) {
                // No registrar al usuario.
                const error = new Error('User already in use');
                return done(error);
            };

            const isValidEmail = validateEmail(email);

            if(!isValidEmail) {
                const error = new Error('Invalid email format not supported');
                return done(error);
            };

            const isValidPassword = validatePass(password);

            if(!isValidPassword) {
                const error = new Error('Password must be between 6-20 characters and must cointain one upper and lower case');
                return done(error);
            }

            /**
             * Llegamos aquí, los datos que nos envía el usuario, han pasado todas las validaciones.
             */
            const saltRounds = 10;
            const hash = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                email,
                password: hash,
                name: req.body.name,
            });

            const savedUser = await newUser.save();
            
            savedUser.password = undefined;
            return done(null, savedUser);
        } catch (error) {
            return done(error);
        }
        
    }
);

module.exports = registerStrategy;
