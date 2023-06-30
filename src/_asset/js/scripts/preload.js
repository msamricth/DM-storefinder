const app = document.getElementById('app');
var isVueLoaded,isAxiosLoaded,isAirtableLoaded,isJqueryLoaded,isMapboxLoaded;
const preloader = document.querySelector('.storemap-preloader');
const observer = new MutationObserver((mutations) => {
    if (mutations[0].attributeName === 'class') { 
        
        
        setTimeout(
            function() {
                hidePreloader();
        }, 700);
  
                    }
                
});
observer.observe(app, { attributes: true });
function hidePreloader() {
    isMapLoaded = app.classList.contains('listings-completed');

        
    if(isMapLoaded){
        preloader.style.display = "none";
    }
}
hidePreloader();