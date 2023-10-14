var pageURL = window.location.href;
import { load_storePage } from "./store-locator/store-page.js";

            
if (pageURL.indexOf("?") > -1) {
    const SP_slug = location.search.substring(1);
    const app = document.getElementById('app');
    app.classList.add('store-page');
    var isVueLoaded,isAxiosLoaded,isAirtableLoaded,isJqueryLoaded,isMapboxLoaded;
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
                load_storePage(SP_slug);
                
                OBSDisconnect();
              }
            }
          }
        }
      }
    });
    observer.observe(app, { attributes: true });
    function OBSDisconnect(){
        observer.disconnect();
    }
    
}
