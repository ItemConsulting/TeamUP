var libs = {
    portal: require('/lib/xp/portal'),
    thymeleaf: require('/lib/xp/thymeleaf'),
    content: require('/lib/xp/content'),
    menu: require('/lib/enonic/menu'),
    render2 : require('/lib/rbrastad/lib2render'),
    auth :  require('/lib/xp/auth')
};

// Handle GET request
exports.get = handleGet;

function handleGet(req) {
    var site = libs.portal.getSite(); // Current site
    var content = libs.portal.getContent(); // Current content
    var view = resolve('default.html'); // The view to render

    // convert siteConfig to be an array so it will render 0 to many site apps.
    site.data.siteConfig = libs.render2.util.toArray(site.data.siteConfig);

    // TODO fix dynanmic and exact APP name site config get
    if(site.data.siteConfig[0].config.menuTop != undefined && site.data.siteConfig[0].config.menuTop != '') {
        var siteMenuTop = libs.content.get({
            key: site.data.siteConfig[0].config.menuTop
        });
    }else
        var siteMenuTop = {};

    var model = createModel(); // The model to send to the view

    function createModel() {

        var model = {};
        model.mainRegion = content.page.regions['main'];
        model.sitePath = site['_path'];
        model.currentPath = content._path;
        model.pageTitle = getPageTitle();
        model.metaDescription = getMetaDescription();
        model.menuItems = libs.menu.getMenuTree(3);
        model.siteName = site.displayName;
        model.displayName = content['displayName'].toLowerCase();
        model.copyright = site.data.siteConfig[0].config['copyright'] || null;
        model.facebook = site.data.siteConfig[0].config['facebook'] || null;
        model.twitter = site.data.siteConfig[0].config['twitter'] || null;
        model.linkedin = site.data.siteConfig[0].config['linkedin'] || null;
        model.footerText = site.data.siteConfig[0].config['footerText'] || null;
        model.siteLogo = site.data.siteConfig[0].config['siteLogo'] || null;
        model.siteText = site.data.siteConfig[0].config['siteText'] || null;
        model.siteMenuTopItems = libs.menu.getSubMenus(siteMenuTop,3);
        model.user = libs.auth.getUser();

        return model;
    }

    function getPageTitle() {
        return content['displayName'] + ' - ' + site['displayName'];
    }

    function getMetaDescription() {
        var htmlMeta = getExtradata(content, 'html-meta');
        var metaDescription = htmlMeta.htmlMetaDescription || '';
        return metaDescription;
    }

    function getExtradata(content, property) {
        var appNamePropertyName = app.name.replace(/\./g,'-');
        // Short way of getting nested objects
        // http://blog.osteele.com/posts/2007/12/cheap-monads/
        var extraData = ((content.x || {})[appNamePropertyName] || {})[property] || {};
        return extraData;
    }

    //log.info('%s', JSON.stringify( model.menuItems , null, 2));

    return {
        body: libs.thymeleaf.render(view, model)
    };
}