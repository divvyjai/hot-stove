const MS_PER_DAY = 24 * 60 * 60 * 1000

function parseDate(dateString){
    const [year, month, day] = dateString.split('-');
    return Date.UTC(year, month - 1, day);
}

function dayToDate(startDate, dayIndex){
    return new Date(parseDate(startDate) + dayIndex * MS_PER_DAY).toISOString().slice(0, 10);
}

function dateToDay(startDate, dateString){
    return (parseDate(dateString) - parseDate(startDate)) / MS_PER_DAY;
}

function seasonDays(settings){
    return dateToDay(settings.startDate, settings.endDate) + 1;
}