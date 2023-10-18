const dt = new Date();
const current_day_of_week = dt.getDay();
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const weekdaySH = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat", "Sun"];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const month = months[dt.getMonth()];
const currentDate = dt.getDate();
let storeDate = currentDate;
//closing time display
function closingTimeDisplay(record) {
    var current_time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds(),
        closing_time,
        closing_time_comparison,
        closing_time_display;
        
    if ((current_day_of_week == 0)) {
        closing_time = convert24timeToSecondsAirtable(
            record.fields.closing_Sunday[0]
        );
    }
    if ((current_day_of_week == 1)) {
        closing_time_comparison = convert24timeToSecondsAirtable(
            record.fields.closing_Monday[0]
        );
        closing_time = record.fields.closing_Monday[0];
    }
    if ((current_day_of_week == 2)) {
        closing_time_comparison = convert24timeToSecondsAirtable(
            record.fields.closing_Tuesday[0]
        );
        closing_time = record.fields.closing_Tuesday[0];
    }
    if ((current_day_of_week == 3)) {
        closing_time_comparison = convert24timeToSecondsAirtable(
            record.fields.closing_Wednesday[0]
        );
        closing_time = record.fields.closing_Wednesday[0];
    }
    if ((current_day_of_week == 4)) {
        closing_time_comparison = convert24timeToSecondsAirtable(
            record.fields.closing_Thursday[0]
        );
        closing_time = record.fields.closing_Thursday[0];
    }
    if ((current_day_of_week == 5)) {
        closing_time_comparison = convert24timeToSecondsAirtable(
            record.fields.closing_Friday[0]
        );
        closing_time = record.fields.closing_Friday[0];
    }
    if ((current_day_of_week == 6)) {
        closing_time_comparison = convert24timeToSecondsAirtable(
            record.fields.closing_Saturday[0]
        );
        closing_time = record.fields.closing_Saturday[0];
    }
    if ((current_day_of_week == 7)) {
        closing_time_comparison = convert24timeToSecondsAirtable(
            record.fields.closing_Sunday[0]
        );
        closing_time = record.fields.closing_Sunday[0];
    }
    if (closing_time_comparison) {
        if (closing_time_comparison > timeToSeconds(current_time)) {
            closing_time_display = "<strong>Open until " + closing_time + " today</strong>";
        } else {
            closing_time_display = openingtimes(record);
        }
    } else {
        closing_time_display = record.fields.hours_api[0];
    }
    return closing_time_display;
}

function openingtimes(record) {
    var opening_time,
        opening_time_comparison,
        opening_time_display;
    if ((current_day_of_week == 0)) {
        opening_time = record.fields.opening_Monday[0];
    }
    if ((current_day_of_week == 1)) {
        opening_time = record.fields.opening_Tuesday[0];
    }
    if ((current_day_of_week == 2)) {
        opening_time = record.fields.opening_Wednesday[0];
    }
    if ((current_day_of_week == 3)) {
        opening_time = record.fields.opening_Thursday[0];
    }
    if ((current_day_of_week == 4)) {
        opening_time = record.fields.opening_Friday[0];
    }
    if ((current_day_of_week == 5)) {
        opening_time = record.fields.opening_Saturday[0];
    }
    if ((current_day_of_week == 6)) {
        opening_time = record.fields.opening_Sunday[0];
    }
    if ((current_day_of_week == 7)) {
        opening_time = record.fields.opening_Monday[0];
    }
    opening_time_display = "<strong>Closed: </strong>Opens tomorrow at " + opening_time;

    return opening_time_display;

}
function convert24timeToSecondsAirtable(time) {
    if (time) {
        time = time.split(/:/);
        let minutes = time[1];
        if(minutes) minutes = minutes.replace(" PM", "");
        return time[0] + 12 * 3600 + minutes * 60;
    }
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
function storeHours(day, record){
    let opening_time, closing_time;
    if ((day == 0)) {
        opening_time = record.fields.opening_Monday[0];
        closing_time = record.fields.closing_Monday[0];
    }
    if ((day == 1)) {
        opening_time = record.fields.opening_Tuesday[0];
        closing_time = record.fields.closing_Tuesday[0];
    }
    if ((day == 2)) {
        opening_time = record.fields.opening_Wednesday[0];
        closing_time = record.fields.closing_Wednesday[0];
    }
    if ((day == 3)) {
        opening_time = record.fields.opening_Thursday[0];
        closing_time = record.fields.closing_Thursday[0];
    }
    if ((day == 4)) {
        opening_time = record.fields.opening_Friday[0];
        closing_time = record.fields.closing_Friday[0];
    }
    if ((day == 5)) {
        opening_time = record.fields.opening_Saturday[0];
        closing_time = record.fields.closing_Saturday[0];
    }
    if ((day == 6)) {
        opening_time = record.fields.opening_Sunday[0];
        closing_time = record.fields.closing_Sunday[0];
    }
    if ((day == 7)) {
        opening_time = record.fields.opening_Monday[0];
        closing_time = record.fields.closing_Monday[0];
    }
    return opening_time + ' - ' + closing_time;
}

function storeHoursDisplay(record, parentDiv){
    let dayOfWeek;
    var i = 0;
    const dayIterations = [0,1,2,3,4,5,6];
    
    const hourTitle = parentDiv.appendChild(
        document.createElement("h2")
    );
    hourTitle.innerHTML +="Store Hours";
    for (const day of dayIterations) {
        i = i+1;
        storeDate = currentDate + i;
        const hourDisplayRow = parentDiv.appendChild(
            document.createElement("div")
        );
        hourDisplayRow.className = "store-hours-display-row";
        dayOfWeek = current_day_of_week + day;
        if(dayOfWeek > 7){
            dayOfWeek = dayOfWeek - 7;
        } 
        let dayOfWeekLabelShort = weekdaySH[dayOfWeek];
        
        const hourDisplayRowDay = hourDisplayRow.appendChild(
            document.createElement("span")
        );
        if(day == 0){
            hourDisplayRow.classList.add('font-weight-bold');
            hourDisplayRowDay.innerHTML = "Today";
        } else {
            hourDisplayRowDay.innerHTML = dayOfWeekLabelShort;
        }
        const hourDisplayRowDate = hourDisplayRow.appendChild(
            document.createElement("span")
        );
        
        if(day == 0){
            hourDisplayRowDate.innerHTML = month +' '+ currentDate;
        } else {
            hourDisplayRowDate.innerHTML = month +' '+ storeDate;
        }
        const hourDisplayRowHours = hourDisplayRow.appendChild(
            document.createElement("span")
        );
        hourDisplayRowHours.innerHTML = storeHours(dayOfWeek, record);
    }
}


export { closingTimeDisplay, storeHoursDisplay }