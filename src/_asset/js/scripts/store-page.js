var pageURL = window.location.href;
if (pageURL.indexOf("?") > -1) {
    const SP_slug = location.search.substring(1);
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
            CR_slug: null
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
                CR_slug;
                for (var i = 0; i < theRecords.length; i++) {
                    CR_slug = theRecords[i].fields.Slug;
                    if(CR_slug == SP_slug){
                        var storeLandingURL = window.location.href;
                        if (storeLandingURL.indexOf("?") > -1) {
                          storeLandingURL = storeLandingURL.split('?')[0];
                        }
                        console.log(theRecords[i].fields);
                        app.innerHTML = '';
                        const storePage = app.appendChild(
                            document.createElement("div")
                          );
                          storePage.id = `Store-`+ CR_slug;
                          /* Assign the `item` class to each listing for styling. */
                          storePage.className = "store-page-container";
                          const link = storePage.appendChild(document.createElement("a"));
                          link.href = storeLandingURL;
                          link.className = "title";
                          link.innerHTML = "Return to map"
                          const details = storePage.appendChild(
                            document.createElement("div")
                          );
                          details.className = 'listing-details';
                          /* Add the link to the individual listing created above. */
                          
                          details.innerHTML = "<h3>" + theRecords[i].fields.Name; + "</h3>";
                          details.innerHTML += "<small>"+theRecords[i].fields.full_address+ "</small>";
                   
                            details.innerHTML += "<strong>" +theRecords[i].fields.Hours+ "</strong>";
                          
                    } 
                }

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