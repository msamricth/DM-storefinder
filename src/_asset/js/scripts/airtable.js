const app = document.getElementById('app');
var isVueLoaded,isAxiosLoaded,isAirtableLoaded,isJqueryLoaded;
const observer = new MutationObserver((mutations) => {
  if (mutations[0].attributeName === 'class') { 
    
    isVueLoaded = app.classList.contains('vue-loaded');
    isAxiosLoaded = app.classList.contains('axios-loaded');
    isAirtableLoaded = app.classList.contains('airtable-loaded');
    isJqueryLoaded = app.classList.contains('jquery-loaded');
    if(isVueLoaded){
      if(isAxiosLoaded){
        if(isAirtableLoaded){
          if(isJqueryLoaded){ 
            startApp2();
          }
        }
      }
    }
  }
});
observer.observe(app, { attributes: true });


var map, markerIMG;

function startApp2() {
  observer.disconnect();
  var stores = new Vue({
    el: "#app",
    data() {
      return {
        markerIMG: null,
        defaultStoreIMG: null,
        Sfields: []
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
          //this.siteTag = response.data.records[0].fields.TagLine;
          this.markerIMG = response.data.records[0].fields.marker_image[0].url;
          markerIMG = this.markerIMG;

          // html stuff document.getElementById("siteTitle").innerHTML = this.siteTitle;
          //  $('#siteTitle').removeClass('placeholder');
          //  document.getElementById("tagline").innerHTML = this.siteTag;
          //  $('#tagline').removeClass('placeholder');
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  });
 // var markerIMG =
    "https://v5.airtableusercontent.com/v1/15/15/1678752000000/GZBaKTeElwmasRQ6gVfAGA/5XuZIYfNl6e2ytyY2fwiH8YefDRgf0Fba7zFksnen7ak_fqwV7qzvfmmJ7N76Wj--QvUBKvAlOC3CAN4z0Fcp6G-VFmebz5R6zccXua7aMo/QX6GKZ1SBK0plpmhLjGmKqZlR4C_j1GH-HfgbWZ1SU0";
  var stores = new Vue({
    el: "#app",
    data() {
      return {
        rfields: []
      };
    },
    filters: {
      footerdecimal(value) {
        return value.toFixed(2);
      }
    },
    mounted() {
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

          var dt = new Date();
          var current_time =
            dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
          var current_day_of_week = new Date().getDay();
          var closing_time;
          var closing_time_comparison;
          var closing_time_display;
          mapboxgl.accessToken =
            "pk.eyJ1IjoiZW1tLXN1cHBseSIsImEiOiJjbGYwMXN1YTEwNHIwNDNwZzZqYmpnbXNnIn0.jbtZE6fXhOgKTWFsPHeDNg";

          /**
           * Add the map to the page
           */
          map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/light-v11",
            center: [-98.034084142948, 38.909671288923],
            zoom: 3
          });
          var stores = {
            type: "FeatureCollection",
            features: []
          };

          for (var i = 0; i < theRecords.length; i++) {
            if ((current_day_of_week = 0)) {
              closing_time = convert24timeToSeconds(
                theRecords[i].fields.Sunday
              );
            }
            if ((current_day_of_week = 1)) {
              closing_time_comparison = convert24timeToSeconds(
                theRecords[i].fields.Monday
              );
              closing_time = theRecords[i].fields.Monday;
            }
            if ((current_day_of_week = 2)) {
              closing_time_comparison = convert24timeToSeconds(
                theRecords[i].fields.Tuesday
              );
              closing_time = theRecords[i].fields.Tuesday;
            }
            if ((current_day_of_week = 3)) {
              closing_time_comparison = convert24timeToSeconds(
                theRecords[i].fields.Wednesday
              );
              closing_time = theRecords[i].fields.Wednesday;
            }
            if ((current_day_of_week = 4)) {
              closing_time_comparison = convert24timeToSeconds(
                theRecords[i].fields.Thursday
              );
              closing_time = theRecords[i].fields.Thursday;
            }
            if ((current_day_of_week = 5)) {
              closing_time_comparison = convert24timeToSeconds(
                theRecords[i].fields.Friday
              );
              closing_time = theRecords[i].fields.Friday;
            }
            if ((current_day_of_week = 6)) {
              closing_time_comparison = convert24timeToSeconds(
                theRecords[i].fields.Saturday
              );
              closing_time = theRecords[i].fields.Saturday;
            }
            if ((current_day_of_week = 7)) {
              closing_time_comparison = convert24timeToSeconds(
                theRecords[i].fields.Sunday
              );
              closing_time = theRecords[i].fields.Sunday;
            }
            if (closing_time_comparison) {
              if (closing_time_comparison > timeToSeconds(current_time)) {
                closing_time_display = "Closes at " + closing_time;
              } else {
                closing_time_display = theRecords[i].fields.Hours;
              }
            } else {
              closing_time_display = theRecords[i].fields.Hours;
            }
            function convert24timeToSeconds(time) {
              if (time) {
                time = time.split(/:/);
                return time[0] + 12 * 3600 + time[1] * 60 + time[2];
              }
            }
            function timeToSeconds(time) {
              time = time.split(/:/);
              return time[0] * 3600 + time[1] * 60 + time[2];
            }
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
                slug: "/" + theRecords[i].fields.Slug,
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
          map.on("load", () => {
            map.loadImage(markerIMG, (error, image) => {
              if (error) throw error;

              // Add the image to the map style.
              map.addImage("pin", image);
              /**
               * This is where your '.addLayer()' used to be, instead
               * add only the source without styling a layer
               */

              map.addSource("places", {
                type: "geojson",
                data: stores,
                cluster: true,
                clusterMaxZoom: 4, // Max zoom to cluster points on
                clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
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
            /**
             * Add all the things to the page:
             * - The location listings on the side of the page
             * - The markers onto the map
             */

            map.on("click", "unclustered-point", (e) => {
              const coordinates = e.features[0].geometry.coordinates.slice();

              // Ensure that if the map is zoomed out such that
              // multiple copies of the feature are visible, the
              // popup appears over the copy being pointed to.
              while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
              }

              flyToStore(e.features[0]);
              /* Close all other popups and display popup for clicked store */
              createPopUp(e.features[0]);
              /* Highlight listing in sidebar */
              const activeItem = document.getElementsByClassName("active");
              // e.stopPropagation();
              if (activeItem[0]) {
                activeItem[0].classList.remove("active");
              }
              const listing = document.getElementById(
                `listing-${e.features[0].properties.id}`
              );
              listing.classList.add("active");
            });

           

            const markers = {};
            let markersOnScreen = {};

            function updateMarkers() {
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
                    map
                      .getSource("places")
                      .getClusterExpansionZoom(clusterId, (err, zoom) => {
                        if (err) return;

                        map.easeTo({
                          center: feature.geometry.coordinates,
                          zoom: zoom
                        });
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
            const geocoder = new MapboxGeocoder({
              accessToken: mapboxgl.accessToken, // Set the access token
              mapboxgl: mapboxgl, // Set the mapbox-gl instance
              marker: true, // Use the geocoder's default marker style
              //bbox: [-77.210763, 38.803367, -76.853675, 39.052643] // Set the bounding box coordinates
            });
            
            geocoder.on('result', (event) => {
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
           

              createPopUp(stores.features[0]);
            });


            
            map.on("render", () => {
              updateMarkers();
            });
            map.on("zoom", () => {
              //updateMarkers();
              markerCheck(map.getZoom());
            });
            map.on("mouseenter", "unclustered-point", () => {
              map.getCanvas().style.cursor = "pointer";
            });
            map.on("mouseleave", "unclustered-point", () => {
              map.getCanvas().style.cursor = "";
            });
            map.addControl(geocoder, 'top-right');
            buildLocationList(stores);
          });

          /**
           * Add a listing for each store to the sidebar.
           **/
          function buildLocationList(stores) {
            for (const store of stores.features) {
              /* Add a new listing section to the sidebar. */
              const listings = document.getElementById("listings");
              const listing = listings.appendChild(
                document.createElement("div")
              );
              /* Assign a unique `id` to the listing. */
              listing.id = `listing-${store.properties.id}`;
              /* Assign the `item` class to each listing for styling. */
              listing.className = "item";

              /* Add the link to the individual listing created above. */
              const link = listing.appendChild(document.createElement("a"));
              link.href = "#";
              link.className = "title";
              link.id = `link-${store.properties.id}`;
              link.innerHTML = `${store.properties.address}`;

              /* Add details to the individual listing. */
              const details = listing.appendChild(
                document.createElement("div")
              );
              details.innerHTML = "<h5>" + `${store.properties.name}` + "</h5>";
              details.innerHTML += `${store.properties.address}`;
              details.innerHTML += ` &middot; ${store.properties.phoneFormatted}`;
              details.innerHTML += ` &middot; ${store.properties.hours}`;

              /**
               * Listen to the element and when it is clicked, do four things:
               * 1. Update the `currentFeature` to the store associated with the clicked link
               * 2. Fly to the point
               * 3. Close all other popups and display popup for clicked store
               * 4. Highlight listing in sidebar (and remove highlight for all other listings)
               **/
              if (store.properties.distance) {
                const roundedDistance = Math.round(store.properties.distance * 100) / 100;
                details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
              }
              link.addEventListener("click", function () {
                for (const feature of stores.features) {
                  if (this.id === `link-${feature.properties.id}`) {
                    flyToStore(feature);
                    createPopUp(feature);
                  }
                }
                const activeItem = document.getElementsByClassName("active");
                if (activeItem[0]) {
                  activeItem[0].classList.remove("active");
                }
                this.parentNode.classList.add("active");
              });
            }
          }

          /**
           * Use Mapbox GL JS's `flyTo` to move the camera smoothly
           * a given center point.
           **/
          function flyToStore(currentFeature) {
            map.flyTo({
              center: currentFeature.geometry.coordinates,
              zoom: 15
            });
          }
          function getBbox(sortedStores, storeIdentifier, searchResult) {
            const lats = [
              sortedStores.features[storeIdentifier].geometry.coordinates[1],
              searchResult.coordinates[1]
            ];
            const lons = [
              sortedStores.features[storeIdentifier].geometry.coordinates[0],
              searchResult.coordinates[0]
            ];
            const sortedLons = lons.sort((a, b) => {
              if (a > b) {
                return 1;
              }
              if (a.distance < b.distance) {
                return -1;
              }
              return 0;
            });
            const sortedLats = lats.sort((a, b) => {
              if (a > b) {
                return 1;
              }
              if (a.distance < b.distance) {
                return -1;
              }
              return 0;
            });
            return [
              [sortedLons[0], sortedLats[0]],
              [sortedLons[1], sortedLats[1]]
            ];
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
              .addTo(map);
          }
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  });

  setTimeout(function () {
    //  markerCheck(5);
  }, 1400);
}
function markerCheck(zoomLvl) {
  if (zoomLvl < 14) {
    toggle("mapMarker", "hide"); // hides
  } else {
    toggle("mapMarker", "show"); // Shows
  }
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
