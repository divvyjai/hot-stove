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
    const newDivision = {
        id: nextDivisionId,
        initials: "ABC",
        name: divisionName,
        shortName: "ABC",
        leagueId: leagueId
    }

    nextDivisionId++;

    divisions.push(newDivision);
}