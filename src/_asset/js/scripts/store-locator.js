import { startApp2 } from "./store-locator/locator.js";


const app = document.getElementById('app');
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
            if(isMapboxLoaded){
              if (!app.classList.contains("store-page")) {
                startApp2();
                OBSDisconnect();
              }
            }
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
