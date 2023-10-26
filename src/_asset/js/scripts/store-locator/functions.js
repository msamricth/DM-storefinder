function includeJS(file, name, deferred=null, crossorigin=null, integrity=null) {
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


export { includeJS, includeCSS }