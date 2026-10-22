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

    const newTeamContainer = document.createElement("div");
    newTeamContainer.classList.add("newTeam");
    const newTeamName = document.createElement("input");
    newTeamName.classList.add("newTeamName");
    newTeamName.type = "text";
    const addButton = document.createElement("button");
    addButton.textContent = "+";

    const submitNewTeam = () => {
        const name = newTeamName.value.trim();
        if(name !== ""){
            addTeam(division.id, name);
            renderAll();
        }
    }

    addButton.addEventListener("click", submitNewTeam);
    newTeamName.addEventListener("keydown", (event) => {
        if(event.key === "Enter"){
            submitNewTeam()
        }
    });

    newTeamContainer.appendChild(newTeamName);
    newTeamContainer.appendChild(addButton);

    divisionContainer.appendChild(newTeamContainer);

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