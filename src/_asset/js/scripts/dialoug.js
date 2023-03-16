
const sidebar = document.querySelector(".sidebar");

const app = document.getElementById('app');
var isAppLoaded;
const observer = new MutationObserver((mutations) => {
  if (mutations[0].attributeName === 'class') { 
    isAppLoaded = app.classList.contains('app2-completed');
        if(isAppLoaded){ 
            const input = document.querySelector(".mapboxgl-ctrl-geocoder--input");
            input.addEventListener("input", displayGrey);
        }
    }
});
observer.observe(app, { attributes: true });




function displayGrey(e) {
  sidebar.classList.toggle("search-suggestions-displayed");
}

