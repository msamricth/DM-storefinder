const app = document.getElementById('app');
var isVueLoaded,isAxiosLoaded,isAirtableLoaded,isJqueryLoaded;
const observer = new MutationObserver((mutations) => {
  if (mutations[0].attributeName === 'class') { 
    isJqueryLoaded = app.classList.contains('jquery-loaded');
        if(isJqueryLoaded){ 
            (function($) {
                $(".close-alert").click(function(){
                    var self = $(this).parent();
                    self.toggleClass("show");
                });
            })( jQuery );
        }
    }
});
observer.observe(app, { attributes: true });
