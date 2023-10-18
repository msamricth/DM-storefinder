var decodeEntities = (function() {
    // this prevents any overhead from creating the object each time
    var element = document.createElement('div');
  
    function decodeHTMLEntities (str) {
      if(str && typeof str === 'string') {
        // strip script/html tags
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = '';
      }
  
      return str;
    }
  
    return decodeHTMLEntities;
  })();

  var dt = new Date(), 
current_time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds(),
current_day_of_week = new Date().getDay();



  export { decodeEntities }