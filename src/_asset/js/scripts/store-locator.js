import { startApp2 } from "./store-locator/locator.js";


const app = document.getElementById('app');
var isVueLoaded, isAxiosLoaded, isAirtableLoaded, isJqueryLoaded, isMapboxLoaded;
const observer = new MutationObserver((mutations) => {
  if (mutations[0].attributeName === 'class') {

    isAxiosLoaded = app.classList.contains('axios-loaded');
    isAirtableLoaded = app.classList.contains('airtable-loaded');
    isMapboxLoaded = app.classList.contains('mapbox-loaded');


    if (isAxiosLoaded) {
      if (isAirtableLoaded) {
        if (isMapboxLoaded) {
          if (!app.classList.contains("store-page")) {
            window.scrollTo(0, 0);
            startApp2();
            OBSDisconnect();
          }
        }
      }
    }
  }
});
observer.observe(app, { attributes: true });

function OBSDisconnect() {
  observer.disconnect();
}
