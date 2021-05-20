let express = require("express");
let favorites = express.Router();
let usrSchema = require("../usrSchema");

favorites.post("/", async (req, res) => {
  try {
    const usrData = await usrSchema.find({
      _id: req.body.clientID,
    });

    let favorites = usrData[0].favorites;

    // caso favAction = 1, inserir personagem aos favoritos
    // senao, remover o personagem
    if (req.body.favAction === "1") {
      favorites.push(req.body.charID);
    } else {
      const index = favorites.indexOf(req.body.charID);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    }

    let updateFavorites = await usrSchema.updateOne(
      { _id: req.body.clientID },
      { $set: { favorites: favorites } }
    );

    console.log(updateFavorites);

    res.json(updateFavorites);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = favorites;
