import {
    dt,
    current_day_of_week,
    weekday,
    weekdaySH,
    months,
    month,
    currentDate
} from "./identifiers.js";
function storeHours(day, storeRecord) {
    let opens_time, closes_time;
    
    if ((day == 0)) {
        opens_time = storeRecord.fields.opens_sunday;
        closes_time = storeRecord.fields.closes_sunday;
    }
    if ((day == 1)) {
        opens_time = storeRecord.fields.opens_monday;
        closes_time = storeRecord.fields.closes_monday;
    }
    if ((day == 2)) {
        opens_time = storeRecord.fields.opens_tuesday;
        closes_time = storeRecord.fields.closes_tuesday;
    }
    if ((day == 3)) {
        opens_time = storeRecord.fields.opens_wednesday;
        closes_time = storeRecord.fields.closes_wednesday;
    }
    if ((day == 4)) {
        opens_time = storeRecord.fields.opens_thursday;
        closes_time = storeRecord.fields.closes_thursday;
    }
    if ((day == 5)) {
        opens_time = storeRecord.fields.opens_friday;
        closes_time = storeRecord.fields.closes_friday;
    }
    if ((day == 6)) {
        opens_time = storeRecord.fields.opens_saturday;
        closes_time = storeRecord.fields.closes_saturday;
    }
    if ((day == 7)) {
        opens_time = storeRecord.fields.opens_sunday;
        closes_time = storeRecord.fields.closes_sunday;
    }
    if ((day == 8)) {
        opens_time = storeRecord.fields.opens_monday;
        closes_time = storeRecord.fields.closes_monday;
    }
    return opens_time + ' - ' + closes_time;
}




function storeHoursDisplay(storeRecord, parentDiv) {
    let holidays = [],
        record_Fields,
        notHoliday = "true",
        isHoliday='',
        holidayDate = '';
    axios
        .get(
            "https://api.airtable.com/v0/app7o6tSJG6UICys8/Holiday_exceptions?view=api",
            {
                headers: {
                    Authorization:
                        "Bearer patH2pzfuG2mbHzqd.18833d9077176b68bdf8f7c436376fc5d4962b4df98e82ffb1cf0ed3cedd64e5"
                }
            }
        )
        .then((response) => {
            //  this.rfields = response.data.records;
            record_Fields = response.data.records;
            // this.rTfields = response.data.records.fields;
            for (var i = 0; i < record_Fields.length; i++) {
                //let holidayDate = new Date(record_Fields[i].fields.date).toLocaleDateString('en-us', { weekday: "long", month: "short", day: "numeric" });
                holidays.push({
                    id: record_Fields[i].id,
                    record_date: record_Fields[i].fields.date,
                    record_opening: record_Fields[i].fields.Opening,
                    record_closing: record_Fields[i].fields.Closing,
                    record_id: record_Fields[i].fields.record_id,
                });

            }

            let dayOfWeek;
            var i = 0;
            const dayIterations = [0, 1, 2, 3, 4, 5, 6];

            const hourTitle = parentDiv.appendChild(
                document.createElement("h2")
            );
            hourTitle.innerHTML += "Store Hours";
            for (const day of dayIterations) {

                let storeDate = currentDate + i;
                let storedatefull = dt.setDate(dt.getDate() + day),
                    storeDateForComparison = new Date(storedatefull).toLocaleDateString('en-us', { weekday: "long", month: "short", day: "numeric" });
                dayOfWeek = current_day_of_week + day;
                if (dayOfWeek > 7) {
                    dayOfWeek = dayOfWeek - 7;
                }
                let dayOfWeekLabelShort = weekdaySH[dayOfWeek];
                const hourDisplayRow = parentDiv.appendChild(
                    document.createElement("div")
                );

                hourDisplayRow.className = "store-hours-display-row";
                const hourDisplayRowDay = hourDisplayRow.appendChild(
                    document.createElement("span")
                );
                if (day == 0) {
                    hourDisplayRow.classList.add('font-weight-bold');
                    hourDisplayRowDay.innerHTML = "Today";
                } else {
                    hourDisplayRowDay.innerHTML = dayOfWeekLabelShort;
                }
                const hourDisplayRowDate = hourDisplayRow.appendChild(
                    document.createElement("span")
                );
                if (day == 0) {
                    hourDisplayRowDate.innerHTML = month + ' ' + currentDate;
                } else {
                    hourDisplayRowDate.innerHTML = month + ' ' + storeDate;
                }
                const hourDisplayRowHours = hourDisplayRow.appendChild(
                    document.createElement("span")
                );
                notHoliday = "true";
                for (const holiday of holidays) {
                    holidayDate = new Date(holiday.record_date);
                    function addHours(date, hours) {
                        const hoursToAdd = hours * 60 * 60 * 1000;
                        date.setTime(date.getTime() + hoursToAdd);
                        return date;
                    }
                    holidayDate = addHours(holidayDate, 4);
                    holidayDate = holidayDate.toLocaleDateString('en-us', { weekday: "long", month: "short", day: "numeric" });

                    if (storeDateForComparison == holidayDate) {
                        if (holiday.record_id.includes(storeRecord.id)) {
                            notHoliday = '';
                            isHoliday = 'true';
                            hourDisplayRow.classList.add("holiday");
                            if (holiday.record_opening == 'Closed') {
                                hourDisplayRowHours.innerHTML = holiday.record_closing + "<span class='shd'>*</span>";
                            } else {
                                hourDisplayRowHours.innerHTML = holiday.record_opening + ' - ' + holiday.record_closing + "<span class='shd'>*</span>";
                            }
                        }

                    }
                }
                if (notHoliday) {
                    hourDisplayRowHours.innerHTML = storeHours(dayOfWeek, storeRecord);
                }
                i = i + 1;
            }

            if (isHoliday) {
                const hourfooter = parentDiv.appendChild(
                    document.createElement("span")
                );
                hourfooter.className = "small";
                hourfooter.innerHTML = '*Special store hours.';
            }
        })
        .catch((error) => {
            console.log(error);
        });
}


export { storeHoursDisplay }