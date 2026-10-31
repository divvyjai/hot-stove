const MS_PER_DAY = 24 * 60 * 60 * 1000;

function parseDate(dateString){
    const [year, month, day] = dateString.split('-').map(Number);
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

    const result = array;

    for(let i = result.length - 1; i > 0; i--){
        let j = Math.floor(random() * (i + 1));
        const origI = result[i];
        result[i] = result[j];
        result[j] = origI;
    }

    return result;
}

function scheduleSeries(series, settings, seed){
    const blackoutDays = new Set(settings.blackoutDays.map(day => dateToDay(settings.startDate, day)));

    const remaining = {};
    const left = {};
    const freeAt = {};
    const done = new Set();
    const placed = [];

    for(const team of teams){
        remaining[team.id] = [];
        left[team.id] = 0;
        freeAt[team.id] = 0;
    }

    const random = makeRandom(seed);
    const totalDays = seasonDays(settings);

    const shuffledSeries = shuffle([...series], random);

    for(const serie of shuffledSeries){
        remaining[serie.home].push(serie);
        remaining[serie.away].push(serie);

        left[serie.home] += serie.games;
        left[serie.away] += serie.games;
    }

    for(let day = 0; day < totalDays; day++){
        if(blackoutDays.has(day)){
            continue;
        }

        let freeToday = []
        for(const team of teams){
            if(freeAt[team.id] <= day && left[team.id] > 0){
                freeToday.push(team.id);
            }
        }

        freeToday = shuffle([...freeToday], random).sort((a, b) => left[b] - left[a]);

        for(const id of freeToday){
            if(freeAt[id] > day){
                continue;
            }

            let bestSeries = null;
            let bestOpponent = null;

            for(const candidate of remaining[id]){
                if(done.has(candidate)){
                    continue;
                }

                const opponent = candidate.home === id ? candidate.away : candidate.home;

                if(freeAt[opponent] > day){
                    continue;
                }

                if(bestSeries === null || left[opponent] > left[bestOpponent]){
                    bestSeries = candidate;
                    bestOpponent = opponent;
                }
            }

            if(bestSeries === null){
                continue;
            }

            const lastDay = day + bestSeries.games;

            let crossesBlackout = false;
            for(let d = day; d < lastDay; d++){
                if(blackoutDays.has(d)){
                    crossesBlackout = true;
                }
            }

            if(lastDay > totalDays || crossesBlackout){
                continue;
            }

            placed.push(
                {
                    ...bestSeries,
                    startDay: day
                }
            )

            done.add(bestSeries);
            freeAt[bestSeries.home] = lastDay;
            freeAt[bestSeries.away] = lastDay;
            left[bestSeries.home] -= bestSeries.games;
            left[bestSeries.away] -= bestSeries.games;
        }
    }

    const unplaced = series.filter(serie => !done.has(serie));

    return {placed, unplaced, seasonDays: totalDays, seed};
}