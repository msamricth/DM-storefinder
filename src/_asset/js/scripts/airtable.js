const app = document.getElementById('app');
var isVueLoaded;
new MutationObserver((mutations) => {
  if (mutations[0].attributeName === 'class') { 
    
    isVueLoaded = app.classList.contains('vue-loaded');
    if(isVueLoaded){
        startApp();
    }
  }
}).observe(app, { attributes: true });


function startApp(){
    const { createApp } = Vue
                
    createApp({
        data() {
          return {
            message: 'Hello Vue!'
          }
        }
      }).mount('#app');
      console.log('airtable');
}