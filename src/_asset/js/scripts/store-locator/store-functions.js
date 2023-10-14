import { app, appClassList, pageURL } from "./identifiers.js";

import { decodeEntities } from "./functions.js";
import { startApp2 } from "./locator.js";
function buildMap(){
    const mapContainer = app.appendChild(document.createElement("div"));
    mapContainer.classList.add('map-container');
    const mapOBJ = mapContainer.appendChild(document.createElement("div"));
    mapOBJ.id = 'map';
    mapOBJ.classList.add('map');
    const sidebar = mapContainer.appendChild(document.createElement("div"));
    sidebar.classList.add('sidebar');
    
    const searchcntr = sidebar.appendChild(document.createElement("div"));
    searchcntr.classList.add('searchcntr');
    searchcntr.id = 'geocoder-container';

    const listings = sidebar.appendChild(document.createElement("div"));
    listings.classList.add('listings');
    listings.id = 'listings';
}
function returnToStore(storePage, return_map){
    const link = storePage.appendChild(document.createElement("a"));
    link.href = '#return-to-map';
    link.className = "store-btn";
    link.innerHTML = '<svg height="17" width="9"><polyline points="9,0,0,8.5,9,17" style="stroke:#000;fill:transparent;stroke-width:4px;"></polyline></svg>';
    link.innerHTML +="<span>"+return_map+"</span>";

    link.addEventListener("click", function (event) {
        event.preventDefault();
        const removeStoreClasses = ['store-page', 'map-container-added', 'event-container-added'];
        
        for (const removeStoreClass of removeStoreClasses) {
            if(appClassList.contains(removeStoreClass)){
                app.classList.remove(removeStoreClass);
            }
        }
        app.innerHTML = '';
        buildMap();
        window.scrollTo(0,0);
        startApp2('push');
    });
}

function updateStorePage(comparingSlug, page_title){
    const nextURL = pageURL+comparingSlug;
    const nextTitle = decodeEntities(page_title);
    const nextState = { additionalInformation: 'Updated the URL with JS' };
    // This will create a new entry in the browser's history, without reloading
    window.history.pushState(nextState, nextTitle, nextURL);
}

function LoadStoreMap(containerLon, containerLat, markerIMG, ctaIcon) {
    
    const mapContainer = document.querySelector('.store-page-map-container');
    var map,markerIMG, Sfields, ctaIcon;


    map = mapContainer.appendChild(
        document.createElement("div")
    );
    map.id = "map";
    map.className = "map";

    var css = '#app .store-page-events-container .eb-event .event-cta:after {background-image: url('+ctaIcon+');}',
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

    mapboxgl.accessToken =
    "pk.eyJ1IjoiY2QxNDYwIiwiYSI6ImNsZjJ4NDk1YTBjMXYzeG1sNTI4ZmprdHcifQ.quOK2CY8bs1LsIXE-BsUwg";
    map = new mapboxgl.Map({
        container: "map", // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: "mapbox://styles/mapbox/light-v11",
        zoom: 15, // starting zoom
        interactive: false,
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
    map.scrollZoom.disable();
}


export { returnToStore, updateStorePage, LoadStoreMap }