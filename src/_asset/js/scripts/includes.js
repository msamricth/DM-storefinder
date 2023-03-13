const app = document.getElementById('app');
function include(file, name, deferred=null, crossorigin=null, integrity=null) {

    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    if(deferred){
        script.defer = true;
    }

    if(crossorigin){
        script.crossOrigin = crossorigin;
    }
    if(integrity){
        script.integrity = integrity; 
    }

    document.getElementsByTagName('head').item(0).appendChild(script);
    script.onload = function() {
        app.classList.add(name+"-loaded");
    };
    
}

function includeCSS(file, name) {
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = name;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = file;
    link.media = 'all';
    head.appendChild(link);
    app.classList.add(name+"CSS-loaded");
}


includeCSS('https://api.tiles.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css', 'mapbox')
/* Include Many js files */
include('https://cdn.jsdelivr.net/npm/vue/dist/vue.js', 'vue');
include('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js', 'axios');
include('https://cdn.jsdelivr.net/npm/airtable@0.11.6/lib/airtable.umd.min.js', 'airtable');
include('https://code.jquery.com/jquery-3.6.1.min.js','jquery', true,'anonymous',"sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=");
include('https://api.tiles.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js', 'mapbox');
include('https://kit.fontawesome.com/8b0174b394.js','fontawesome', true, 'anonymous');

includeCSS('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.css', 'mapbox-gl-geocoder');
include('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.min.js', 'mapbox-gl-geocoder');

include('https://npmcdn.com/@turf/turf/turf.min.js', 'TurfJS');