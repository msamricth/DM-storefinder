const app = document.getElementById('app');
var isVueLoaded,isAxiosLoaded,isAirtableLoaded,isJqueryLoaded,isMapboxLoaded;
var preloader = document.querySelector('.storemap-preloader');
const observer = new MutationObserver((mutations) => {
    if (mutations[0].attributeName === 'class') { 
        hidePreloader();
  
                    }
                
});
observer.observe(app, { attributes: true });
function hidePreloader() {
    isMapLoaded = app.classList.contains('listings-completed');
    isStorePageLoaded = app.classList.contains('event-container-added');

        
    if(isMapLoaded){
        preloader.style.display = "none";
    }
    if(isStorePageLoaded){
        preloader.style.display = "none";
    }
}
hidePreloader();