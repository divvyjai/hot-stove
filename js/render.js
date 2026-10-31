// What was just added ("team-31", "division-7"), so the next render can highlight it.
// renderAll() clears it, so the highlight only plays once.
let justAdded = null;
let currentPage = "teams";
let currentSchedule = null;

// Plays a short fade-out on the element, then removes the data and redraws.
function removeWithAnimation(element, removeFn){
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(reduceMotion){
        removeFn();
        renderAll();
        return;
    }

    element.classList.add("removing");
    setTimeout(() => {
        removeFn();
        renderAll();
    }, 200);
}

function createBadge(team){
    const badge = document.createElement("span");
    badge.classList.add("badge");
    badge.textContent = team.initials;
    return badge;
}

function renderDivision(division, divisionTeams){
    const divisionContainer = document.createElement("div");
    divisionContainer.classList.add("division-container");
    if(justAdded === "division-" + division.id){
        divisionContainer.classList.add("just-added");
    }

    const divisionHeader = document.createElement("div");
    divisionHeader.classList.add("division-header");

    const divisionHeading = document.createElement("h3");
    divisionHeading.textContent = division.shortName;

    const divisionCount = document.createElement("span");
    divisionCount.classList.add("count");
    divisionCount.textContent = divisionTeams.length;
    divisionCount.title = divisionTeams.length + " teams";
    divisionHeading.appendChild(divisionCount);
    divisionHeader.appendChild(divisionHeading);

    const removeButton = document.createElement("button");
    removeButton.classList.add("icon-btn", "remove");
    removeButton.textContent = "X";
    removeButton.addEventListener("click", () => {
        removeWithAnimation(divisionContainer, () => removeDivision(division.id));
    })

    divisionHeader.appendChild(removeButton);
    divisionContainer.appendChild(divisionHeader);

    for(let i = 0; i < divisionTeams.length; i++){
        const team = divisionTeams[i];

        const teamContainer = document.createElement("div");
        teamContainer.classList.add("team");
        teamContainer.dataset.teamId = team.id;
        if(justAdded === "team-" + team.id){
            teamContainer.classList.add("just-added");
        }

        const logoUrl = getLogoUrl(team);
        if(logoUrl){
            const logo = document.createElement("img");
            logo.classList.add("team-logo");
            logo.src = logoUrl;
            logo.alt = "";                 // decorative: the team name is right beside it
            logo.width = 32;
            logo.height = 32;
            // if the image can't load (offline, wrong ID...) fall back to the initials patch
            logo.addEventListener("error", () => logo.replaceWith(createBadge(team)));
            teamContainer.appendChild(logo);
        } else {
            teamContainer.appendChild(createBadge(team));
        }

        const teamHeader = document.createElement("p");
        teamHeader.textContent = team.name;

        teamContainer.appendChild(teamHeader);

        const removeButton = document.createElement("button");
        removeButton.classList.add("icon-btn", "remove");
        removeButton.textContent = "X";
        removeButton.addEventListener("click", () => {
            removeWithAnimation(teamContainer, () => removeTeam(team.id));
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
    addButton.classList.add("icon-btn");
    addButton.textContent = "+";

    const submitNewTeam = () => {
        const name = newTeamName.value.trim();
        if(name !== ""){
            const newTeam = addTeam(division.id, name);
            justAdded = "team-" + newTeam.id;
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

    leagueDivisions.forEach((division, index) => {
        const divisionElement = renderDivision(division, teamsByDiv[division.id]);
        divisionElement.style.setProperty("--n", index);     // used to stagger the intro animation
        leagueContainer.appendChild(divisionElement);
    });

    const newDivisionContainer = document.createElement("div");
    newDivisionContainer.classList.add("new-division");
    const newDivisionName = document.createElement("input");
    newDivisionName.classList.add("new-division-name");
    newDivisionName.type = "text";
    newDivisionName.placeholder = "Add division..."
    const addButton = document.createElement("button");
    addButton.classList.add("icon-btn");
    addButton.textContent = "+";

    const submitNewDivision = () => {
        const name = newDivisionName.value.trim();
        if(name !== ""){
            const newDivision = addDivision(league.id, name);
            justAdded = "division-" + newDivision.id;
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

    const settingsHeading = document.createElement("h2");
    settingsHeading.textContent = "Season";
    container.appendChild(settingsHeading);

    const settingsHint = document.createElement("p");
    settingsHint.classList.add("hint");
    settingsHint.textContent = "Games played against each opponent";
    container.appendChild(settingsHint);

    const settingsContainer = document.createElement("div");
    settingsContainer.classList.add("settings");

    const divisionContainer = document.createElement("div");
    const divisionLabel = document.createElement("label");
    divisionLabel.textContent = "Division rival";
    const divisionNumber = document.createElement("input");
    divisionNumber.type = "number";
    divisionNumber.value = seasonSettings.divisionGames;
    divisionNumber.className = "game-number";
    divisionContainer.appendChild(divisionLabel);
    divisionContainer.appendChild(divisionNumber);

    const leagueContainer = document.createElement("div");
    const leagueLabel = document.createElement("label");
    leagueLabel.textContent = "League rival";
    const leagueNumber = document.createElement("input");
    leagueNumber.type = "number";
    leagueNumber.value = seasonSettings.leagueGames;
    leagueNumber.className = "game-number";
    leagueContainer.appendChild(leagueLabel);
    leagueContainer.appendChild(leagueNumber);

    const interleagueContainer = document.createElement("div");
    const interleagueLabel = document.createElement("label");
    interleagueLabel.textContent = "Interleague rival";
    const interleagueNumber = document.createElement("input");
    interleagueNumber.type = "number";
    interleagueNumber.value = seasonSettings.interleagueGames;
    interleagueNumber.className = "game-number";
    interleagueContainer.appendChild(interleagueLabel);
    interleagueContainer.appendChild(interleagueNumber);

    const wipContainer = document.createElement("div");
    const wipLabel = document.createElement("label");
    wipLabel.textContent = "WIP: Randomly generated calendar based off these settings";
    wipContainer.appendChild(wipLabel);

    for(const input of [divisionNumber, leagueNumber, interleagueNumber]){
        input.min = 0;
        input.step = 1;
        input.required = true;
    }

    settingsContainer.appendChild(divisionContainer);
    settingsContainer.appendChild(leagueContainer);
    settingsContainer.appendChild(interleagueContainer);

    container.appendChild(settingsContainer);

    const startDateContainer = document.createElement("div");
    const startDateLabel = document.createElement("label");
    startDateLabel.textContent = "Start Date";
    startDateContainer.appendChild(startDateLabel);
    const startDate = document.createElement("input");
    startDate.type = "date";
    startDate.value = seasonSettings.startDate;
    startDateContainer.appendChild(startDateLabel);
    startDateContainer.appendChild(startDate);

    const endDateContainer = document.createElement("div");
    const endDateLabel = document.createElement("label");
    endDateLabel.textContent = "End Date";
    endDateContainer.appendChild(endDateLabel);
    const endDate = document.createElement("input");
    endDate.type = "date";
    endDate.value = seasonSettings.endDate;
    endDateContainer.appendChild(endDateLabel);
    endDateContainer.appendChild(endDate);

    settingsContainer.appendChild(startDateContainer);
    settingsContainer.appendChild(endDateContainer);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("save");
    saveButton.addEventListener("click", () => {
        const values = [divisionNumber, leagueNumber, interleagueNumber].map(input => input.valueAsNumber);

        if(values.some(value => !Number.isInteger(value) || value < 0)){
            return;
        }

        if(startDate.value === "" || endDate.value === "" || startDate.value >= endDate.value){
            return;
        }

        seasonSettings.divisionGames = values[0];
        seasonSettings.leagueGames = values[1];
        seasonSettings.interleagueGames = values[2];
        seasonSettings.startDate = startDate.value;
        seasonSettings.endDate = endDate.value;

        renderAll();
    })
    container.appendChild(saveButton);

    const status = validateSeason();
    const seasonValidate = document.createElement("p");
    seasonValidate.classList.add("status", status.valid ? "valid" : "invalid");
    seasonValidate.textContent = status.message;
    container.appendChild(seasonValidate);

    container.appendChild(wipContainer);

    return container;
}

function renderNav(){
    const navbar = document.createElement("div");
    const teamButton = document.createElement("button");
    const scheduleButton = document.createElement("button");

    teamButton.textContent = "Teams";
    scheduleButton.textContent = "Schedule";

    teamButton.addEventListener("click", () => {
        currentPage = "teams";
        renderAll();
    })

    scheduleButton.addEventListener("click", () => {
        currentPage = "schedule";
        renderAll();
    })

    if(currentPage === "teams"){
        teamButton.classList.add("active");
        teamButton.setAttribute("aria-current", "page");
    } else {
        scheduleButton.classList.add("active");
        scheduleButton.setAttribute("aria-current", "page");
    }

    navbar.appendChild(teamButton);
    navbar.appendChild(scheduleButton);

    return navbar;
}

function renderSchedule(){
    const container = document.createElement("div");
    const generateButton = document.createElement("button");

    const seedInput = document.createElement("input");
    const seedLabel = document.createElement("label");
    seedLabel.textContent = "Seed";
    seedInput.type = "number";
    seedInput.value = currentSchedule.seed.toString();
    container.appendChild(seedLabel);
    container.appendChild(seedInput);

    generateButton.addEventListener("click", () => {
        let seed = seedInput.valueAsNumber;
        if(seed === null){
            seed = Math.floor(Math.random() * 1000000);
        }

        currentSchedule = generateSchedule(seed);
        renderAll();
    })

    container.appendChild(generateButton);

    const gameDays = Object.keys(currentSchedule.dates).sort();
    const lastGameDay = gameDays[gameDays.length - 1];
    const placedGames = currentSchedule.schedule.placed.length;
    const unplacedGames = currentSchedule.schedule.unplaced.length;

    const scheduleLabel = document.createElement("label");
    scheduleLabel.textContent = "Schedule Overview";
    const scheduleOverview = document.createElement("p");
    scheduleOverview.textContent = "Placed: " + placedGames + ", Unplaced: " + unplacedGames + ", Last Gameday: " + lastGameDay;

    const unplacedWarning = document.createElement("p");
    unplacedWarning.textContent = unplacedGames > 0 ? "Warning! There are " + currentSchedule.schedule.unplaced.length + " unplaced games" :
                                                      "No unplaced games";

    container.appendChild(scheduleLabel);
    container.appendChild(scheduleOverview);
    container.appendChild(unplacedWarning);

    return container;
}

function renderCalendar() {
    const container = document.createElement("div");

    const date = currentSchedule.dates["2027-03-27"];

    for(const game of date){
        const placeholder = document.createElement("p");

        const homeTeam = teams.find(team => team.id === game.home);
        const awayTeam = teams.find(team => team.id === game.away);

        placeholder.textContent = awayTeam.initials + " @ " + homeTeam.initials;
        container.appendChild(placeholder);
    }

    return container;
}

function renderAll() {
    const navbar = document.getElementById("navbar");
    const rightContainer = document.getElementById("right-div");
    const leftContainer = document.getElementById("left-div");

    rightContainer.textContent = "";
    leftContainer.textContent = "";
    navbar.textContent = "";

    navbar.appendChild(renderNav());

    if (currentPage === "teams") {
        const teamsByDiv = teamsByDivision(divisions, teams);
        for (const league of leagues) {
            rightContainer.append(renderLeague(league, teamsByDiv));
        }

        leftContainer.append(renderSettings());

        justAdded = null;
    } else if (currentPage === "schedule") {
        if(currentSchedule === null){
            currentSchedule = generateSchedule(Math.floor(Math.random() * 1000000));
        }

        leftContainer.appendChild(renderSchedule());
        rightContainer.appendChild(renderCalendar());
    }
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