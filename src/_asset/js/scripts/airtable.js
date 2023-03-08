const app = document.getElementById('app');
var isVueLoaded;
new MutationObserver((mutations) => {
  if (mutations[0].attributeName === 'class') { 
    
    isVueLoaded = app.classList.contains('vue-loaded');
    if(isVueLoaded){
       startApp2();
    }
  }
}).observe(app, { attributes: true });

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

	            for( var i = 0; i < theRecords.length; i++ ) {
                console.log(theRecords[i].fields.Name);
              }
              console.log(fields);

              
      
          })
          .catch(error => {
          console.log(error)
          this.errored = true
      })
          .finally(() => this.loading = false)
      }
  });
}