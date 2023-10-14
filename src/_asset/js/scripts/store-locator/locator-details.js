import { updateClusters, resetStoreListOnZoomOut, toggle, flyToStoreAndChange } from "./locator-functions.js";

function mapLoad(){
    
}

function mapUnclusteredClick(map){
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


function mapActions(map, stores, directionIcon){

    map.on("render", () => {
    // updateMarkers();
        updateClusters(map);
    });
    map.on("zoom", () => {
        //updateMarkers();
        var Currentzoom = map.getZoom();
        resetStoreListOnZoomOut(Currentzoom, stores, directionIcon, map);
    //  updateClusters();

      if (Currentzoom < 14) {
        toggle("mapMarker", "hide"); // hides
      } else {
        toggle("mapMarker", "show"); // Shows
      }
    });
    map.on("mouseenter", "unclustered-point", () => {
        map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "unclustered-point", () => {
        map.getCanvas().style.cursor = "";
    });
}

function mainClusters(map, markerIMG, stores){
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
import { flyToStore, createPopUp, buildLocationList } from "./locator-functions.js";

  
  function geoFindMe(stores, map) {
    function success(position) {
  //    status.textContent = "";
      
      var usrCoordinates = {
        type: "Point",
        coordinates: [
          position.coords.longitude,
          position.coords.latitude
        ]
      };
      const searchResult = usrCoordinates;
      const options = { units: 'miles' };
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
      const listings = document.getElementById('listings');
      while (listings.firstChild) {
        listings.removeChild(listings.firstChild);
      }
      buildLocationList(stores, directionIcon, map);
      const activeListing = document.getElementById(
        `listing-${stores.features[0].properties.id}`
      );
      activeListing.classList.add('active');
     // closeAlrt();
    if(stores.features[0]){
      flyToStore(stores.features[0], map)
      createPopUp(stores.features[0]);
    }
      
    }
    function error() {
     // status.textContent = "Unable to retrieve your location";
    }
  
    if (!navigator.geolocation) {
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  //  closeAlrt();
  }
  export { geoFindMe, mainClusters, mapActions, mapUnclusteredClick }