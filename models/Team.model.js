const mongoose = require('mongoose');

const { Schema } = mongoose;

const teamSchema = new Schema (
    {
        name: { type: String, required: true},
        state: { type: String, required: true},
        city: { type: String, required: true},
        population: { type: Number},
        players: [ {type: mongoose.Types.ObjectId, ref: 'Players' } ],//Aqui relacionamos los modelos entre si
        image: { type: String, required: true},
    },

    { timestamps: true }
);


//Aqui pasamos a crear el modelo

const Team = mongoose.model('Teams', teamSchema);

module.exports = Team;
