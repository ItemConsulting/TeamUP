var lib2render = require('/lib/rbrastad/lib2render');
var app = require('/lib/app.js');
var portalLib = require('/lib/xp/portal');

function handleGet(req) {
    var content = portalLib.getContent();

    var params = {
        data: content.data
    };

    return lib2render.part.renderView( app.pageUnStructuredViewer , params);
}

exports.get = handleGet;