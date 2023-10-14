import { load_storePage } from "./store-page.js";
import { app } from "./identifiers.js";

/**
 * Add a listing for each store to the sidebar.
 **/
function buildLocationList(stores, directionIcon, map) {
    for (const store of stores.features) {
      /* Add a new listing section to the sidebar. */
      const listings = document.getElementById("listings");
      const listing = listings.appendChild(document.createElement("div"));
      /* Assign a unique `id` to the listing. */
      listing.id = `listing-${store.properties.id}`;
      /* Assign the `item` class to each listing for styling. */
      listing.className = "item";
      const link = listing.appendChild(document.createElement("a"));
      link.href = "#";
      link.className = "title";
      link.id = `link-${store.properties.id}`;
      /* Add details to the individual listing. */
      const detailsContainer = listing.appendChild(document.createElement("div"));
      detailsContainer.className = "listing-content";
      /* Add the link to the individual listing created above. */
  
      const details = detailsContainer.appendChild(document.createElement("div"));
  
      details.className = "listing-details";
      var storeDistance = "";
      if (store.properties.distance) {
        const roundedDistance = Math.round(store.properties.distance * 100) / 100;
        storeDistance = ` <strong>${roundedDistance} miles away</strong> - `;
      }
      details.innerHTML = "<h3>" + `${store.properties.name}` + "</h3>";
      details.innerHTML +=
        "<small>" + storeDistance + `${store.properties.address}` + "</small>";
      if (store.properties.hours) {
        details.innerHTML +=
          "<strong>" + `${store.properties.hours}` + "</strong>";
      }
  
      const meta = detailsContainer.appendChild(document.createElement("div"));
  
      var containerPhone = `${store.properties.phoneFormatted}`,
        containerAddress = `${store.properties.address}`;
  
      if (containerPhone) {
        containerPhone = encodeURIComponent(containerPhone);
      }
      if (containerAddress) {
        containerAddress = encodeURIComponent(containerAddress);
      }
      var containerhref =
        "https://www.google.com/maps/dir/?api=1&destination=" + containerAddress;
      meta.className = "meta-details";
      meta.innerHTML +=
        "<a href='" +
        containerhref +
        "' target='_blank'><img class='results-icon' src='" +
        directionIcon +
        "'/></a>";
  
      /**
       * Listen to the element and when it is clicked, do four things:
       * 1. Update the `currentFeature` to the store associated with the clicked link
       * 2. Fly to the point
       * 3. Close all other popups and display popup for clicked store
       * 4. Highlight listing in sidebar (and remove highlight for all other listings)
       **/
      link.addEventListener("click", function (event) {
        event.preventDefault();
        for (const feature of stores.features) {
          if (this.id === `link-${feature.properties.id}`) {
            flyToStoreAndChange(feature, map);
            const sidebar = document.querySelector(".sidebar");
            sidebar.classList.remove("search-suggestions-displayed");
          }
        }
        const activeItem = document.getElementsByClassName("active");
        if (activeItem[0]) {
          activeItem[0].classList.remove("active");
        }
        this.parentNode.classList.add("active");
      });
    }
  
    app.classList.add("listings-completed");
}

function flyToStoreAndChange(currentFeature, map) {
    map.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 10
    });
    goToStorePage(currentFeature, map);
}
function goToStorePage(currentFeature, map){
    const pageTitle = currentFeature.properties.name;
    let pageURL =  currentFeature.properties.slug;
    const pageID = currentFeature.properties.id;
    var storeLandingURL = window.location.href;
    if (storeLandingURL.indexOf("?") > -1) {
      storeLandingURL = storeLandingURL.split('?')[0];
    }
    if (storeLandingURL.indexOf("#") > -1) {
      storeLandingURL = window.location.href.split('#')[0]
    }

    setTimeout(
        function() {
            load_storePage(pageURL, map, 'true');
        }, 
    400);
}



function resetStoreListOnZoomOut(zoom, stores, directionIcon, map) {
  if (zoom > 8) {
      buildLocationList(stores, directionIcon, map);
  }
}

const markers = {};
let markersOnScreen = {};

function updateClusters(map, stores) {
  const newMarkers = {};
  const features = map.querySourceFeatures("places");

  // for every cluster on the screen, create an HTML marker for it (if we didn't yet),
  // and add it to the map if it's not there already
  for (const feature of features) {
    const coords = feature.geometry.coordinates;
    const props = feature.properties;
    if (!props.cluster) continue;
    const id = props.cluster_id;
    let marker = markers[id];
    if (!marker) {
      var el = document.createElement("div");
      el.classList.add("mapCluster");
      el.innerText = props.point_count;
      marker = markers[id] = new mapboxgl.Marker({
        element: el
      }).setLngLat(coords);
      el.addEventListener("click", (e) => {
        const clusterId = feature.properties.cluster_id;
        SortListingsOnMapLoc(coords, stores);
        console.log(coords);
        map
          .getSource("places")
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;
            var Currentzoom = map.getZoom(),
              zoomTO,
              midLvlZoom = 7;
            if (Currentzoom >= midLvlZoom) {
              zoomTO = Currentzoom * 1.5;
            } else {
              zoomTO = midLvlZoom;
            }
            map.easeTo({
              center: feature.geometry.coordinates,
              speed: 0.2,
              //curve: 1,
              duration: 2500,
              zoom: zoomTO
            });
            // map.setZoom(zoomTO);
          });
      });
    }
    newMarkers[id] = marker;

    if (!markersOnScreen[id]) marker.addTo(map);
  }
  // for every marker we've added previously, remove those that are no longer visible
  for (const id in markersOnScreen) {
    if (!newMarkers[id]) markersOnScreen[id].remove();
  }
  markersOnScreen = newMarkers;
}

function SortListingsOnMapLoc(position, stores) {
  var usrCoordinates = {
    type: "Point",
    coordinates: [position[0], position[1]]
  };

  const searchResult = usrCoordinates;
  const options = { units: "miles" };
  for (const store of stores.features) {
    store.properties.distance = turf.distance(
      searchResult,
      store.geometry,
      options
    );
  }

  stores.features.sort((a, b) => {
    if (a.properties.distance > b.properties.distance) {
      return 1;
    }
    if (a.properties.distance < b.properties.distance) {
      return -1;
    }
    return 0; // a must be equal to b
  });
  const listings = document.getElementById("listings");
  while (listings.firstChild) {
    listings.removeChild(listings.firstChild);
  }
  buildLocationList(stores);
  const activeListing = document.getElementById(
    `listing-${stores.features[0].properties.id}`
  );
  activeListing.classList.add("active");
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
    )
  //   .window.location.href = addTo(map);
}
function fadeElementsIn(){
  var elements = document.getElementsByClassName('fade-map-elements');
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add("show");
  }
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
export { flyToStoreAndChange, updateClusters, SortListingsOnMapLoc, buildLocationList, resetStoreListOnZoomOut, toggle, fadeElementsIn, createPopUp, flyToStore };
