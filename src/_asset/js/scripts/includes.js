const app = document.getElementById('app');
import { includeJS, includeCSS } from './store-locator/functions.js'
includeJS('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js', 'axios');
includeJS('https://cdn.jsdelivr.net/npm/airtable@0.11.6/lib/airtable.umd.min.js', 'airtable');


includeCSS('https://api.tiles.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css', 'mapbox')

includeJS('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js', 'axios');
includeJS('https://cdn.jsdelivr.net/npm/airtable@0.11.6/lib/airtable.umd.min.js', 'airtable');
//include('https://code.jquery.com/jquery-3.6.1.min.js','jquery', '','anonymous',"sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=");
includeJS('https://api.tiles.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js', 'mapbox');
var pageURL = window.location.href;
if (!pageURL.indexOf("?") > -1) {
    includeCSS('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.css', 'mapbox-gl-geocoder');
    includeJS('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.0/mapbox-gl-geocoder.min.js', 'mapbox-gl-geocoder');
    //include('https://unpkg.com/supercluster@7.1.2/dist/supercluster.min.js', 'mapbox-supercluser');
    includeJS('https://npmcdn.com/@turf/turf/turf.min.js', 'TurfJS');
}
