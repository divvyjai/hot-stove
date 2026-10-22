function renderDivision(division, divisionTeams){
    const divisionContainer = document.createElement("div");
    divisionContainer.classList.add("division-container");

    const divisionHeading = document.createElement("h3");
    divisionHeading.textContent = division.shortName;
    divisionContainer.appendChild(divisionHeading);

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.textContent = "X";
    removeButton.addEventListener("click", () => {
        removeDivision(division.id);
        renderAll();
    })

    divisionContainer.appendChild(removeButton);

    for(let i = 0; i < divisionTeams.length; i++){
        const team = divisionTeams[i];

        const teamContainer = document.createElement("div");
        teamContainer.classList.add("team");
        teamContainer.dataset.teamId = team.id;

        const teamHeader = document.createElement("p");
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
    newTeamContainer.classList.add("new-team");
    const newTeamName = document.createElement("input");
    newTeamName.classList.add("new-team-name");
    newTeamName.type = "text";
    newTeamName.placeholder = "Add team..."
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

    const newDivisionContainer = document.createElement("div");
    newDivisionContainer.classList.add("new-division");
    const newDivisionName = document.createElement("input");
    newDivisionName.classList.add("new-division-name");
    newDivisionName.type = "text";
    newDivisionName.placeholder = "Add division..."
    const addButton = document.createElement("button");
    addButton.textContent = "+";

    const submitNewDivision = () => {
        const name = newDivisionName.value.trim();
        if(name !== ""){
            addDivision(league.id, name);
            renderAll();
        }
    }

    addButton.addEventListener("click", submitNewDivision);
    newDivisionName.addEventListener("keydown", (event) => {
        if(event.key === "Enter"){
            submitNewDivision();
        }
    });

    newDivisionContainer.appendChild(newDivisionName);
    newDivisionContainer.appendChild(addButton);

    leagueContainer.appendChild(newDivisionContainer);

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