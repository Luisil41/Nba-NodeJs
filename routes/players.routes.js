const express = require("express");
const Player = require("../models/Player.model");
const { isAuth, isAdmin } = require("../middlewares/auth.middleware");
const { upload, uploadToCloudinary } = require("../middlewares/file.middleware");


const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const {isAuth} = req;
    const players = await Player.find();

    return res.status(200).render('./players/players', { players, title: 'All NBA Players', isAuth } );
  } catch (error) {
    return next(error);
  }
});

router.get('/create', (req, res, next) => {
  return res.status(200).render('./players/create-player');
})

//cada vez que mandamos un post recuperamos la info en req.body
router.post("/create", async (req, res, next) => {
  try {
    const { name, number, team, isAllStar } = req.body;
    
    const newPlayer = new Player({ name, number, team, isAllStar: isAllStar === 'on' ? true : false });

    const createdPlayer = await newPlayer.save();

    console.log("Player created", createdPlayer);

    return res.redirect(`/players/${createdPlayer._id}`);
  } catch (error) {
    return next(error);
  }
});

router.get("/players/:id/edit", async (req, res, next) => {

  try{
    const Player = await Player.findById(req.params.id);
    return res.render('./players/edit-player', { player });
  } catch (error) {
    return next(error);

  }
})

//Creo este put por si el jugador es fichado por otro equipo, solo permito modificar el campo equipo
router.put("/edit", async (req, res, next) => {
  console.log(req.body);
  try {
    const { team, id } = req.body;
    //primer parametro id a editar y luego mongoose nos dice el objeto que queremos editar haciendo ref al modelo
    //con new true lo que nos va a devolver la función es el nuevo objeto que está actualizado, si no lo ponemos nos manda lo que había en la DB
    const updatedPlayer = await Player.findByIdAndUpdate(
      id,
      { team },
      { new: true }
    );

    console.log(updatedPlayer);
    return res.send("OK");
  } catch (error) {
    return next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await Player.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json("The player you wanted to delete does not exist");
    } else {
      return res.redirect('/players');
    }
  } catch (error) {
    return next(error);
  }
});

//búsqueda por id de jugador
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const player = await Player.findById(id);
    
    return res.status(200).render('./players/player',{ player } );

  } catch (error) {
  return next(error);
  };
});

module.exports = router;
