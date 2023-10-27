import {
    dt,
    current_day_of_week,
    weekday,
    weekdaySH,
    months,
    month,
    currentDate
} from "./identifiers.js";




function closingTimeDisplay(record) {
    let current_time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds(),
        closing_time,
        closing_time_comparison,
        closing_time_display;

    closing_time = record.fields.Closing_at[0];
    if (closing_time == 'Closed') {
        closing_time_display = openingtimes(record);
    } else {
        closing_time_comparison = convert24timeToSecondsAirtable(
            closing_time
        );
        if (closing_time_comparison > timeToSeconds(current_time)) {
            closing_time_display = "<strong>Open until " + closing_time + " today</strong>";
        } else {
            closing_time_display = openingtimes(record);
        }
    }

    return closing_time_display;
}

function openingtimes(record) {
    let opening_time_display;

    opening_time_display = "<strong>Closed: </strong>Opens " + record.fields.Opens_next;

    return opening_time_display;

}
function convert24timeToSecondsAirtable(time) {
    if (time) {
        time = time.split(/:/);
        let minutes = time[1];
        if (minutes) minutes = minutes.replace(" PM", "");
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



export { closingTimeDisplay }