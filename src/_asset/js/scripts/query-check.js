function getPathFromUrl(url) {
    return url.split(/[?#]/)[0];
}
$pageURL = window.location.href
if (pageURL.indexOf("?fbclid") > -1) {
    window.location.href = getPathFromUrl(pageURL)
}