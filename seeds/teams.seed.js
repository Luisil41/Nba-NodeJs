const mongoose = require('mongoose');
 const Team = require('../models/Team.model');
 const db = require('../config/db');
 
 const teams = [
     {
        name: 'Atlanta Hawks',
        state: 'Atlanta',
        city: "Atlanta",
        population: 2000000,
        image: 'https://1000marcas.net/wp-content/uploads/2020/03/logo-Atlanta-Hawks.png',
     },
     {
        name: 'Boston Celtics',
        state: 'Boston',
        city: "Boston",
        population: 6735763,
        image: 'https://www.pikpng.com/pngl/m/86-860868_boston-celtics-logos-iron-on-stickers-and-peel.png',
     },
     {
        name: 'Nets',
        state: 'New York',
        city: "NY",
        population: 12027456,
        image: 'https://www.logolynx.com/images/logolynx/c2/c2b9c346d9152d673c22dcd246d83cd6.jpeg',
     },
     {
        name: 'Hornets',
        state: 'New Orleans',
        city: "New Orleans",
        population: 1909090,
        image: 'https://logos-world.net/wp-content/uploads/2020/05/Charlotte-Hornets-Logo-2015-Present.png',
     },
     {
        name: 'Chicago Bulls',
        state: 'Chicago',
        city: "Chicago",
        population: 2302308,
        image: 'https://i.pinimg.com/564x/3b/ba/82/3bba8294411dd6577c5b496706502e03.jpg',
     },
     {
        name: 'Cleveland Cavaliers',
        state: 'Ohio',
        city: "Cleveland",
        population: 3339874,
        image: 'https://www.nba.com/resources/static/team/v2/cavaliers/images/170531-partial-logo.png',
     },
     {
        name: 'Dallas Mavericks',
        state: 'Texas',
        city: "Dallas",
        population: 4445567,
        image: 'https://cdn.freelogovectors.net/svg06/dallas-mavericks_logo.svg',
     },
     {
        name: 'Denver Nuggets',
        state: 'Denver',
        city: "Denver",
        population: 3546756,
        image: 'https://logos-marcas.com/wp-content/uploads/2020/06/Denver-Nuggets-Logo.png',
     },
     {
        name: 'Detroit Pistons',
        state: 'Detroit',
        city: "Detroit",
        population: 1110944,
        image: 'https://1000marcas.net/wp-content/uploads/2020/02/logo-Detroit-Pistons.png',
     },
     {
        name: 'Houston Rockets',
        state: 'Houston',
        city: "Houston",
        population: 2544836,
        image: 'https://cdn.bleacherreport.net/images/team_logos/328x328/houston_rockets.png',
     },
     {
        name: ' Golden State Warriors',
        state: 'San Francisco',
        city: "San Francisco",
        population: 50967852,
        image: 'https://logos-marcas.com/wp-content/uploads/2020/06/Golden-State-Warriors-logo.png',
     },
     {
        name: 'Indiana Pacers',
        state: 'Indiana',
        city: "Indiana",
        population: 4563456,
        image: 'https://1000marcas.net/wp-content/uploads/2020/02/Indiana-Pacers-Color.jpg',
     },
     {
        name: 'Los Angeles Clippers',
        state: 'Los Angeles',
        city: "Los Angeles",
        population: 8098675,
        image: 'https://wallpapercave.com/wp/wp1830240.jpg',
     },
     {
        name: 'Los Angeles Lakers',
        state: 'Los Angeles',
        city: "Los Angeles",
        population: 7758389,
        image: 'https://passion-stickers.com/1855-large_default/xlos-angeles-lakers-nba-decals.jpg.pagespeed.ic.AxCuP9qk9y.jpg',
     },
     {
        name: 'Memphis Grizzlies',
        state: 'Memphis',
        city: "Memphis",
        population: 1234557,
        image: 'https://1000marcas.net/wp-content/uploads/2020/03/Memphis-Grizzlies-logo.jpg',
     },
     {
        name: 'Miami Heat',
        state: 'Florida',
        city: "Miami",
        population: 9988754,
        image: 'https://lh3.googleusercontent.com/proxy/ZLWMfybuVmwexTHGWdNIU3S-b_oj-ZBRh-KkEDsrwvFu6MHF6_-3Z-B3KbmbU_kH6OsDPHTyInU7VEGkV829ccE',
     },
     {
        name: 'Milwaukee Bucks',
        state: 'Milwaukee',
        city: "Milwaukee",
        population: 5757575,
        image: 'https://logos-world.net/wp-content/uploads/2020/05/Milwaukee-Bucks-Symbol-1.png',
     },
     {
        name: 'Minnessota Timberwolves',
        state: 'Minnesota',
        city: "Minnesota",
        population: 1112345,
        image: 'https://logos-marcas.com/wp-content/uploads/2020/06/Minnesota-Timberwolves-Logotipo-2017-Presente.png',
     },
     {
        name: 'New Orleans Pelicans',
        state: 'New Orleans',
        city: "New Orleans",
        population: 2563784,
        image: 'http://assets.stickpng.com/images/58419b9ba6515b1e0ad75a53.png',
     },
     {
        name: 'New York Knicks',
        state: 'New York',
        city: "New York",
        population: 12575563,
        image: 'https://logotyp.us/files/png/new-york-knicks.png',
     },
     {
        name: 'OKC',
        state: 'Oklahoma',
        city: "Oklahoma",
        population: 1112345,
        image: 'https://cdn.shopify.com/s/files/1/0330/9935/0060/products/OKC_63c2337f-a20b-4ceb-bb4a-95cdb10f2406_1024x1024.jpg?v=1590151441',
     },
     {
        name: 'Orlando Magic',
        state: 'Florida',
        city: "Orlando",
        population: 3895863,
        image: 'https://logos-world.net/wp-content/uploads/2020/05/Orlando-Magic-logo.png',
     },
     {
        name: 'Philadelphia 76ers',
        state: 'Philadelphia',
        city: "Philadelphia",
        population: 4659254,
        image: 'https://logos-world.net/wp-content/uploads/2020/05/Philadelphia-76ers-Logo-1978-1997.png',
     },
     {
        name: 'Phoenix Suns',
        state: 'Arizona',
        city: "Phoenix",
        population: 1112345,
        image: 'https://brandlogovector.com/wp-content/uploads/2020/08/Phoenix-Suns-Logo-Small.png',
     },
     {
        name: 'Portland Trail Blazers',
        state: 'Portland',
        city: "Portland",
        population: 7789835,
        image: 'https://logos-world.net/wp-content/uploads/2020/05/Portland-Trail-Blazers-Symbol.png',
     },
     {
        name: 'San Antonio Spurs',
        state: 'Texas',
        city: "San Antonio",
        population: 7892837,
        image: 'https://www.wallpaperup.com/uploads/wallpapers/2014/10/19/487330/5b29c91b8d1c4a28ffab6d43efe1b422-700.jpg',
     },
     {
        name: 'Toronto Raptors',
        state: 'Canada',
        city: "Toronto",
        population: 15098760,
        image: 'http://cdn.shopify.com/s/files/1/0026/5794/3670/products/RaptorsFlag.1_1200x1200.jpg?v=1559148575',
     },
     {
        name: 'Sacramento Kings',
        state: 'Texas',
        city: "Sacramento",
        population: 7892837,
        image: 'https://www.pngitem.com/pimgs/m/458-4586470_small-sacramento-kings-logo-hd-png-download.png',
     },
     {
        name: 'Utah Jazz',
        state: 'Utah',
        city: "Utah",
        population: 9878654,
        image: 'https://www.pngfind.com/pngs/m/537-5378301_utah-jazz-small-logo-hd-png-download.png',
     },
     {
        name: 'Washington Wizards',
        state: 'Washington',
        city: "Washington DC",
        population: 18098638,
        image: 'https://logos-world.net/wp-content/uploads/2020/05/Washington-Wizards-symbol.png',
     },
     
 ];
 
 mongoose
     .connect(db.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(async (dbConnection) => {
      const { name, host } = dbConnection.connection;
      console.log(`El resultado del seed se almacenará en la db ${name} en ${host}`);

         const allTeams = await Team.find();
         
         if (allTeams.length) {

             console.log(`[Find]: Found ${allTeams.length} teams`);
             await Team.collection.drop();
             console.log("[Delete]: Collection dropped correctly...");
         } else {
             console.log('[Find]: Could not find any team')
         }
     })
     .catch(error => console.log('[Error]: Dropping collection -->', error))
     .then(async () => {
         await Team.insertMany(teams);
         console.log('[Success]: New teams added successfully...');
     })
     .catch(error => console.log('[Error]: Adding teams -->', error))
     .finally(() => mongoose.disconnect());
