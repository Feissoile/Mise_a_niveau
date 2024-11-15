var express = require('express');
var router = express.Router();

require("../models/connection.js");
const Widget = require("../models/user.js");


//requete pour mettre a jour un widget
router.put('/widgets/:id', async (req, res) => {
    try {
      const widgetId = req.params.id;
      const updateData = req.body; 
  
      const updatedWidget = await Widget.findByIdAndUpdate(widgetId, updateData, { new: true });
  
      if (updatedWidget) {
        res.status(200).json(updatedWidget);
      } else {
        res.status(404).json({ message: 'Widget non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour du widget', error });
    }
  });


  //requete pour supprimmer un widget

  router.delete('/widgets/:id', async (req, res) => {
    try {
      const widgetId = req.params.id;
  
      const deletedWidget = await Widget.findByIdAndDelete(widgetId);
  
      if (deletedWidget) {
        res.status(200).json({ message: 'Widget supprimé avec succès' });
      } else {
        res.status(404).json({ message: 'Widget non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression du widget', error });
    }
  });
  
  module.exports = router;