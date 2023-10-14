const app = document.getElementById('app');
var mq = window.matchMedia( "(max-width: 460px)" );
              
var mq1 = window.matchMedia( "(max-width: 1024px)" );
var mq2 = window.matchMedia( "(max-width: 1360px)" );
var SMZoom, SMMZoom;
if (mq.matches){
  SMZoom = 1.5,
  SMMZoom = 0;
} else {
    if (mq1.matches){ 
      SMZoom = 2.4,
      SMMZoom = 2;
    } else if (mq2.matches){ 
      SMZoom = 2.6,
      SMMZoom = 2.2;
    } else {
      SMZoom = 3.5,
      SMMZoom = 3.2;
    }
};
const pageURL = window.location.href;
const mapContainr = document.getElementById('map');
const preloader = document.querySelector('.storemap-preloader');
const appClassList = app.classList;
export { app, SMZoom, SMMZoom, mapContainr, preloader, pageURL, appClassList }