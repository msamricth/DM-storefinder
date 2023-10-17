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



//closing time display
function closingTimeDisplay(record){
  var closing_time,
  closing_time_comparison,
  closing_time_display;
  if ((current_day_of_week = 0)) {
    closing_time = convert24timeToSeconds(
      record.fields.Sunday
    );
  }
  if ((current_day_of_week = 1)) {
    closing_time_comparison = convert24timeToSeconds(
      record.fields.Monday
    );
    closing_time = record.fields.Monday;
  }
  if ((current_day_of_week = 2)) {
    closing_time_comparison = convert24timeToSeconds(
      record.fields.Tuesday
    );
    closing_time = record.fields.Tuesday;
  }
  if ((current_day_of_week = 3)) {
    closing_time_comparison = convert24timeToSeconds(
      record.fields.Wednesday
    );
    closing_time = record.fields.Wednesday;
  }
  if ((current_day_of_week = 4)) {
    closing_time_comparison = convert24timeToSeconds(
      record.fields.Thursday
    );
    closing_time = record.fields.Thursday;
  }
  if ((current_day_of_week = 5)) {
    closing_time_comparison = convert24timeToSeconds(
      record.fields.Friday
    );
    closing_time = record.fields.Friday;
  }
  if ((current_day_of_week = 6)) {
    closing_time_comparison = convert24timeToSeconds(
      record.fields.Saturday
    );
    closing_time = record.fields.Saturday;
  }
  if ((current_day_of_week = 7)) {
    closing_time_comparison = convert24timeToSeconds(
      record.fields.Sunday
    );
    closing_time = record.fields.Sunday;
  }
  if (closing_time_comparison) {
    if (closing_time_comparison > timeToSeconds(current_time)) {
      closing_time_display = "Open until " + closing_time+" today";
    } else {
      closing_time_display = record.fields.Hours;
    }
  } else {
    closing_time_display = record.fields.Hours;
  }
  return closing_time_display;
}


  function convert24timeToSeconds(time) {
    if (time) {
      time = time.split(/:/);
      return time[0] + 12 * 3600 + time[1] * 60 + time[2];
    }
  }
  function timeToSeconds(time) {
    time = time.split(/:/);
    return time[0] * 3600 + time[1] * 60 + time[2];
  }

  export { closingTimeDisplay, decodeEntities }