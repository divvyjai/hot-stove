function renderDivision(division, divisionTeams){
    const divisionContainer = document.createElement("div");
    divisionContainer.classList.add("division-container");

    const divisionHeading = document.createElement("h3");
    divisionHeading.textContent = division.shortName;
    divisionContainer.appendChild(divisionHeading);

    for(let i = 0; i < divisionTeams.length; i++){
        const teamText = document.createElement("p");
        teamText.textContent = divisionTeams[i].name;
        divisionContainer.appendChild(teamText);
    }

    return divisionContainer;
}

function renderLeague(league, teamsByDiv){
    const leagueContainer = document.createElement("div");
    leagueContainer.classList.add("league-container");

    const leagueHeading = document.createElement("h2");
    leagueHeading.textContent = league.name;
    leagueContainer.appendChild(leagueHeading);

    const leagueDivisions = divisions.filter(item => item.leagueId === league.id);

    for(const division of leagueDivisions){
        const currentDivision = renderDivision(division, teamsByDiv[division.id]);
        leagueContainer.appendChild(currentDivision);
    }

    return leagueContainer;
}

function renderAll(){
    const container = document.getElementById("right-div");
    container.textContent = "";

    const teamsByDiv = teamsByDivision(divisions, teams);
    for(const league of leagues){
        container.append(renderLeague(league, teamsByDiv));
    }
}

function renderTeams(){
    const container = document.getElementById("right-div");

    for(let i = 0; i < teams.length; i++){
        const p = document.createElement("p");
        p.textContent = teams[i].name;
        container.appendChild(p);
    }
}