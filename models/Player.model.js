const mongoose = require('mongoose');

const { Schema } = mongoose;

const playerSchema = new Schema (
    {
        name: { type: String, required: true },
        number: { type: Number, required: true },
        team: { type: String, required: true },
        isAllStar: { type: Boolean },
    },

    {timeStamps : true }

);
//Este players en mayuscula es el nombre que nosotros le asignamos al modelo
const Player = mongoose.model('Players', playerSchema);

module.exports = Player;
