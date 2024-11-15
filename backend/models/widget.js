const mongoose = require("mongoose")



const widgetSchema = mongoose.Schema({

});

const Widget = mongoose.model("widgets", widgetSchema)

module.exports = Widget