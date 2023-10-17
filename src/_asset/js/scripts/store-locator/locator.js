import { SMZoom, SMMZoom, mapContainr, preloader, bounds, MBaccessToken  } from "./identifiers.js";
import { fadeElementsIn, markerCheck, matchZoom } from "./locator-functions.js";
import {
  mapUnclusteredClick,
  mainClusters, 
  locationInternal
} from "./locator-details.js";
import { decodeEntities, closingTimeDisplay } from "./functions.js";
var map,
  Sfields,
  markerIMG,
  page_title,
  directionIcon,
  phoneIcon,
  ctaIcon,
  search_storeIcon,
  search_markerIcon;
function startApp2(pushPage = null) {
  var stores = new Vue({
    el: "#map",
    name: "store-locator-app",
    data() {
      return {
        rfields: [],
        markerIMG: null,
        defaultStoreIMG: null,
        Sfields: [],
        page_title: null
      };
    },
    filters: {
      footerdecimal(value) {
        return value.toFixed(2);
      }
    },
    mounted() {
      axios
        .get(
          "https://api.airtable.com/v0/app7o6tSJG6UICys8/Settings?view=API",
          {
            headers: {
              Authorization:
                "Bearer patH2pzfuG2mbHzqd.18833d9077176b68bdf8f7c436376fc5d4962b4df98e82ffb1cf0ed3cedd64e5"
            }
          }
        )
        .then((response) => {
          page_title = response.data.records[0].fields.page_title;
          document.title = page_title;
          if (pushPage) {
            const nextURL = window.location.href.split("?")[0];
            const nextTitle = decodeEntities(page_title);
            const nextState = {
              additionalInformation: "Updated the URL with JS"
            };
            window.history.pushState(nextState, nextTitle, nextURL);
          }
          Sfields = response.data.records[0].fields;
          markerIMG = Sfields.marker_image[0].url;
          directionIcon = Sfields.direction[0].url;
          phoneIcon = Sfields.phone[0].url;
          search_storeIcon = Sfields.search_store[0].url;
          ctaIcon = Sfields.cta[0].url;
          search_markerIcon = Sfields.search_marker[0].url;
          var css =
            ".map-container .marker {background-image: url(" +
            markerIMG +
            ");}",
            head = document.head || document.getElementsByTagName("head")[0],
            style = document.createElement("style");
          head.appendChild(style);
          style.type = "text/css";
          if (style.styleSheet) {
            // This is required for IE8 and below.
            style.styleSheet.cssText = css;
          } else {
            style.appendChild(document.createTextNode(css));
          }
          axios
            .get(
              "https://api.airtable.com/v0/app7o6tSJG6UICys8/Stores?view=API",
              {
                headers: {
                  Authorization:
                    "Bearer patH2pzfuG2mbHzqd.18833d9077176b68bdf8f7c436376fc5d4962b4df98e82ffb1cf0ed3cedd64e5"
                }
              }
            )
            .then((response) => {
              this.rfields = response.data.records;
              var theRecords = this.rfields;
              mapboxgl.accessToken = MBaccessToken;
              var map;
              if (mapContainr) {
                map = new mapboxgl.Map({
                  container: "map",
                  style: "mapbox://styles/mapbox/light-v11",
                  center: [-98.034084142948, 38.909671288923],
                  projection: "mercator",
                  zoom: SMZoom,
                  minZoom: SMMZoom
                  //maxBounds: bounds
                });
              }
              var stores = {
                type: "FeatureCollection",
                features: []
              };
              window.addEventListener("resize", matchZoom);
              for (var i = 0; i < theRecords.length; i++) {
                const closing_time_display = closingTimeDisplay(theRecords[i]);
                stores.features.push({
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [
                      theRecords[i].fields.lon,
                      theRecords[i].fields.lat
                    ]
                  },
                  properties: {
                    phoneFormatted: theRecords[i].fields.Phone,
                    name: theRecords[i].fields.Name,
                    address: theRecords[i].fields.full_address,
                    slug: "?" + theRecords[i].fields.Slug,
                    hours: closing_time_display
                  }
                });
              }
              stores.features.forEach((store, i) => {
                store.properties.id = i;
              });
              if (mapContainr) {
                map.on("load", () => {
                  mainClusters(map, markerIMG, stores);
                  map.addControl(new mapboxgl.NavigationControl());
                  mapUnclusteredClick(map)
                  const markers = {};
                  let markersOnScreen = {};
                  function updateClusters() {
                    const newMarkers = {};
                    const features = map.querySourceFeatures("places");
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
                          SortListingsOnMapLoc(coords);
                          map
                            .getSource("places")
                            .getClusterExpansionZoom(clusterId, (err, zoom) => {
                              if (err) return;
                              var Currentzoom = map.getZoom(), zoomTO, midLvlZoom = 7;
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
                  function forwardGeocoder(query) {
                    const matchingFeatures = [];
                    // const features = map.querySourceFeatures("places");

                    // for every cluster on the screen, create an HTML marker for it (if we didn't yet),
                    // and add it to the map if it's not there already
                    for (const feature of stores.features) {
                      // Handle queries with different capitalization
                      // than the source data by calling toLowerCase().

                      const storeName = '<img class="results-icon" src="' + search_storeIcon + '"/> ' + `${feature.properties.name}`;
                      if (
                        feature.properties.name
                          .toLowerCase()
                          .includes(query.toLowerCase())
                      ) {
                        // Add a tree emoji as a prefix for custom
                        // data results using carmen geojson format:
                        // https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
                        feature['place_name'] = storeName;
                        feature['center'] = feature.geometry.coordinates;
                        feature['place_type'] = ['store'];
                        matchingFeatures.push(feature);
                      }
                    }
                    return matchingFeatures;
                  }
                  const geocoder = new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken, // Set the access token
                    placeholder: 'Find a Store...',
                    mapboxgl: mapboxgl, // Set the mapbox-gl instance
                    marker: false, // Use the geocoder's default marker style
                    localGeocoder: forwardGeocoder,
                    countries: 'us',
                    types: 'place, postcode, region',
                    countries: 'US'
                    //bbox: [-77.210763, 38.803367, -76.853675, 39.052643] // Set the bounding box coordinates
                  });
                  geocoder.addTo('#geocoder-container');
                  geocoder.on('result', (event) => {
                    document.querySelector('.mapboxgl-ctrl-geocoder--input').value = '';
                    const searchResult = event.result.geometry;
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
                    buildLocationList(stores);
                    const activeListing = document.getElementById(
                      `listing-${stores.features[0].properties.id}`
                    );
                    activeListing.classList.add('active');
                    flyToStore(stores.features[0])
                    const sidebar = document.querySelector(".sidebar");
                    sidebar.classList.remove("search-suggestions-displayed");
                  });
                  function resetStoreListOnZoomOut(zoom) {
                    if (zoom > 8) {
                      buildLocationList(stores);
                    }
                  }
                  function SortListingsOnMapLoc(position) {
                    var usrCoordinates = {
                      type: "Point",
                      coordinates: [
                        position[0],
                        position[1]
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
                    buildLocationList(stores);
                    const activeListing = document.getElementById(
                      `listing-${stores.features[0].properties.id}`
                    );
                    activeListing.classList.add('active');
                  }
                  function geoFindMe() {
                    function success(position) {
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
                      buildLocationList(stores);
                      const activeListing = document.getElementById(
                        `listing-${stores.features[0].properties.id}`
                      );
                      activeListing.classList.add('active');
                      // closeAlrt();
                      if (stores.features[0]) {
                        flyToStore(stores.features[0])
                        createPopUp(stores.features[0]);
                      }

                    }
                    function error() {
                    }
                    if (!navigator.geolocation) {
                    } else {
                      navigator.geolocation.getCurrentPosition(success, error);
                    }
                  }
                  map.on("render", () => {
                    // updateMarkers();
                    updateClusters();
                  });
                  map.on("zoom", () => {
                    //updateMarkers();
                    var Currentzoom = map.getZoom();
                    resetStoreListOnZoomOut(Currentzoom);
                    //  updateClusters();
                    markerCheck(map.getZoom());
                  });
                  map.on("mouseenter", "unclustered-point", () => {
                    map.getCanvas().style.cursor = "pointer";
                  });
                  map.on("mouseleave", "unclustered-point", () => {
                    map.getCanvas().style.cursor = "";
                  });

                  preloader.classList.add('hide');
                  preloader.style.display = "none";
                  buildLocationList(stores);
                  geoFindMe();
                  fadeElementsIn();
                  app.classList.add("app2-completed");
                });
              }
              // disable map 
              map.dragRotate.disable();
              map.touchZoomRotate.disableRotation();
              function buildLocationList(stores) {
                for (const store of stores.features) {
                  locationInternal(store, directionIcon)
                }

                app.classList.add("listings-completed");
              }
            });
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  });
}

export { startApp2 };