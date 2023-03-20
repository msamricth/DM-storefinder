var pageURL = window.location.href;
if (pageURL.indexOf("?") > -1) {
    const app = document.getElementById('app');
    var isVueLoaded,isAxiosLoaded,isAirtableLoaded,isJqueryLoaded,isMapboxLoaded,isThereAMapContainer;
    const observer = new MutationObserver((mutations) => {
      if (mutations[0].attributeName === 'class') { 
        
        isVueLoaded = app.classList.contains('vue-loaded');
        isAxiosLoaded = app.classList.contains('axios-loaded');
        isAirtableLoaded = app.classList.contains('airtable-loaded');
        isJqueryLoaded = app.classList.contains('jquery-loaded');
        isMapboxLoaded = app.classList.contains('mapbox-loaded');
        isThereAMapContainer = app.classList.contains('map-container-added');
    
        
        if(isVueLoaded){
          if(isAxiosLoaded){
            if(isAirtableLoaded){
              if(isJqueryLoaded){ 
                if(isMapboxLoaded){
                    if(isThereAMapContainer){
                    LoadMap();
                    }
                }
              }
            }
          }
        }
      }
    });
    observer.observe(app, { attributes: true });
    function LoadMap() {
      observer.disconnect();
      
        const mapContainer = document.querySelector('.store-page-map-container');
        var containerLon = mapContainer.getAttribute('data-lon'),
        containerLat = mapContainer.getAttribute('data-lat'),
        map,markerIMG;

        map = mapContainer.appendChild(
            document.createElement("div")
        );
        map.id = "map";
        map.className = "map";
        var storeMap = new Vue({
            el: "#map",
            name:"store-page-map",
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
                    this.markerIMG = response.data.records[0].fields.marker_image[0].url;
                    markerIMG = this.markerIMG;

                    mapboxgl.accessToken =
                    "pk.eyJ1IjoiY2QxNDYwIiwiYSI6ImNsZjJ4NDk1YTBjMXYzeG1sNTI4ZmprdHcifQ.quOK2CY8bs1LsIXE-BsUwg";
                    map = new mapboxgl.Map({
                        container: "map", // container ID
                        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
                        style: "mapbox://styles/mapbox/light-v11",
                        zoom: 15, // starting zoom
                        center: [containerLon, containerLat] // starting position
                    });
                    
                    map.on("load", () => {
                        // Load an image from an external URL.
                        map.loadImage(markerIMG,
                        (error, image) => {
                            if (error) throw error;
                    
                            // Add the image to the map style.
                            map.addImage("Marker", image);
                    
                            // Add a data source containing one point feature.
                            map.addSource("point", {
                            type: "geojson",
                            data: {
                                type: "FeatureCollection",
                                features: [
                                {
                                    type: "Feature",
                                    geometry: {
                                    type: "Point",
                                    coordinates: [containerLon, containerLat]
                                    }
                                }
                                ]
                            }
                            });
                    
                            // Add a layer to use the image to represent the data.
                            map.addLayer({
                            id: "points",
                            type: "symbol",
                            source: "point", // reference the data source
                            layout: {
                                "icon-image": "Marker", // reference the image
                                "icon-size": 0.5
                            }
                            });
                        }
                        );
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

    
}
