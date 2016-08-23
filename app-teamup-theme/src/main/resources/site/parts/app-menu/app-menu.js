var lib2render = require('/lib/rbrastad/lib2render');
var app = require('/lib/app.js');

var libs = {
    portal: require('/lib/xp/portal'),
    content: require('/lib/xp/content'),
    menu: require('/lib/enonic/menu'),
};

function handleGet(req) {
    var site = libs.portal.getSite(); // Current site
    var appContentRoot = libs.content.get({
        key: site["_path"]
    });

    var model = {
        displayName : site.displayName,
        appMenuItems : libs.menu.getSubMenus(appContentRoot,3)
    };

    return lib2render.part.renderView(app.viewAppMenu, model);
}

exports.get = handleGet;