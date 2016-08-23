var lib2render = require('/lib/rbrastad/lib2render');
var app = require('/lib/app.js');

function handleGet(req) {
    var componentContent = lib2render.part.resolveComponentContent();

    if( lib2render.util.notEmptyOrNull(componentContent.component.config.banners ) ) {
        var bannerArray = lib2render.util.sortRandomSlice(componentContent.component.config.banners, 0, 1)

        var banner = bannerArray;
        if ( Array.isArray(bannerArray) ) {
            banner = bannerArray[0];
        }

        banner.backgroundImageURL= lib2render.util.getImageUrl(banner.backgroundImage, '(1,1)');

        var content = {
            component: componentContent,
            banner: banner
        };

        var pageContributions = {
            "bodyEnd": ['<script type="text/javascript">$( document ).ready(function() { $("nav").removeClass("navbar-shrink") });</script>']
        };

        return lib2render.part.renderView( app.viewBanner , content, pageContributions);
    }else
        return lib2render.part.renderView( app.view412 , null);

}

exports.get = handleGet;
