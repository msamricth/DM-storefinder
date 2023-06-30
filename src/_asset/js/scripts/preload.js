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
    isMapboxLoaded = app.classList.contains('mapbox-loaded');

        
    if(isMapboxLoaded){
        preloader.style.display = "none";
        console.log('preloader should have dipped');
    }
}
hidePreloader();