var pageURL = window.location.href;
import { load_storePage } from "./store-locator/store-page.js";


if (pageURL.indexOf("?") > -1) {
  load_store();
}
function load_store() {
  const SP_slug = location.search.substring(1);
  const app = document.getElementById('app');
  app.classList.add('store-page');
  var isAxiosLoaded, isAirtableLoaded;
  const observer = new MutationObserver((mutations) => {
    if (mutations[0].attributeName === 'class') {

      isAxiosLoaded = app.classList.contains('axios-loaded');
      isAirtableLoaded = app.classList.contains('airtable-loaded');


      if (isAxiosLoaded) {
        if (isAirtableLoaded) {
          load_storePage(SP_slug);

          OBSDisconnect();
        }
      }
    }
  });
  observer.observe(app, { attributes: true });
  function OBSDisconnect() {
    observer.disconnect();
  }
}