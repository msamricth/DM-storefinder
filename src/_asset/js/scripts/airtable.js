const app = document.getElementById('app');
var isVueLoaded,isAxiosLoaded,isAirtableLoaded,isJqueryLoaded,isMapboxLoaded;
const observer = new MutationObserver((mutations) => {
  if (mutations[0].attributeName === 'class') { 
    
    isVueLoaded = app.classList.contains('vue-loaded');
    isAxiosLoaded = app.classList.contains('axios-loaded');
    isAirtableLoaded = app.classList.contains('airtable-loaded');
    isJqueryLoaded = app.classList.contains('jquery-loaded');
    isMapboxLoaded = app.classList.contains('mapbox-loaded');

    
    if(isVueLoaded){
      if(isAxiosLoaded){
        if(isAirtableLoaded){
          if(isJqueryLoaded){ 
            if(isMapboxLoaded){
              if (!app.classList.contains("store-page")) {
                startApp2();
              }
            }
          }
        }
      }
    }
  }
});
observer.observe(app, { attributes: true });

var map, Sfields, markerIMG, page_title, directionIcon, phoneIcon, ctaIcon, search_storeIcon, search_markerIcon;

function startApp2() {
  observer.disconnect();
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


          page_title = response.data.records[0].fields.page_title;
          document.title = page_title;
          // html stuff document.getElementById("siteTitle").innerHTML = this.siteTitle;
          //  $('#siteTitle').removeClass('placeholder');
          //  document.getElementById("tagline").innerHTML = this.siteTag;
          //  $('#tagline').removeClass('placeholder');
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
               */          const bounds = [
                [-125.97881615167792, 29.487440618804314], // Southwest coordinates
                [-39.11807460657073, 48.86784324437724] // Northeast coordinates
              ];
              
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
              const mapContainr = document.getElementById('map');
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
                  /**
                   * Add all the things to the page:
                   * - The location listings on the side of the page
                   * - The markers onto the map
                   */


                  map.addControl(new mapboxgl.NavigationControl());
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

                      flyToStoreAndChange(e.features[0]);
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
                 
                  const markers = {};
                  let markersOnScreen = {};

                  function updateClusters() {
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
                          SortListingsOnMapLoc(coords);
                          console.log(coords);
                          map
                            .getSource("places")
                            .getClusterExpansionZoom(clusterId, (err, zoom) => {
                              if (err) return;
                              var Currentzoom = map.getZoom(),zoomTO, midLvlZoom = 7;
                              if(Currentzoom >= midLvlZoom){
                                
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
                    buildLocationList(stores);
                    const activeListing = document.getElementById(
                      `listing-${stores.features[0].properties.id}`
                    );
                    activeListing.classList.add('active');
                

                    flyToStore(stores.features[0])
                    const sidebar = document.querySelector(".sidebar");
                    sidebar.classList.remove("search-suggestions-displayed");
                  });
                  function resetStoreListOnZoomOut(zoom){
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
                    const status = document.querySelector("#geolocatorstatus");
                    
                  
                    function success(position) {
                      status.textContent = "";
                      
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
                      closeAlrt();
                      flyToStore(stores.features[0])
                      createPopUp(stores.features[0]);
                    }
                    function error() {
                      status.textContent = "Unable to retrieve your location";
                    }
                  
                    if (!navigator.geolocation) {
                      status.textContent = "Geolocation is not supported by your browser";
                    } else {
                      status.textContent = "Locating…";
                      navigator.geolocation.getCurrentPosition(success, error);
                    }
                    closeAlrt();
                  }
                  
                  document.querySelector("#find-me").addEventListener("click", geoFindMe);
        
                  function closeAlrt(){
                    const alertCNTR = document.querySelector(".fade-map-elements");
                    alertCNTR.classList.remove('show');
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
                    
                // map.addControl(geocoder, 'top-right');
                  buildLocationList(stores);

                
                });
              }
              // disable map rotation using right click + drag
              map.dragRotate.disable();
              
              // disable map rotation using touch rotation gesture
              map.touchZoomRotate.disableRotation();
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
                  const link = listing.appendChild(document.createElement("a"));
                  link.href = "#";
                  link.className = "title";
                  link.id = `link-${store.properties.id}`;
                  /* Add details to the individual listing. */
                  const detailsContainer = listing.appendChild(
                    document.createElement("div")
                  );
                  detailsContainer.className = 'listing-content';
                  /* Add the link to the individual listing created above. */
                  
                  const details = detailsContainer.appendChild(
                    document.createElement("div")
                  );
                  
                  details.className = 'listing-details';
                  var storeDistance = '';
                  if (store.properties.distance) {
                    const roundedDistance = Math.round(store.properties.distance * 100) / 100;
                    storeDistance = ` <strong>${roundedDistance} miles away</strong> - `;
                  }
                  details.innerHTML = "<h3>" + `${store.properties.name}` + "</h3>";
                  details.innerHTML += "<small>" + storeDistance +`${store.properties.address}`+ "</small>";
                  if(store.properties.hours){
                    details.innerHTML += "<strong>" + `${store.properties.hours}` + "</strong>";
                  }
                
                  const meta = detailsContainer.appendChild(
                    document.createElement("div")
                  );


                  var containerPhone = `${store.properties.phoneFormatted}`,
                  containerAddress = `${store.properties.address}`;

                  if(containerPhone){
                    containerPhone = encodeURIComponent(containerPhone);
                  }
                  if(containerAddress){
                      containerAddress = encodeURIComponent(containerAddress);
                  }
                  var containerhref = "https://www.google.com/maps/dir/?api=1&destination="+containerAddress;
                  meta.className = 'meta-details';
                  meta.innerHTML += "<a href='"+containerhref+"' target='_blank'><img class='results-icon' src='"+directionIcon+"'/></a>";

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
                        flyToStoreAndChange(feature);
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
                
                const preloader = document.querySelector('.storemap-preloader');
                preloader.classList.add('hide');
                setTimeout(
                  function() {
                    preloader.style.display = "none";
                  }, 50);
                }

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

              /**
               * Use Mapbox GL JS's `flyTo` to move the camera smoothly
               * a given center point.
               **/
              function flyToStore(currentFeature) {
                map.flyTo({
                  center: currentFeature.geometry.coordinates,
                  zoom: 10
                });
              }
              function flyToStoreAndChange(currentFeature) {
                map.flyTo({
                  center: currentFeature.geometry.coordinates,
                  zoom: 10
                });
                goToStorePage(currentFeature);
              }
              function goToStorePage(currentFeature){
                var storeLandingURL = window.location.href;
                if (storeLandingURL.indexOf("?") > -1) {
                  storeLandingURL = storeLandingURL.split('?')[0];
                }
                if (storeLandingURL.indexOf("#") > -1) {
                  storeLandingURL = window.location.href.split('#')[0]
                }
                

                window.location.href = storeLandingURL + currentFeature.properties.slug;

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
                  .window.location.href = addTo(map);
              }

              
              setTimeout(function () {
                fadeElementsIn();
                
                app.classList.add("app2-completed");
              }, 1400);
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
function fadeElementsIn(){
  var elements = document.getElementsByClassName('fade-map-elements');
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add("show");
  }
}





