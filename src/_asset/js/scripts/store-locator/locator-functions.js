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
  }, 100);
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
var decodeEntities = (function () {
  // this prevents any overhead from creating the object each time
  var element = document.createElement('div');

  function decodeHTMLEntities(str) {
    if (str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  }

  return decodeHTMLEntities;
})();

var dt = new Date(),
  current_time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds(),
  current_day_of_week = new Date().getDay();

function mapUnclusteredClick(map) {
  map.on("click", "unclustered-point", (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const props = e.features[0].properties;
    if (!props.cluster) {
      // Ensure that if the map is zoomed out such that
      // multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      flyToStoreAndChange(e.features[0], map);
      /* Close all other popups and display popup for clicked store */
      /* Highlight listing in sidebar 
    */
      const activeItem = document.getElementsByClassName("active");
      // e.stopPropagation();
      if (activeItem[0]) {
        activeItem[0].classList.remove("active");
      }
      const listing = document.getElementById(
        `listing-${e.features[0].properties.id}`
      );
      listing.classList.add("active");
    }
  });
}

function mainClusters(map, markerIMG, stores) {
  map.loadImage(markerIMG, (error, image) => {
    if (error) throw error;
    map.addImage("pin", image);
    map.addSource("places", {
      type: "geojson",
      data: stores,
      cluster: true,
      clusterMaxZoom: 12, // Max zoom to cluster points on
      clusterRadius: 12 // Radius of each cluster when clustering points (defaults to 50)
    });
    map.addLayer({
      id: "clusters",
      type: "circle",
      source: "places",
      filter: ["has", "point_count"]
    });
    map.addLayer({
      id: "unclustered-point",
      source: "places",
      filter: ["!", ["has", "point_count"]],
      type: "symbol",
      layout: {
        "icon-image": "pin", // reference the image
        "icon-size": 0.25
      }
    });
  });
}

export {
  matchZoom,
  markerCheck,
  flyToStoreAndChange,
  toggle,
  fadeElementsIn,
  createPopUp,
  flyToStore,
  decodeEntities,
  mainClusters,
  mapUnclusteredClick
};
