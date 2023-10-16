import { app } from "./identifiers.js";
import { closingTimeDisplay } from "./functions.js";
import {  updateStorePage, LoadStoreMap } from "./store-functions.js";


var default_image, page_title, markerIMG, Sfields, ctaIcon, containerAddress;
var return_map = "Return to store lookup";
function load_storePage(SP_slug, map=null, historyUpdate = null) {
    if(map){
        map.removeSource('places')
        map.remove();
        app.classList.remove('listings-completed');
        app.classList.remove('app2-completed');
    }
    app.innerHTML = '';
    app.classList.add('store-page');
   // const storePage = app.appendChild(document.createElement("div"));
    // storePage.id = 'storePage';
    window.scrollTo(0,0);
    var store = new Vue({
        el: "#storePage",
        name:"store-page-app",
        data() {
        return {
            rfields: [],
            markerIMG: null,
            default_image: null,
            Sfields: [],
            CR_slug: null,
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
                this.default_image = response.data.records[0].fields.store_default_image[0].url;
                default_image = this.default_image;
                Sfields = response.data.records[0].fields;
                page_title = Sfields.page_title;
                return_map = Sfields.return_to_map;
                

                this.markerIMG = response.data.records[0].fields.marker_image[0].url;
                markerIMG = this.markerIMG;
                ctaIcon = Sfields.cta[0].url;

                var dt = new Date();
                var current_time =
                    dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
                var current_day_of_week = new Date().getDay();
                var closing_time;
                var closing_time_comparison;
                var closing_time_display;
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
                    var theRecords = this.rfields,
                    CR_slug,store_name,store_image,hours,closes_at,address,phone,mapLink,geoLat,geoLong,mapCoords =[];
                    var storepageVars = {
                    };
                    for (var i = 0; i < theRecords.length; i++) {
                        CR_slug = theRecords[i].fields.Slug;
                        let comparingSlug = CR_slug;
                        if(SP_slug.includes('?')){
                            comparingSlug = '?'+comparingSlug;
                        }
                        if(comparingSlug == SP_slug){
                            var storeLandingURL = window.location.href;
                            if (storeLandingURL.indexOf("?") > -1) {
                            storeLandingURL = storeLandingURL.split('?')[0];
                            }
                            page_title = page_title+" | " + theRecords[i].fields.Name; 
                            document.title = page_title; 
                            if(historyUpdate){
                                if(comparingSlug.includes('?')){
                                } else {
                                    comparingSlug = '?'+comparingSlug;
                                }
                                updateStorePage(comparingSlug, page_title);
                            }

                            const storeFields = theRecords[i].fields,
                            closing_time_display = closingTimeDisplay(theRecords[i]);

                            store_image = storeFields.Store_Image;
                            if(store_image){
                                store_image = storeFields.Store_Image[0].url;
                                if(store_image == "undefined"){
                                    store_image = default_image
                                }
                            } else {
                                store_image = default_image
                            }
                            
                            hours = storeFields.hours_fx;
                            if(hours){
                                if (hours.indexOf("[LINEBREAK]") > -1) {
                                    hours = hours.replaceAll("[LINEBREAK]", "<br>")
                                }
                            }
                            store_name = storeFields.Name;
                            address = storeFields.full_address;
                            phone = storeFields.Phone;
                            mapLink = "https://www.google.com/maps/dir/?api=1&destination="+address;
                        // default_image,hours,closes_at,address,phone,mapLink,mapCoords =[];
                            geoLat = storeFields.lat;
                            geoLong = storeFields.lon;
                            
                            containerAddress = storeFields.full_address;
                            if(containerAddress){
                                containerAddress = encodeURIComponent(containerAddress);
                            }
                           
                            const storePage = app.appendChild(
                                document.createElement("div")
                            );
                            storePage.id = `Store-`+ CR_slug;
                            /* Assign the `item` class to each listing for styling. */
                            storePage.className = "store-page-container";

                            //store image
                            
                            const storeHeader = storePage.appendChild(
                                document.createElement("div")
                            );
                            storeHeader.className = "store-page-header ratio ratio-16x9";
                        // const storeImage= storeHeader.appendChild(
                            //   document.createElement("img")
                        //  );
                            //storeImage.src = store_image;
                        //   storeImage.className = "store-image"
                        // storeImage.alt = page_title + "Store Image";
                            var css = '#app .store-page-header {background-image: url('+store_image+');}',
                            head = document.head || document.getElementsByTagName('head')[0],
                            style = document.createElement('style');
                        
                            head.appendChild(style);
                            storeHeader.classList.add('fadein');
                            style.type = 'text/css';
                            if (style.styleSheet){
                                // This is required for IE8 and below.
                                style.styleSheet.cssText = css;
                            } else {
                                style.appendChild(document.createTextNode(css));
                            }
                            const details = storePage.appendChild(
                                document.createElement("div")
                            );
                            details.className = 'store-page-details';
                            /* Add the link to the individual listing created above. */
                            
                            const detailsHeader = details.appendChild(
                                document.createElement("div")
                            );
                            detailsHeader.className = 'store-page-details-header';
                            if(closing_time_display){
                                detailsHeader.innerHTML += "<h3 class='closing-time'>" + closing_time_display; + "</h3>";
                            }
                            detailsHeader.innerHTML += "<h1>" + store_name; + "</h1>";
                            detailsHeader.innerHTML += "<div class='mobile-address-label'>"+address+ "</div>";
                            
                            const detailsInner = details.appendChild(
                                document.createElement("div")
                            );
                            detailsInner.className = 'store-page-details-inner';
                            detailsInner.innerHTML += "<div class='address-label'><h3>Address</h3>"+address+ "</div>";
                            detailsInner.innerHTML += "<div><h3>Hours</h3>"+hours+ "</div>";
                            detailsInner.innerHTML += "<div><h3>Phone</h3>"+phone+ "</div>";

                            const directions = detailsInner.appendChild(
                                document.createElement("a")
                            );
                            directions.className = "map-btn";
                            directions.href = "https://www.google.com/maps/dir/?api=1&destination="+containerAddress;
                            directions.innerHTML = "get directions";
                            const mapContainer = storePage.appendChild(
                                document.createElement("div")
                            );
                            
                            mapContainer.className = "store-page-map-container";
                            app.classList.add("map-container-added");
                            LoadStoreMap(storeFields.lon, storeFields.lat, markerIMG, ctaIcon, return_map);
                            const eventContainer = storePage.appendChild(
                                document.createElement("div")
                            );
                            
                            eventContainer.className = "store-page-events-container";
                            app.classList.add("event-container-added");
                            eventContainer.setAttribute('data-name', storeFields.Name);

                            eventContainer.setAttribute('data-address', storeFields.full_address);
                            window.onpopstate = (event) => {
                                location.reload();
                              };
                        } 
                    }

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
export { load_storePage };