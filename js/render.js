function renderDivision(division, divisionTeams){
    const divisionContainer = document.createElement("div");
    divisionContainer.classList.add("division-container");

    const divisionHeading = document.createElement("h3");
    divisionHeading.textContent = division.shortName;
    divisionContainer.appendChild(divisionHeading);

    for(let i = 0; i < divisionTeams.length; i++){
        const team = divisionTeams[i];

        const teamContainer = document.createElement("div");
        teamContainer.classList.add("team");
        teamContainer.dataset.teamId = team.id;

        const teamHeader = document.createElement("h4");
        teamHeader.textContent = team.name;

        teamContainer.appendChild(teamHeader);

        const removeButton = document.createElement("button");
        removeButton.classList.add("remove");
        removeButton.textContent = "X";
        removeButton.addEventListener("click", () => {
            removeTeam(team.id);
            renderAll();
        })

        teamContainer.appendChild(removeButton);

        divisionContainer.appendChild(teamContainer);
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
        const divisionElement = renderDivision(division, teamsByDiv[division.id]);
        leagueContainer.appendChild(divisionElement);
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