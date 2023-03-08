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

function startApp(){
  var Airtable = require('airtable');
  var base = new Airtable({apiKey: 'patH2pzfuG2mbHzqd.18833d9077176b68bdf8f7c436376fc5d4962b4df98e82ffb1cf0ed3cedd64e5'}).base('app7o6tSJG6UICys8');
  
  base('Stores').select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 3,
      view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
  
      records.forEach(function(record) {
          console.log('Retrieved', record.get('Number'));
      });
  
      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
  
  }, function done(err) {
      if (err) { console.error(err); return; }
  });

}

function startApp1(){
    const { createApp } = Vue
    var settings = {
      "url": "https://api.airtable.com/v0/app7o6tSJG6UICys8/Stores?view=API",
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Authorization": "Bearer patH2pzfuG2mbHzqd.18833d9077176b68bdf8f7c436376fc5d4962b4df98e82ffb1cf0ed3cedd64e5",
        "Cookie": "brw=brwaoMYe7aEFiKynU; AWSALB=IsfWQUsV1MwhumCr9Tb/4WPjsgJ5591A10gPTIYovuWll2HlrC9XqWZ8ZsLR6ZepqkjOMrRWOt1RJfYAnxjEUJ1AxVeaXRCP7dsf5LybIAqwzN3IQjT53xllUWYn; AWSALBCORS=IsfWQUsV1MwhumCr9Tb/4WPjsgJ5591A10gPTIYovuWll2HlrC9XqWZ8ZsLR6ZepqkjOMrRWOt1RJfYAnxjEUJ1AxVeaXRCP7dsf5LybIAqwzN3IQjT53xllUWYn"
      },
    };
    
    $.ajax(settings).done(function (response) {
      
      this.rfields = response.data;
      var fields = this.rfields;
      console.log(fields);
    
  const { createApp } = Vue
                 
      createApp({
          data() {
            return {
              message: fields.Name
            }
          }
        }).mount('#app');
        console.log('airtable');
    });
}
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
              const map = new mapboxgl.Map({
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
                console.log(theRecords[i].fields.Name);
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
              
              
              console.log(stores)
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
                map.addSource('places', {
                  'type': 'geojson',
                  'data': stores
                });
        
                /**
                 * Add all the things to the page:
                 * - The location listings on the side of the page
                 * - The markers onto the map
                 */
                buildLocationList(stores);
                addMarkers();
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
                  new mapboxgl.Marker(el, { offset: [0, -23] })
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
            
      
          })
          .catch(error => {
          console.log(error)
          this.errored = true
      })
          .finally(() => this.loading = false)
      }
  });
}
