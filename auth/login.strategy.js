const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');
const bcrypt = require('bcrypt');

const loginStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            /**
             * 1. Comprobar si el usuario existe.
             * 2. Comprobar si la contraseña recibida coincide con la de la base de datos.
             */

            const existingUser = await User.findOne({ email });

            if(!existingUser) {
                const error = new Error('User is not valid');
                error.status = 401;
                return done(error);
            }

            const isValidPassword = await bcrypt.compare(password, existingUser.password);

            if(!isValidPassword) {
                const error = new Error('Password is not valid');
                return done(error);
            };

            existingUser.password = undefined;
            return done(null, existingUser);
        } catch (error) {
            return done(error);
        }
    }
);

module.exports = loginStrategy;
