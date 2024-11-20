var express = require("express");
var router = express.Router();

require("../models/connection.js");
const Widget = require("../models/widget.js");
const { checkBody } = require("../modules/checkBody.js");

//creation d'un widget
router.post("/NewWidgets", (req, res) => {
  try {
    if (!checkBody(req.body, ["name", "description", "category"])) {
      res.json({ result: false, error: "champ vide" });
      return;
    }

    Widget.findOne({ name: new RegExp(req.body.name, "i") })
      .then((data) => {
        if (data === null) {
          const newWidget = new Widget({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            status: req.body.status,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt,
            ownerId: req.body.ownerId,
          });
          newWidget
            .save()
            .then((data) => {
              res.json({ result: true, widget: data });
            })
            .catch((error) => {
              console.error(
                "Erreur lors de l'enregistrement du widget:",
                error
              );
              res.json({
                result: false,
                error: "Erreur lors de l'enregistrement",
              });
            });
        } else {
          res.json({ result: false, error: "Widget déjà existant" });
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche du widget:", error);
        res.json({
          result: false,
          error: "Erreur lors de la recherche du widget",
        });
      });
  } catch (error) {
    console.error("Erreur:", error);
    res.json({ result: false, error: "Erreur" });
  }
});

//maj widget
router.put("/widgetsUpdated/:id", async (req, res) => {
  try {
    const widgetId = req.params.id;
    const updateData = req.body;

    const updatedWidget = await Widget.findByIdAndUpdate(widgetId, updateData, {
      new: true,
    });

    if (updatedWidget) {
      res.status(200).json(updatedWidget);
    } else {
      res.status(404).json({ message: "Widget non trouvé" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du widget", error });
  }
});

//delete widget

router.delete("/widgets/:id", async (req, res) => {
  try {
    const widgetId = req.params.id;

    const deletedWidget = await Widget.findByIdAndDelete(widgetId);

    if (deletedWidget) {
      res.status(200).json({ message: "Widget supprimé avec succès" });
    } else {
      res.status(404).json({ message: "Widget non trouvé" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du widget", error });
  }
});

module.exports = router;
