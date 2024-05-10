import { GetItem, SetItem } from "./helpers.js";
import { SetPlayersList } from "./menu.js"
export const SetPlayersTable = () => {
    const tableSection = document.querySelector('.table-section');
    tableSection.innerHTML = "";
    const playersTable = document.createElement("table");
    playersTable.classList.add("player-table");
    playersTable.innerHTML = `
    <thead>
    <th>Nome</th>
    <th>Gols</th>
    <th>Assistencias</th>
    <th>Vitorias</th>
    <th>Derrotas</th>
    </thead>`;
    const jogadores = GetItem("jogadores");

    jogadores.forEach((player) => {
    
        playersTable.appendChild(createPlayerRoll(player));
    });
    tableSection.appendChild(playersTable);
}
export const SetTeamsTable = () => {
    const tableSection = document.querySelector('.table-section');
    tableSection.innerHTML = "";
    const teamsTable = document.createElement("table");
    teamsTable.classList.add("teams-table");
    teamsTable.innerHTML = `
    <thead>
    <th>Nome</th>
    <th>Participantes</th>
    <th>Vitorias</th>
    <th>Derrotas</th>
    </thead>`;
    const teams = GetItem("times");
    teams.forEach(team => {
        teamsTable.appendChild(createTeamRoll(team));
    });
    tableSection.appendChild(teamsTable);
}
const createTeamRoll = ({name, participants, wins, loses}) => {
    const roll = document.createElement("tr");
    roll.classList.add("table-roll")
    const rollName = document.createElement("td");
    const rollParticipants = document.createElement("td");
    const rollWins = document.createElement("td");
    const rollLoses = document.createElement("td");
    rollParticipants.classList.add("participants")
    rollName.name = name;
    rollParticipants.name = name;
    participants.forEach(participant => {
        rollParticipants.appendChild(createTeamPlayer(participant, name));
    })
    rollWins.name = name;
    rollLoses.name = name;
    rollName.innerHTML = name;

    rollWins.appendChild(createInput("wins", name, wins, "times"));
    rollLoses.appendChild(createInput("loses", name, loses, "times"));
    roll.appendChild(rollName);
    roll.appendChild(rollParticipants);
    roll.appendChild(rollWins);
    roll.appendChild(rollLoses);
    return roll;
}
const createTeamPlayer = (name, teamName) => {
    const player = document.createElement("div");
    const span = document.createElement("span");
    const removebtn = document.createElement("button");
    removebtn.innerText = "x"
    removebtn.addEventListener("click", ()=> {
        const teams = GetItem("times");
        const jogadores = GetItem("jogadores");
        teams.forEach(team => {
            if(team.name == teamName) {
                team.participants.forEach(participant => {
                    if(participant == name) {
                        team.participants.splice(team.participants.indexOf(name), 1);
                    }
                })
            }
            console.log(team.participants.length);
            if(team.participants.length == 0) {
                 teams.splice(teams.indexOf(team), 1)
            }
        })
        jogadores.forEach(jogador => {
            if(jogador.name == name) {
                jogador.team = "";
            }
        })
        SetItem("jogadores", jogadores);
        SetItem("times", teams);
        SetTeamsTable();
        SetPlayersList();
    });
    span.innerText = name;
    player.classList.add("team-player")
    player.appendChild(span);
    player.appendChild(removebtn);
    return player;
}

const createPlayerRoll = ({name, goals, assists, wins, loses}) => {
    const roll = document.createElement("tr");
    const rollName = document.createElement("td");
    const rollGoals = document.createElement("td");
    const rollAssists = document.createElement("td");
    const rollWins = document.createElement("td");
    const rollLoses = document.createElement("td");
    rollName.name = name;
    rollGoals.name = name;
    rollAssists.name = name;
    rollWins.name = name;
    rollLoses.name = name;

    rollName.innerHTML = name;

    rollGoals.appendChild(createInput("goals", name, goals, "jogadores"));
    rollAssists.appendChild(createInput("assists", name, assists, "jogadores"));
    rollWins.appendChild(createInput("wins", name, wins, "jogadores"));
    rollLoses.appendChild(createInput("loses", name, loses, "jogadores"));

    roll.appendChild(rollName);
    roll.appendChild(rollGoals);
    roll.appendChild(rollAssists);
    roll.appendChild(rollWins);
    roll.appendChild(rollLoses);

    return roll;
}

const createInput = (attr, name, value, storage) => {
    const newInput = document.createElement("input");
    newInput.type = "number";
    newInput.classList.add("table-input");
    newInput.value = value;
    newInput.addEventListener("change", () => {
        const jogadores = GetItem(storage);
        jogadores.forEach((player) => {
            if(player.name == name) {
                player[attr] = newInput.value;
            }
        });

        SetItem(storage, jogadores)
    })
    return newInput;
}