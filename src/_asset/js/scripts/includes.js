const app = document.getElementById('app');function include(file, name, deferred=null, crossorigin=null, integrity=null) {

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

/* Include Many js files */
include('https://unpkg.com/vue@3/dist/vue.global.js', 'vue');
include('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js', 'axios');
include('https://code.jquery.com/jquery-3.6.1.min.js','jquery', true,'anonymous',"sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=");
include('https://kit.fontawesome.com/8b0174b394.js','fontawesome', true, 'anonymous');


