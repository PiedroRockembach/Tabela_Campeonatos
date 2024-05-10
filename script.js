import { SetPlayersTable, SetTeamsTable } from './tables.js'

localStorage.setItem("jogadores", localStorage.getItem("jogadores") || JSON.stringify([]))
localStorage.setItem("times", localStorage.getItem("times") || JSON.stringify([]))

window.addEventListener("load", () => {
    const buttonMenu = document.querySelector(".button-menu");
    const optionsMenu = document.querySelector(".options-menu");
    let optionDisplay = false;
    
    buttonMenu.addEventListener("click", () => {
        optionsMenu.style.display = optionDisplay ? "none" : "flex";
        optionDisplay = !optionDisplay;
    });

    const playersTableButton = document.querySelector(".jogadores-button");
    const teamsTableButton = document.querySelector(".teams-button");
    playersTableButton.addEventListener("click", () => SetPlayersTable())
    teamsTableButton.addEventListener("click", () => SetTeamsTable())
    SetPlayersTable();

})

