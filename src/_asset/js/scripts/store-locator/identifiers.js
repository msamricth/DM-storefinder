const app = document.getElementById('app');
var mq = window.matchMedia("(max-width: 460px)");

var mq1 = window.matchMedia("(max-width: 1024px)");
var mq2 = window.matchMedia("(max-width: 1360px)");
var SMZoom, SMMZoom;
if (mq.matches) {
  SMZoom = 1.5,
    SMMZoom = 0;
} else {
  if (mq1.matches) {
    SMZoom = 2.4,
      SMMZoom = 2;
  } else if (mq2.matches) {
    SMZoom = 2.6,
      SMMZoom = 2.2;
  } else {
    SMZoom = 3.5,
      SMMZoom = 3.2;
  }
};
const MBaccessToken =
  "pk.eyJ1IjoiZW1tLXN1cHBseSIsImEiOiJjbGYwMXN1YTEwNHIwNDNwZzZqYmpnbXNnIn0.jbtZE6fXhOgKTWFsPHeDNg";

const bounds = [
  [-125.97881615167792, 29.487440618804314], // Southwest coordinates
  [-39.11807460657073, 48.86784324437724] // Northeast coordinates
];
const dt = new Date();
const current_day_of_week = dt.getDay();
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const weekdaySH = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat", "Sun"];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const month = months[dt.getMonth()];
const currentDate = dt.getDate();
const listings = document.getElementById("listings");
const pageURL = window.location.href;
const mapContainr = document.getElementById('map');
const preloader = document.querySelector('.storemap-preloader');
const storePageClass = document.querySelector('.store-page-container');
const appClassList = app.classList;
export { 
  app, 
  SMZoom, 
  SMMZoom, 
  mapContainr, 
  preloader,
  pageURL, 
  appClassList, 
  storePageClass, 
  bounds, 
  MBaccessToken,
  listings, 
  dt,
  current_day_of_week,
  weekday,
  weekdaySH,
  months,
  month,
  currentDate 
}