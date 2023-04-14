(function($) {
    $(".close-alert").click(function(){
        var self = $(this).parent();
        self.removeClass("show");
    });
})( jQuery );
