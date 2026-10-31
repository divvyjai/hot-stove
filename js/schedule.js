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

function makeRandom(seed){
    // mulberry32 random generation

    let state = seed >>> 0;
    return function(){
        state = (state + 0x6D2B79F5) >>> 0;
        let t = Math.imul(state ^ (state >>> 15), state | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296; // divide by 2^32 to make 0 <= t < 1
    };
}

function shuffle(array, random){
    // Fisher-Yates shuffle using random()

    for(let i = array.length - 1; i >= 0; i--){
        let j = Math.floor(random() * (i + 1));
        const origI = array[i];
        array[i] = array[j];
        array[j] = origI;
    }

    return array;
}