const express = require("express");
const Team = require("../models/Team.model");
const Player = require("../models/Player.model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const teams = await Team.find().populate('players');

    return res
      .status(200)
      .render("./teams/teams", { teams, title: "All NBA Teams" });
  } catch (error) {
    return next(error);
  }
});

//Comento todo este código porque ya están los 30 equipos creados ya que no puede haber mas de esos

// router.post("/create", async (req, res, next) => {
//   try {
//     const { name, state } = req.body;

//     const newTeam = new Team({ name, state });

//     const createdTeam = await newTeam.save();

//     console.log("Team created", createdTeam);

//     return res.status(201).json(createdTeam);
//   } catch (error) {
//     return next(error);
//   }
// });



router.put("/add-player", async (req, res, next) => {
  try {
    const { teamId, playerId } = req.body;

    if (!teamId || !playerId) {
      const error = new Error("Missing arguments");
      error.status = 400;
      throw error;
    }

    

    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      {
        $addToSet: { players: playerId },
      },
      { new: true }
    );

    return res.status(200).json(updatedTeam);
  } catch (error) {
    return next(error);
  }
});

//búsqueda por id de equipo
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const team = await Team.findById(id);

    return res.status(200).render('./teams/team', { team });

    
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
