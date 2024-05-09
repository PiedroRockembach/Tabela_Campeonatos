import { GetItem, SetItem } from "./helpers.js";
export const SetPlayersTable = () => {
    const tableSection = document.querySelector('.table-section');
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
        console.log((createPlayerRoll(player)))
        playersTable.appendChild(createPlayerRoll(player));
    });
    tableSection.appendChild(playersTable);
}
export const SetTeamsTable = () => {
    const tableSection = document.querySelector('.table-section');
    const teamsTable = document.createElement("table");
    teamsTable.classList.add("teams-table");
    teamsTable.innerHTML = `
    <thead>
    <th>Nome</th>
    <th>Participantes</th>
    <th>Vitorias</th>
    <th>Derrotas</th>
    </thead>`;
    tableSection.appendChild(teamsTable);
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