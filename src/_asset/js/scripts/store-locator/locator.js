import { SMZoom, SMMZoom, mapContainr, preloader } from "./identifiers.js";
import { buildLocationList, fadeElementsIn } from "./locator-functions.js";
import { mapUnclusteredClick, mapActions, mainClusters, geoFindMe } from "./locator-details.js";
import { decodeEntities, closingTimeDisplay } from "./functions.js";


var map, Sfields, markerIMG, page_title, directionIcon, phoneIcon, ctaIcon, search_storeIcon, search_markerIcon;

function startApp2(pushPage=null) {
 // var markerIMG =
    "https://v5.airtableusercontent.com/v1/15/15/1678752000000/GZBaKTeElwmasRQ6gVfAGA/5XuZIYfNl6e2ytyY2fwiH8YefDRgf0Fba7zFksnen7ak_fqwV7qzvfmmJ7N76Wj--QvUBKvAlOC3CAN4z0Fcp6G-VFmebz5R6zccXua7aMo/QX6GKZ1SBK0plpmhLjGmKqZlR4C_j1GH-HfgbWZ1SU0";
  var stores = new Vue({
    el: "#map",
    name:"store-locator-app",
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
            if(pushPage){
              const nextURL = window.location.href.split('?')[0];
              const nextTitle = decodeEntities(page_title);
              const nextState = { additionalInformation: 'Updated the URL with JS' };
              // This will create a new entry in the browser's history, without reloading
              window.history.pushState(nextState, nextTitle, nextURL);
            }
          //this.siteTag = response.data.records[0].fields.TagLine;
          Sfields = response.data.records[0].fields;
          markerIMG = Sfields.marker_image[0].url;
          directionIcon = Sfields.direction[0].url;
          phoneIcon = Sfields.phone[0].url;
          search_storeIcon = Sfields.search_store[0].url;
          ctaIcon = Sfields.cta[0].url;
          search_markerIcon = Sfields.search_marker[0].url;
          var css = '.map-container .marker {background-image: url('+markerIMG+');}',
          head = document.head || document.getElementsByTagName('head')[0],
          style = document.createElement('style');
          
          head.appendChild(style);
          style.type = 'text/css';
          if (style.styleSheet){
              // This is required for IE8 and below.
              style.styleSheet.cssText = css;
          } else {
              style.appendChild(document.createTextNode(css));
          }

          axios
            .get("https://api.airtable.com/v0/app7o6tSJG6UICys8/Stores?view=API", {
              headers: {
                Authorization:
                  "Bearer patH2pzfuG2mbHzqd.18833d9077176b68bdf8f7c436376fc5d4962b4df98e82ffb1cf0ed3cedd64e5"
              }
            })
            .then((response) => {
              this.rfields = response.data.records;
              var theRecords = this.rfields;

              
              mapboxgl.accessToken =
                "pk.eyJ1IjoiZW1tLXN1cHBseSIsImEiOiJjbGYwMXN1YTEwNHIwNDNwZzZqYmpnbXNnIn0.jbtZE6fXhOgKTWFsPHeDNg";

              /**
               * Add the map to the page
               */          const bounds = [
                [-125.97881615167792, 29.487440618804314], // Southwest coordinates
                [-39.11807460657073, 48.86784324437724] // Northeast coordinates
              ];
              
              var map;
              if(mapContainr){
                map = new mapboxgl.Map({
                  container: "map",
                  style: "mapbox://styles/mapbox/light-v11",
                  center: [-98.034084142948, 38.909671288923],
                  projection: 'mercator',
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

              /**
               * Wait until the map loads to make changes to the map.
               */
              
              if(mapContainr){
                map.on("load", () => {
                    mainClusters(map, markerIMG, stores);
                    map.addControl(new mapboxgl.NavigationControl());
                    mapUnclusteredClick(map);

                  function forwardGeocoder(query) {
                    const matchingFeatures = [];
                  // const features = map.querySourceFeatures("places");

                    // for every cluster on the screen, create an HTML marker for it (if we didn't yet),
                    // and add it to the map if it's not there already
                    for (const feature of stores.features) {
                    // Handle queries with different capitalization
                      // than the source data by calling toLowerCase().
                      
                      const storeName = '<img class="results-icon" src="'+search_storeIcon+'"/> '+`${feature.properties.name}`;
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
                    buildLocationList(stores, directionIcon, map);
                    const activeListing = document.getElementById(
                      `listing-${stores.features[0].properties.id}`
                    );
                    activeListing.classList.add('active');
                

                    flyToStore(stores.features[0], map)
                    const sidebar = document.querySelector(".sidebar");
                    sidebar.classList.remove("search-suggestions-displayed");
                  });
                  
                  // mapActions(map)
                  mapActions(map, stores, directionIcon);
                  //map.addControl(geocoder, 'top-right');
                
                  preloader.classList.add('hide');
                  setTimeout(
                    function() {
                      preloader.style.display = "none";
                    }, 100);
                    buildLocationList(stores, directionIcon, map);
                    geoFindMe(stores, map);                
                  });
                }
                map.dragRotate.disable();
                map.touchZoomRotate.disableRotation();
       

              function matchZoom(){
                var mq = window.matchMedia( "(max-width: 460px)" );
                var mq1 = window.matchMedia( "(max-width: 1024px)" );
                var mq2 = window.matchMedia( "(max-width: 1360px)" );
                var SMZoom, SMMZoom;
                if (mq.matches){
                  SMZoom = 1.8,
                  SMMZoom = 0;
                } else {
                    if (mq1.matches){ 
                      SMZoom = 2.6,
                      SMMZoom = 2.2;
                    } else if (mq2.matches){ 
                      SMZoom = 2.6,
                      SMMZoom = 2.2;
                    } else {
                      SMZoom = 3.5,
                      SMMZoom = 3.2;
                    }
                };
                map.setZoom(SMZoom);
                map.setMinZoom(SMMZoom);
              }
              setTimeout(function () {
                fadeElementsIn();
                
                app.classList.add("app2-completed");
              }, 400);
            })
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