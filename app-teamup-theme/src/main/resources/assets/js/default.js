
var SidebarToggler = {
    hide: function(){
       $("#wrapper").removeClass("toggled");
    },
    show: function(){
        $("#wrapper").removeClass("toggled");
        $("#wrapper").addClass("toggled");
    },
    toggle: function(){
        if(  $("#wrapper").hasClass("toggled") ){
            SidebarToggler.hide();
        }else{
            SidebarToggler.show();
        }
    }

};


(function ($) {

//  Login modal
    $('#loginModalLink').bind('click', function(event) {
        $( '#login-modal' ).modal();
    });

    // Side menu enable metismenu
    $("#side-menu").metisMenu();

    // Toggle sidemenu button event
    $("#toggle-nav").click(function(e) {
        e.preventDefault();
       SidebarToggler.toggle();
    });

    $("#toggle-nav-small-devices").click(function(e) {
        e.preventDefault();
        SidebarToggler.toggle();
    });

    // Auto toggle sidemenu when page is loaded fits time
    if (Response.deviceW() <= 768) {
        SidebarToggler.hide();
    }

    // Auto toggle sidemenu when resolution changes.
    Response.resize(function() {
        if ( Response.band(1200) )
        {
            //console.log("1200+")
            SidebarToggler.show();
        }
        else if ( Response.band(992) )
        {
            console.log("992+")
            SidebarToggler.show();
        }
        else if ( Response.band(768) )
        {
            console.log("768+");
            SidebarToggler.hide();
        }
        else
        {
            console.log("0->768")
            SidebarToggler.hide();
        }
    });

})(jQuery);