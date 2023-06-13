function getPathFromUrl(url) {
    return url.split(/[?#]/)[0];
}
const $pageURL = window.location.href
if ($pageURL.indexOf("?fbclid") > -1) {
    window.location.href = getPathFromUrl($pageURL)
}
import './scripts/store-page.js';
import './scripts/store-map.js';
import './scripts/events.js';
import './scripts/airtable.js';
import './scripts/includes.js';
import './scripts/close.js';
import './scripts/dialoug.js';
