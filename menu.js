import { GetItem, SetItem} from './helpers.js'
import { SetPlayersTable, SetTeamsTable} from './tables.js';
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
    SetPlayersList();
});

const addTeam = document.querySelector(".add-team");
const addTeamInput = document.querySelector(".add-team-input");
const addTeamButton = document.querySelector(".add-team-button");
addTeamButton.disabled = true;
addTeamInput.addEventListener("keyup", () => {
    if(addTeamInput.value == "") {
        addTeamButton.disabled = true
    } else {
        addTeamButton.disabled = false
    }
})
addTeam.addEventListener("submit",(e) => {
    e.preventDefault();
    if(addTeamButton.disabled) return;
    if(document.querySelectorAll(".selected").length == 0) return;
    const selecteds = [];
    document.querySelectorAll(".selected").forEach(selected => selecteds.push(selected.innerHTML));
    const jogadores = GetItem("jogadores");
    jogadores.forEach(jogador => {
        console.log(jogador);
        if(selecteds.some(selected => selected == jogador.name)) {
            jogador.team = addTeamInput.value;
        }
    })
    SetItem("jogadores", jogadores);
    
    const times = GetItem("times");
    times.push({
        name: addTeamInput.value,
        participants: selecteds,
        wins: 0,
        loses: 0,
        
    });
    SetItem("times", times)
    SetPlayersList();
    SetTeamsTable();
    addTeamInput.value = "";
    
})


const playersList = document.querySelector(".players-list");

export const SetPlayersList = () => {
    playersList.innerHTML = "";
    const jogadores = GetItem("jogadores");
    const semTime = jogadores.filter((player) => {if(player.team == "") return player})
    semTime.forEach(player => {
        const element = document.createElement("li");
        element.classList.add("player");
        element.innerText = player.name;
        element.addEventListener("click", () => {
            if(element.classList.contains("selected")) {
                element.classList.remove("selected");
            } else {
                element.classList.add("selected");
            }
        })
        playersList.appendChild(element);
    });
}



window.addEventListener("load",() => SetPlayersList());


