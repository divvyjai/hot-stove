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

function renderSettings(){
    const container = document.createElement("div");
    container.classList.add("settings-container");
    const settingsContainer = document.createElement("div");
    settingsContainer.classList.add("settings");

    const divisionContainer = document.createElement("div");
    const divisionLabel = document.createElement("label");
    divisionLabel.textContent = "Division Games:";
    const divisionNumber = document.createElement("input");
    divisionNumber.type = "number";
    divisionNumber.value = seasonSettings.divisionGames;
    divisionNumber.className = "game-number";
    divisionContainer.appendChild(divisionLabel);
    divisionContainer.appendChild(divisionNumber);

    const leagueContainer = document.createElement("div");
    const leagueLabel = document.createElement("label");
    leagueLabel.textContent = "League Games:";
    const leagueNumber = document.createElement("input");
    leagueNumber.type = "number";
    leagueNumber.value = seasonSettings.leagueGames;
    leagueNumber.className = "game-number";
    leagueContainer.appendChild(leagueLabel);
    leagueContainer.appendChild(leagueNumber);

    const interleagueContainer = document.createElement("div");
    const interleagueLabel = document.createElement("label");
    interleagueLabel.textContent = "Interleague Games:";
    const interleagueNumber = document.createElement("input");
    interleagueNumber.type = "number";
    interleagueNumber.value = seasonSettings.interleagueGames;
    interleagueNumber.className = "game-number";
    interleagueContainer.appendChild(interleagueLabel);
    interleagueContainer.appendChild(interleagueNumber);

    settingsContainer.appendChild(divisionContainer);
    settingsContainer.appendChild(leagueContainer);
    settingsContainer.appendChild(interleagueContainer);
    container.appendChild(settingsContainer);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("save");
    saveButton.addEventListener("click", (event) => {
        seasonSettings.divisionGames = divisionNumber.valueAsNumber;
        seasonSettings.leagueGames = leagueNumber.valueAsNumber;
        seasonSettings.interleagueGames = interleagueNumber.valueAsNumber;

        console.log(seasonSettings);
    })
    container.appendChild(saveButton);

    const seasonValidate = document.createElement("p");
    seasonValidate.textContent = validateSeason();
    container.appendChild(seasonValidate);

    return container;
}

function renderAll(){
    const rightContainer = document.getElementById("right-div");
    const leftContainer = document.getElementById("left-div");
    rightContainer.textContent = "";
    leftContainer.textContent = "";

    const teamsByDiv = teamsByDivision(divisions, teams);
    for(const league of leagues){
        rightContainer.append(renderLeague(league, teamsByDiv));
    }

    leftContainer.append(renderSettings());
}

function splitTitle(){
    const title = document.getElementById("title");
    const text = title.textContent;
    title.textContent = "";

    for(let i = 0; i < text.length; i++){
        const letter = document.createElement("span");
        letter.textContent = text[i] === " " ? "\u00A0" : text[i];
        letter.style.setProperty("--i", i);
        letter.setAttribute("aria-hidden", "true");
        title.appendChild(letter);
    }
}