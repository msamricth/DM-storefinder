import { load_storePage } from "./store-page.js";
/**
 * Add a listing for each store to the sidebar.
 **/


function flyToStoreAndChange(currentFeature, map) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 10
  });
  goToStorePage(currentFeature, map);
}
function goToStorePage(currentFeature, map) {
  const pageTitle = currentFeature.properties.name;
  let pageURL = currentFeature.properties.slug;
  const pageID = currentFeature.properties.id;
  var storeLandingURL = window.location.href;
  if (storeLandingURL.indexOf("?") > -1) {
    storeLandingURL = storeLandingURL.split("?")[0];
  }
  if (storeLandingURL.indexOf("#") > -1) {
    storeLandingURL = window.location.href.split("#")[0];
  }

  setTimeout(function () {
    load_storePage(pageURL, map, "true");
  }, 400);
}



function toggle(className, displayState) {
  var elements = document.getElementsByClassName(className);
  for (var i = 0; i < elements.length; i++) {
    if (displayState == "hide") {
      elements[i].classList.add("hide-marker");
    } else {
      elements[i].classList = "marker";
    }
  }
}
/**
 * Create a Mapbox GL JS `Popup`.
 **/
function createPopUp(currentFeature) {
  const popUps = document.getElementsByClassName("mapboxgl-popup");
  if (popUps[0]) popUps[0].remove();
  const popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML(
      `<h3>${currentFeature.properties.name}</h3><h4>${currentFeature.properties.address}</h4>`
    );
  //   .window.location.href = addTo(map);
}
function fadeElementsIn() {
  var elements = document.getElementsByClassName("fade-map-elements");
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add("show");
  }
}
function markerCheck(zoomLvl) {
  if (zoomLvl < 14) {
    toggle("mapMarker", "hide"); // hides
  } else {
    toggle("mapMarker", "show"); // Shows
  }
}

function matchZoom(map) {
  var mq = window.matchMedia("(max-width: 460px)");
  var mq1 = window.matchMedia("(max-width: 1024px)");
  var mq2 = window.matchMedia("(max-width: 1360px)");
  var SMZoom, SMMZoom;
  if (mq.matches) {
    (SMZoom = 1.8), (SMMZoom = 0);
  } else {
    if (mq1.matches) {
      (SMZoom = 2.6), (SMMZoom = 2.2);
    } else if (mq2.matches) {
      (SMZoom = 2.6), (SMMZoom = 2.2);
    } else {
      (SMZoom = 3.5), (SMMZoom = 3.2);
    }
  }
  map.setZoom(SMZoom);
  map.setMinZoom(SMMZoom);
}
/**
 * Use Mapbox GL JS's `flyTo` to move the camera smoothly
 * a given center point.
 **/
function flyToStore(currentFeature, map) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 10
  });
}
export {
  matchZoom,
  markerCheck,
  flyToStoreAndChange,
  toggle,
  fadeElementsIn,
  createPopUp,
  flyToStore
};
