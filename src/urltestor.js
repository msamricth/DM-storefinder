var URLContainsStore = location.search.substring(1);
var landingPage = document.getElementById('landing');


if(URLContainsStore){
var pageToShow = document.getElementById(URLContainsStore);
    if(pageToShow){
        pageToShow.classList.remove('hidden');
        landingPage.classList.add('hidden');
    }
}