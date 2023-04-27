var pageURL = window.location.href;
if (pageURL.indexOf("?") > -1) {
    const SP_slug = location.search.substring(1);
    const app = document.getElementById('app');
    app.classList.add('store-page');
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
                  startApp2();
                
              }
            }
          }
        }
      }
    });
    observer.observe(app, { attributes: true });
    
    var map, markerIMG, default_image, page_title, return_map = "Return to store lookup";
    
    function startApp2() {
      observer.disconnect();
     // var markerIMG =
        "https://v5.airtableusercontent.com/v1/15/15/1678752000000/GZBaKTeElwmasRQ6gVfAGA/5XuZIYfNl6e2ytyY2fwiH8YefDRgf0Fba7zFksnen7ak_fqwV7qzvfmmJ7N76Wj--QvUBKvAlOC3CAN4z0Fcp6G-VFmebz5R6zccXua7aMo/QX6GKZ1SBK0plpmhLjGmKqZlR4C_j1GH-HfgbWZ1SU0";
      var store = new Vue({
        el: "#map",
        name:"store-locator-app",
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
                page_title = response.data.records[0].fields.page_title;
                return_map = response.data.records[0].fields.return_to_map;
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
                        if(CR_slug == SP_slug){
                            var storeFields = theRecords[i].fields;

                            store_image = storeFields.Store_Image;
                            if(store_image){
                                store_image = storeFields.Store_Image[0].url;
                                if(store_image == "undefined"){
                                    store_image = default_image
                                }
                            } else {
                                store_image = default_image
                            }
                            
                            if ((current_day_of_week = 0)) {
                            closing_time = convert24timeToSeconds(
                                storeFields.Sunday
                            );
                            }
                            if ((current_day_of_week = 1)) {
                            closing_time_comparison = convert24timeToSeconds(
                                storeFields.Monday
                            );
                            closing_time = storeFields.Monday;
                            }
                            if ((current_day_of_week = 2)) {
                            closing_time_comparison = convert24timeToSeconds(
                                storeFields.Tuesday
                            );
                            closing_time = storeFields.Tuesday;
                            }
                            if ((current_day_of_week = 3)) {
                            closing_time_comparison = convert24timeToSeconds(
                                storeFields.Wednesday
                            );
                            closing_time = storeFields.Wednesday;
                            }
                            if ((current_day_of_week = 4)) {
                            closing_time_comparison = convert24timeToSeconds(
                                storeFields.Thursday
                            );
                            closing_time = storeFields.Thursday;
                            }
                            if ((current_day_of_week = 5)) {
                            closing_time_comparison = convert24timeToSeconds(
                                storeFields.Friday
                            );
                            closing_time = storeFields.Friday;
                            }
                            if ((current_day_of_week = 6)) {
                            closing_time_comparison = convert24timeToSeconds(
                                storeFields.Saturday
                            );
                            closing_time = storeFields.Saturday;
                            }
                            if ((current_day_of_week = 7)) {
                            closing_time_comparison = convert24timeToSeconds(
                                storeFields.Sunday
                            );
                            closing_time = storeFields.Sunday;
                            }
                            if (closing_time_comparison) {
                            if (closing_time_comparison > timeToSeconds(current_time)) {
                                closing_time_display = "Closes at " + closing_time;
                            } 
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
                            var storeLandingURL = window.location.href;
                            if (storeLandingURL.indexOf("?") > -1) {
                            storeLandingURL = storeLandingURL.split('?')[0];
                            }
                            page_title = page_title+" | " + theRecords[i].fields.Name; 
                            document.title = page_title; 
                            app.innerHTML = '';
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
                            storeHeader.className = "store-page-header";
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

                            const mapContainer = storePage.appendChild(
                                document.createElement("div")
                            );
                            
                            mapContainer.setAttribute('data-lon', storeFields.lon);
                            mapContainer.setAttribute('data-lat', storeFields.lat);
                            mapContainer.setAttribute('data-address', storeFields.full_address);
                            mapContainer.className = "store-page-map-container";
                            app.classList.add("map-container-added");
                            const eventContainer = storePage.appendChild(
                                document.createElement("div")
                            );
                            
                            eventContainer.className = "store-page-events-container";
                            app.classList.add("event-container-added");
                            eventContainer.setAttribute('data-name', storeFields.Name);

                            eventContainer.setAttribute('data-address', storeFields.full_address);
                            const link = storePage.appendChild(document.createElement("a"));
                            link.href = storeLandingURL;
                            link.className = "store-btn";
                            link.innerHTML = '<svg height="17" width="9"><polyline points="9,0,0,8.5,9,17" style="stroke:#000;fill:transparent;stroke-width:4px;"></polyline></svg>';
                            link.innerHTML +="<span>"+return_map+"</span>";
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