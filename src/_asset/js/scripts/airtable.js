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
var map;
function startApp2(){
  
  observer.disconnect();
  var stores = new Vue({
      el: '#app',
      data () {
      return {
          siteTitle: null,
          siteTag:null,
          headerIMG: null,
          loading: true,
          errored: false,
          featuredProjects: [],
          additionalProjects: [],
          skillsets: [],
          rfields: []
      }
      },
      filters: {
      footerdecimal (value) {
          return value.toFixed(2)
      }
      },
      mounted () {
  
      axios
          .get("https://api.airtable.com/v0/app7o6tSJG6UICys8/Stores?view=API",{ 
              headers: { Authorization: "Bearer patH2pzfuG2mbHzqd.18833d9077176b68bdf8f7c436376fc5d4962b4df98e82ffb1cf0ed3cedd64e5"
             } 
          })
          .then(response => {
            
              this.rfields = response.data.records;
              var theRecords = this.rfields;

              var dt = new Date();
              var current_time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
              var current_day_of_week = new Date().getDay(); 
              var closing_time;
              var closing_time_comparison;
              var closing_time_display;
              mapboxgl.accessToken = 'pk.eyJ1IjoiZW1tLXN1cHBseSIsImEiOiJjbGYwMXN1YTEwNHIwNDNwZzZqYmpnbXNnIn0.jbtZE6fXhOgKTWFsPHeDNg';

              /**
               * Add the map to the page
               */
              map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/light-v11',
                center: [-77.034084142948, 38.909671288923],
                zoom: 3
              });
              var stores = {
                type: "FeatureCollection",
                features: [],
              };
              
              
              for( var i = 0; i < theRecords.length; i++ ) {
                if(current_day_of_week = 0) {
                  closing_time = convert24timeToSeconds(theRecords[i].fields.Sunday);
  
                }
                if(current_day_of_week = 1) {
                  closing_time_comparison = convert24timeToSeconds(theRecords[i].fields.Monday);
                  closing_time = theRecords[i].fields.Monday;
  
                }
                if(current_day_of_week = 2) {
                  closing_time_comparison = convert24timeToSeconds(theRecords[i].fields.Tuesday);
                  closing_time = theRecords[i].fields.Tuesday;
  
                }
                if(current_day_of_week = 3) {
                  closing_time_comparison = convert24timeToSeconds(theRecords[i].fields.Wednesday);
                  closing_time = theRecords[i].fields.Wednesday;
  
                }
                if(current_day_of_week = 4) {
                  closing_time_comparison = convert24timeToSeconds(theRecords[i].fields.Thursday);
                  closing_time = theRecords[i].fields.Thursday;
  
                }
                if(current_day_of_week = 5) {
                  closing_time_comparison = convert24timeToSeconds(theRecords[i].fields.Friday);
                  closing_time = theRecords[i].fields.Friday;
  
                }
                if(current_day_of_week = 6) {
                  closing_time_comparison = convert24timeToSeconds(theRecords[i].fields.Saturday);
                  closing_time = theRecords[i].fields.Saturday;
  
                }
                if(current_day_of_week = 7) {
                  closing_time_comparison = convert24timeToSeconds(theRecords[i].fields.Sunday);
                  closing_time = theRecords[i].fields.Sunday;
  
                }
                if(closing_time_comparison){
                  if(closing_time_comparison > timeToSeconds(current_time)){
                    closing_time_display = "Closes at " + closing_time;
                  } else {
                    closing_time_display = theRecords[i].fields.Hours;
                  }
                } else {
                  closing_time_display = theRecords[i].fields.Hours;
                }
                function convert24timeToSeconds(time) {
                  if(time){
                    time = time.split(/:/);
                    return time[0] + 12 * 3600 + time[1] * 60 + time[2];
                  }
              }
                function timeToSeconds(time) {
                  time = time.split(/:/);
                  return time[0] * 3600 + time[1] * 60 + time[2];
              }
                stores.features.push({
                  "type": "Feature",
                  "geometry": {
                    "type": "Point",
                    "coordinates": [theRecords[i].fields.lon, theRecords[i].fields.lat]
                  },
                  "properties": {
                    "phoneFormatted": theRecords[i].fields.Phone,
                    'name': theRecords[i].fields.Name,
                    'address': theRecords[i].fields.full_address,
                    'slug': '/'+theRecords[i].fields.Slug,
                    'hours': closing_time_display
                  }
                });
              }
              
              stores.features.forEach((store, i) => {
                store.properties.id = i;
              });
        
              /**
               * Wait until the map loads to make changes to the map.
               */
              map.on('load', () => {
                /**
                 * This is where your '.addLayer()' used to be, instead
                 * add only the source without styling a layer
                 */
                map.loadImage(
                  'http://localhost:3000/Location-Icon.png',
                  (error, image) => {
                  if (error) throw error;
                   
                  // Add the image to the map style.
                  map.addImage('pin', image);
                map.addSource('places', {
                  'type': 'geojson',
                  'data': stores,
                  cluster: true,
                  clusterMaxZoom: 4, // Max zoom to cluster points on
                  clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
                });
                map.addLayer({
                  id: 'clusters',
                  type: 'circle',
                  source: 'places',
                  filter: ['has', 'point_count'],
                  paint: {
                  // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                  // with three steps to implement three types of circles:
                  //   * Blue, 20px circles when point count is less than 100
                  //   * Yellow, 30px circles when point count is between 100 and 750
                  //   * Pink, 40px circles when point count is greater than or equal to 750
                  'circle-color': [
                  'step',
                  ['get', 'point_count'],
                  '#FFE512',
                  100,
                  '#FFE512',
                  750,
                  '#FFE512'
                  ],
                  'circle-radius': [
                  'step',
                  ['get', 'point_count'],
                  20,
                  100,
                  30,
                  750,
                  40
                  ]
                  }
                  });
                   
                  map.addLayer({
                  id: 'cluster-count',
                  type: 'symbol',
                  source: 'places',
                  filter: ['has', 'point_count'],
                  layout: {
                  'text-field': ['get', 'point_count_abbreviated'],
                  'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                  'text-size': 12
                  }
                  });
                  map.addLayer({
                    id: 'unclustered-point',
                    source: 'places',
                    filter: ['!', ['has', 'point_count']],
                    type: 'symbol',
                    layout: {
                      'icon-image': 'pin', // reference the image
                      'icon-size': 0.75
                      }
                    });
                  
                   
                /**
                 * Add all the things to the page:
                 * - The location listings on the side of the page
                 * - The markers onto the map
                 */
                // inspect a cluster on click
                map.on('click', 'clusters', (e) => {
                  const features = map.queryRenderedFeatures(e.point, {
                  layers: ['clusters']
                  });
                  const clusterId = features[0].properties.cluster_id;
                  map.getSource('earthquakes').getClusterExpansionZoom(
                  clusterId,
                  (err, zoom) => {
                  if (err) return;
                  
                  map.easeTo({
                  center: features[0].geometry.coordinates,
                  zoom: zoom
                  });
                  }
                  );
                  });
                  
                  // When a click event occurs on a feature in
                  // the unclustered-point layer, open a popup at
                  // the location of the feature, with
                  // description HTML from its properties.
                  map.on('click', 'unclustered-point', (e) => {
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
                  const activeItem = document.getElementsByClassName('active');
                  e.stopPropagation();
                  if (activeItem[0]) {
                    activeItem[0].classList.remove('active');
                  }
                  const listing = document.getElementById(
                    `listing-${e.features[0].properties.id}`
                  );
                  listing.classList.add('active');
                  });
                  
                  map.on('mouseenter', 'clusters', () => {
                  map.getCanvas().style.cursor = 'pointer';
                  });
                  map.on('mouseenter', 'unclustered-point', () => {
                    map.getCanvas().style.cursor = 'pointer';
                  });
                  map.on('mouseleave', 'clusters', () => {
                  map.getCanvas().style.cursor = '';
                  });
                  map.on('mouseleave', 'unclustered-point', () => {
                    map.getCanvas().style.cursor = '';
                  });
                buildLocationList(stores);
               // addMarkers();
              });
            });
        
              /**
               * Add a marker to the map for every store listing.
               **/
              function addMarkers() {
                /* For each feature in the GeoJSON object above: */
                for (const marker of stores.features) {
                  /* Create a div element for the marker. */
                  const el = document.createElement('div');
                  /* Assign a unique `id` to the marker. */
                  el.id = `marker-${marker.properties.id}`;
                  /* Assign the `marker` class to each marker for styling. */
                  el.className = 'marker';
        
                  /**
                   * Create a marker using the div element
                   * defined above and add it to the map.
                   **/
                  new mapboxgl.Marker(el, { offset: [0, -23],"minzoom": 14 })
                    .setLngLat(marker.geometry.coordinates)
                    .addTo(map);
        
                  /**
                   * Listen to the element and when it is clicked, do three things:
                   * 1. Fly to the point
                   * 2. Close all other popups and display popup for clicked store
                   * 3. Highlight listing in sidebar (and remove highlight for all other listings)
                   **/
                  el.addEventListener('click', (e) => {
                    /* Fly to the point */
                    flyToStore(marker);
                    /* Close all other popups and display popup for clicked store */
                    createPopUp(marker);
                    /* Highlight listing in sidebar */
                    const activeItem = document.getElementsByClassName('active');
                    e.stopPropagation();
                    if (activeItem[0]) {
                      activeItem[0].classList.remove('active');
                    }
                    const listing = document.getElementById(
                      `listing-${marker.properties.id}`
                    );
                    listing.classList.add('active');
                  });
                }
              }
        
              /**
               * Add a listing for each store to the sidebar.
               **/
              function buildLocationList(stores) {
                for (const store of stores.features) {
                  /* Add a new listing section to the sidebar. */
                  const listings = document.getElementById('listings');
                  const listing = listings.appendChild(document.createElement('div'));
                  /* Assign a unique `id` to the listing. */
                  listing.id = `listing-${store.properties.id}`;
                  /* Assign the `item` class to each listing for styling. */
                  listing.className = 'item';

                  /* Add the link to the individual listing created above. */
                  const link = listing.appendChild(document.createElement('a'));
                  link.href = '#';
                  link.className = 'title';
                  link.id = `link-${store.properties.id}`;
                  link.innerHTML = `${store.properties.address}`;
        
                  /* Add details to the individual listing. */
                  const details = listing.appendChild(document.createElement('div'));
                  details.innerHTML = '<h5>'+`${store.properties.name}`+'</h5>';
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
                  link.addEventListener('click', function () {
                    for (const feature of stores.features) {
                      if (this.id === `link-${feature.properties.id}`) {
                        flyToStore(feature);
                        createPopUp(feature);
                      }
                    }
                    const activeItem = document.getElementsByClassName('active');
                    if (activeItem[0]) {
                      activeItem[0].classList.remove('active');
                    }
                    this.parentNode.classList.add('active');
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
        
              /**
               * Create a Mapbox GL JS `Popup`.
               **/
              function createPopUp(currentFeature) {
                const popUps = document.getElementsByClassName('mapboxgl-popup');
                if (popUps[0]) popUps[0].remove();
                const popup = new mapboxgl.Popup({ closeOnClick: false })
                  .setLngLat(currentFeature.geometry.coordinates)
                  .setHTML(
                    `<h3>${currentFeature.properties.name}</h3><h4>${currentFeature.properties.address}</h4>`
                  )
                  .addTo(map);
              }
              map.on('zoom', () => {
               // markerCheck(map.getZoom());
              });
          })
          .catch(error => {
          console.log(error)
          this.errored = true
      })
          .finally(() => this.loading = false)
      }
  });
  
setTimeout(
  function() {
  //  markerCheck(5);
}, 1400);
  


}
function markerCheck(zoomLvl){
  if (zoomLvl < 14) {
    toggle('marker', 'hide'); // hides
  } else {
    
    toggle('marker', 'show'); // Shows
  }
}
function toggle(className, displayState){
  var elements = document.getElementsByClassName(className)
  for (var i = 0; i < elements.length; i++){
    if(displayState == "hide"){
      elements[i].classList.add("hide-marker");
    } else{
      elements[i].classList = 'marker'
    }
  }
}