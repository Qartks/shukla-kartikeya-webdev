module.exports = function () {

    var mongoose = require('mongoose');
    var connectionString = 'mongodb://localhost/webdev';

    if(process.env.MLAB_PASSWORD) {
        connectionString = 'mongodb://' +
            process.env.MLAB_USERNAME + ':' +
            process.env.MLAB_PASSWORD +
            '@ds013916.mlab.com:13916/web-dev-kartikeya-db';
    }
    mongoose.connect(connectionString);

    var userModel = require('./user/user.model.server')();
    var websiteModel = require('./website/website.model.server')();
    var pageModel = require('./page/page.model.server')();
    var widgetModel = require('./widget/widget.model.server')();

    var model = {
        userModel : userModel,
        websiteModel : websiteModel,
        pageModel : pageModel,
        widgetModel : widgetModel
    };

    userModel.setModel(model);
    websiteModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

    return model;




}