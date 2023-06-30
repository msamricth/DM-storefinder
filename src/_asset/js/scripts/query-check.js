function getPathFromUrl(url) {
    return url.split(/[?#]/)[0];
}
const $pageURL = window.location.href
if ($pageURL.indexOf("?fbclid") > -1) {
    window.location.href = getPathFromUrl($pageURL)
}

const app = document.getElementById('app');
var isVueLoaded,isAxiosLoaded,isAirtableLoaded,isJqueryLoaded,isMapboxLoaded;
var preloader = document.querySelector('.storemap-preloader');
const observer = new MutationObserver((mutations) => {
    if (mutations[0].attributeName === 'class') { 
        
        isVueLoaded = app.classList.contains('vue-loaded');
        isAxiosLoaded = app.classList.contains('axios-loaded');
        isAirtableLoaded = app.classList.contains('airtable-loaded');
        isJqueryLoaded = app.classList.contains('jquery-loaded');
        isMapboxLoaded = app.classList.contains('mapbox-loaded');

        
        if(isVueLoaded){
            if(isAxiosLoaded){
                if(isAirtableLoaded){
                    if(isJqueryLoaded){ 
                        if(isMapboxLoaded){
                            preloader.style.display = "none";
                        }
                    }
                }
            }
        }
    }
});