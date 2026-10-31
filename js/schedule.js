function dayToDate(startDate, dayIndex){
    const startDateArray = startDate.split('-').map(Number);
    const startYear = startDateArray[0];
    const startMonth = startDateArray[1];
    const startDay = startDateArray[2];
    const startDateUTC = Date.UTC(startYear, startMonth - 1, startDay);

    const dayUTC = dayIndex * 24 * 60 * 60 * 1000;

    const currentDate = startDateUTC + dayUTC;
    return new Date(currentDate).toISOString().slice(0, 10)
}

function dateToDay(startDate, dateString){
    const startDateArray = startDate.split('-').map(Number);
    const startYear = startDateArray[0];
    const startMonth = startDateArray[1];
    const startDay = startDateArray[2];
    const startDateUTC = Date.UTC(startYear, startMonth - 1, startDay);

    const currentDateArray = dateString.split('-').map(Number);
    const currentYear = currentDateArray[0];
    const currentMonth = currentDateArray[1];
    const currentDay = currentDateArray[2];
    const currentDateUTC = Date.UTC(currentYear, currentMonth - 1, currentDay);

    return (currentDateUTC - startDateUTC) / (24 * 60 * 60 * 1000);
}

function seasonDays(settings){
    return dateToDay(settings.startDate, settings.endDate) + 1;
}