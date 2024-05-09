import { GetItem, SetItem} from './helpers.js'
import { SetPlayersTable } from './tables.js'

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

    const addPlayer = document.querySelector(".add-player");
    const addPlayerInput = document.querySelector(".add-player-input");
    addPlayer.addEventListener("submit", (event) => {
        event.preventDefault();
        const jogadores = GetItem("jogadores");
        const newPlayer = {
            name: addPlayerInput.value,
            goals: 0,
            assists: 0,
            wins: 0,
            loses:0,
            team: "",
        }
        jogadores.push(newPlayer);
        SetItem("jogadores", jogadores);
        addPlayerInput.value = "";
        SetPlayersTable();

        

    })
    SetPlayersTable();
})

