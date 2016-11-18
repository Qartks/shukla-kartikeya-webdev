module.exports = function () {
    var mongoose = require("mongoose");
    var PageSchema = mongoose.Schema({
        _website : mongoose.Schema.Types.ObjectId,
        name : String,
        title : String,
        description : String,
        widgets : [mongoose.Schema.Types.ObjectId],
        dateCreated : { type: Date, default : Date.now}
    });

    return PageSchema;
}