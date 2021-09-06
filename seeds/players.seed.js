const mongoose = require('mongoose');
const Player = require('../models/Player.model');
const db = require('../config/db');
 
 
const players = [
 {
    name: 'Dirk Nowitzki',
    number: 41,
    team: 'Dallas Mavericks',
    isAllStar: true,
 },
 {
    name: 'Paul Pierce',
    number: 23,
    team: 'Boston Celtics',
    isAllStar: true
 },
 {
    name: 'Trae Young',
    number: 23,
    team: 'Atlanta Hawks',
    isAllStar: true
 },
 {
    name: 'Marc Gasol',
    number: 33,
    team: 'Los Angeles Lakers',
    isAllStar: false
 }  
 ]

 mongoose
     .connect(db.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
     .then (async (dbConnection) => {
        const { name, host } = dbConnection.connection;
        console.log(`El resultado del seed se almacenará en la db ${name} en ${host}`);

         const allPlayers = await Player.find();
         
         if (allPlayers.length) {

             console.log(`[Find]: Found ${allPlayers.length} players`);
             await Player.collection.drop();
             console.log("[Delete]: Collection dropped correctly...");
         } else {
             console.log('[Find]: Could not find any player')
         }
        })
     .catch(error => console.log('[Error]: Dropping collection -->', error))
     .then(async () => {
         await Player.insertMany(players);
         console.log('[Success]: New players added successfully...');
     })
     .catch(error => console.log('[Error]: Adding players -->', error))
     .finally(() => mongoose.disconnect());
