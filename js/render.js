function renderTeams(){
    const container = document.getElementById("right-div");

    for(let i = 0; i < teams.length; i++){
        const p = document.createElement("p");
        p.textContent = teams[i].name;
        container.appendChild(p);
    }
}