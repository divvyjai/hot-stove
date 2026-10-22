const leagues = [
    { id:1, initials:"AL", name:"American League" },
    { id:2, initials:"NL", name:"National League" }
]

const divisions = [
    { id:1, initials:"NLW", name:"National League West",    shortName:"NL West",    leagueId:2 },
    { id:2, initials:"NLC", name:"National League Central", shortName:"NL Central", leagueId:2 },
    { id:3, initials:"NLE", name:"National League East",    shortName:"NL East",    leagueId:2 },
    { id:4, initials:"ALW", name:"American League West",    shortName:"AL West",    leagueId:1 },
    { id:5, initials:"ALC", name:"American League Central", shortName:"AL Central", leagueId:1 },
    { id:6, initials:"ALE", name:"American League East",    shortName:"AL East",    leagueId:1 }
]

const teams = [
    // NL West (division 1)
    { id:1,  initials:"AZ",  name:"Arizona Diamondbacks",  shortName:"Diamondbacks", logo:"images/PLACEHOLDER.png", divisionId:1 },
    { id:2,  initials:"COL", name:"Colorado Rockies",      shortName:"Rockies",      logo:"images/PLACEHOLDER.png", divisionId:1 },
    { id:3,  initials:"LAD", name:"Los Angeles Dodgers",   shortName:"Dodgers",      logo:"images/PLACEHOLDER.png", divisionId:1 },
    { id:4,  initials:"SD",  name:"San Diego Padres",      shortName:"Padres",       logo:"images/PLACEHOLDER.png", divisionId:1 },
    { id:5,  initials:"SF",  name:"San Francisco Giants",  shortName:"Giants",       logo:"images/PLACEHOLDER.png", divisionId:1 },

    // NL Central (division 2)
    { id:6,  initials:"CHC", name:"Chicago Cubs",          shortName:"Cubs",         logo:"images/PLACEHOLDER.png", divisionId:2 },
    { id:7,  initials:"CIN", name:"Cincinnati Reds",       shortName:"Reds",         logo:"images/PLACEHOLDER.png", divisionId:2 },
    { id:8,  initials:"MIL", name:"Milwaukee Brewers",     shortName:"Brewers",      logo:"images/PLACEHOLDER.png", divisionId:2 },
    { id:9,  initials:"PIT", name:"Pittsburgh Pirates",    shortName:"Pirates",      logo:"images/PLACEHOLDER.png", divisionId:2 },
    { id:10, initials:"STL", name:"St. Louis Cardinals",   shortName:"Cardinals",    logo:"images/PLACEHOLDER.png", divisionId:2 },

    // NL East (division 3)
    { id:11, initials:"ATL", name:"Atlanta Braves",        shortName:"Braves",       logo:"images/PLACEHOLDER.png", divisionId:3 },
    { id:12, initials:"MIA", name:"Miami Marlins",         shortName:"Marlins",      logo:"images/PLACEHOLDER.png", divisionId:3 },
    { id:13, initials:"NYM", name:"New York Mets",         shortName:"Mets",         logo:"images/PLACEHOLDER.png", divisionId:3 },
    { id:14, initials:"PHI", name:"Philadelphia Phillies", shortName:"Phillies",     logo:"images/PLACEHOLDER.png", divisionId:3 },
    { id:15, initials:"WSH", name:"Washington Nationals",  shortName:"Nationals",    logo:"images/PLACEHOLDER.png", divisionId:3 },

    // AL West (division 4)
    { id:16, initials:"HOU", name:"Houston Astros",        shortName:"Astros",       logo:"images/PLACEHOLDER.png", divisionId:4 },
    { id:17, initials:"LAA", name:"Los Angeles Angels",    shortName:"Angels",       logo:"images/PLACEHOLDER.png", divisionId:4 },
    { id:18, initials:"ATH", name:"Oakland Athletics",     shortName:"Athletics",    logo:"images/PLACEHOLDER.png", divisionId:4 },
    { id:19, initials:"SEA", name:"Seattle Mariners",      shortName:"Mariners",     logo:"images/PLACEHOLDER.png", divisionId:4 },
    { id:20, initials:"TEX", name:"Texas Rangers",         shortName:"Rangers",      logo:"images/PLACEHOLDER.png", divisionId:4 },

    // AL Central (division 5)
    { id:21, initials:"CWS", name:"Chicago White Sox",     shortName:"White Sox",    logo:"images/PLACEHOLDER.png", divisionId:5 },
    { id:22, initials:"CLE", name:"Cleveland Guardians",   shortName:"Guardians",    logo:"images/PLACEHOLDER.png", divisionId:5 },
    { id:23, initials:"DET", name:"Detroit Tigers",        shortName:"Tigers",       logo:"images/PLACEHOLDER.png", divisionId:5 },
    { id:24, initials:"KC",  name:"Kansas City Royals",    shortName:"Royals",       logo:"images/PLACEHOLDER.png", divisionId:5 },
    { id:25, initials:"MIN", name:"Minnesota Twins",       shortName:"Twins",        logo:"images/PLACEHOLDER.png", divisionId:5 },

    // AL East (division 6)
    { id:26, initials:"BAL", name:"Baltimore Orioles",     shortName:"Orioles",      logo:"images/PLACEHOLDER.png", divisionId:6 },
    { id:27, initials:"BOS", name:"Boston Red Sox",        shortName:"Red Sox",      logo:"images/PLACEHOLDER.png", divisionId:6 },
    { id:28, initials:"NYY", name:"New York Yankees",      shortName:"Yankees",      logo:"images/PLACEHOLDER.png", divisionId:6 },
    { id:29, initials:"TB",  name:"Tampa Bay Rays",        shortName:"Rays",         logo:"images/PLACEHOLDER.png", divisionId:6 },
    { id:30, initials:"TOR", name:"Toronto Blue Jays",     shortName:"Blue Jays",    logo:"images/PLACEHOLDER.png", divisionId:6 }
]

const league = {leagues, divisions, teams}
const seasonSettings = {divisionGames: 13, leagueGames: 8, interleagueGames: 2}
const MAX_SERIES_LENGTH = 4;
let nextTeamId = 31;
let nextDivisionId = 7;

function teamsByDivision(divisions, teams) {
    const finalList = {};
    for(let i = 0; i < divisions.length; i++) {
        const currentDivision = divisions[i];
        const divisionList = [];
        for(let j = 0; j < teams.length; j++) {
            const currentTeam = teams[j];
            if(currentTeam.divisionId === currentDivision.id){
                divisionList.push(currentTeam);
            }
        }

        finalList[currentDivision.id] = divisionList;
    }

    return finalList;
}

function removeTeam(teamId){
    const index = teams.findIndex(team => team.id === teamId);
    if(index !== -1){
        teams.splice(index, 1);
    }
}

function addTeam(divisionId, teamName){
    const newTeam = {
        id: nextTeamId,
        initials: "ABC",
        name: teamName,
        shortName: "ABC",
        logo: "images/PLACEHOLDER.png",
        divisionId: divisionId
    }

    nextTeamId++;

    teams.push(newTeam);
}

function removeDivision(divisionId){
    const index = divisions.findIndex(division => division.id === divisionId);
    if(index !== -1){
        divisions.splice(index, 1);
    }

    for(let i = teams.length - 1; i >= 0; i--){
        const currentTeam = teams[i];
        if(currentTeam.divisionId === divisionId){
            teams.splice(i, 1);
        }
    }
}

function addDivision(leagueId, divisionName){
    const league = leagues.find(league => league.id === leagueId);
    const newDivision = {
        id: nextDivisionId,
        initials: "ABC",
        name: league.name + " " + divisionName,
        shortName: league.initials + " " + divisionName,
        leagueId: leagueId
    }

    nextDivisionId++;

    divisions.push(newDivision);
}

// function getLeagueOfTeam(team){
//     const division = divisions.find(item => item.id === team.divisionId);
//     const league = leagues.find(item => item.id === division.leagueId);
//
//     return league;
// }

function gamesForTeam(team){
    const division = divisions.find(item => item.id === team.divisionId);

    const teamsInDivision = teams.filter(t => t.divisionId === division.id).length;
    let teamsInLeague = 0;

    for(let newDivision of divisions){
        if(newDivision.leagueId === division.leagueId){
            const otherTeamsInLeague = teams.filter(t => t.divisionId === newDivision.id);
            teamsInLeague += otherTeamsInLeague.length;
        }
    }

    const divisionGames = (teamsInDivision - 1) * seasonSettings.divisionGames;
    const leagueGames = (teamsInLeague - teamsInDivision) * seasonSettings.leagueGames;
    const interleagueGames = (teams.length - teamsInLeague) * seasonSettings.interleagueGames;

    // console.log(divisionGames);
    // console.log(leagueGames);
    // console.log(interleagueGames);

    return divisionGames + leagueGames + interleagueGames;
}

function validateSeason(){
    const gameCounts = [];
    for(let team of teams){
        gameCounts.push(gamesForTeam(team));
    }

    if(Math.max(...gameCounts) !== Math.min(...gameCounts)){
        console.error("team game counts do not match")
        console.log("Minimum: " + Math.min(...gameCounts));
        console.log("Maximum: " + Math.max(...gameCounts));

        return "Team counts do not match. Minimum: " + Math.min(...gameCounts) + ", maximum: " + Math.max(...gameCounts);
    }

    return "All teams play " + gameCounts[0] + " games.";
}

function relationship(teamA, teamB){
    if(teamA.divisionId === teamB.divisionId){
        return "division";
    }

    const division = divisions.find(item => item.id === teamA.divisionId);
    const teamsInLeague = [];

    for(let newDivision of divisions){
        if(newDivision.leagueId === division.leagueId){
            const otherTeamsInLeague = teams.filter(t => t.divisionId === newDivision.id);
            teamsInLeague.push(...otherTeamsInLeague);
        }
    }

    if(teamsInLeague.includes(teamB)){
        return "league";
    }

    return "interleague";
}

function generateMatchups(){
    const matchups = [];
    // const homeCount = [];

    // for(let team of teams){
    //     const newCount = {
    //         teamId: team.id,
    //         count: 0
    //     }
    //
    //     homeCount.push(newCount);
    // }

    const gamesByType = {
        division: seasonSettings.divisionGames,
        league: seasonSettings.leagueGames,
        interleague: seasonSettings.interleagueGames
    };

    for(let i = 0; i < teams.length; i++){
        const teamA = teams[i];
        for(let j = i + 1; j < teams.length; j++){
            const teamB = teams[j];
            const type = relationship(teamA, teamB);
            const games = gamesByType[type];

            // const teamAHomeCount = homeCount.find(item => item.teamId === teamA.id).count;
            // const teamBHomeCount = homeCount.find(item => item.teamId === teamB.id).count;
            //
            // let homeA = 0;
            // let homeB = 0;
            //
            // if(teamAHomeCount > teamBHomeCount){
            //     homeA = Math.floor(games / 2);
            //     homeB = Math.ceil(games / 2);
            // } else {
            //     homeA = Math.ceil(games / 2);
            //     homeB = Math.floor(games / 2);
            // }
            //
            // homeCount.find(item => item.teamId === teamA.id).count += homeA;
            // homeCount.find(item => item.teamId === teamB.id).count += homeB;

            const newMatchup = {
                teamA: teamA.id,
                teamB: teamB.id,
                // homeA: homeA,
                // homeB: homeB,
                games: gamesByType[type],
                type: type
            }

            matchups.push(newMatchup);
        }
    }

    return matchups;
}

function splitIntoSeries(games, maxLength){
    if(games <= 0){
        return [];
    }

    const finalArray = [];

    const noSeries = Math.ceil(games / maxLength);
    const minGamesPerSeries = Math.floor(games / noSeries);
    let remainder = games % noSeries;

    for(let i = 0; i < noSeries; i++){
        if(remainder > 0){
            finalArray.push(minGamesPerSeries + 1);
            remainder--;
        } else {
            finalArray.push(minGamesPerSeries);
        }
    }

    return finalArray;
}

function generateSeries(matchups){
    const finalArray = [];
    const balance = {};

    for(let team of teams){
        balance[team.id] = 0;
    }

    for(let matchup of matchups){
        const series = splitIntoSeries(matchup.games, MAX_SERIES_LENGTH);
        let aHosted;

        for(let numGames of series) {
            let aHostsThis;
            const teamABalance = balance[matchup.teamA];
            const teamBBalance = balance[matchup.teamB];

            if (teamABalance < teamBBalance) {
                aHostsThis = true;
            } else if (teamABalance > teamBBalance) {
                aHostsThis = false;
            } else {
                aHostsThis = !aHosted;
            }

            const home = aHostsThis ? matchup.teamA : matchup.teamB;
            const away = aHostsThis ? matchup.teamB : matchup.teamA;

            finalArray.push({home: home, away: away, games: numGames});
            balance[home] += numGames;
            balance[away] -= numGames;
            aHosted = aHostsThis;
        }
    }

    return finalArray;
}