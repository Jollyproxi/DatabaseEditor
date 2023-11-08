const races_map = { 2: "bah0",1: "aus0",11: "sau0",24: "imo0",22: "mia0",5: "spa0",6: "mon0",4: "aze0",7: "can0",10: "gbr0",9: "aut0",8: "fra0",12: "hun0",13: "bel0",14: "ita0",15: "sgp0",17: "jap0",19: "usa0",18: "mex0",20: "bra0",21: "uae0",23: "ned0",25: "veg0",26: "qat0" };
const races_names = { 2: "BAH",1: "AUS",11: "SAU",24: "IMO",22: "MIA",5: "SPA",6: "MON",4: "AZE",7: "CAN",10: "GBR",9: "AUT",8: "FRA",12: "HUN",13: "BEL",14: "ITA",15: "SGP",17: "JAP",19: "USA",18: "MEX",20: "BRA",21: "UAE",23: "NED",25: "VEG",26: "QAT" };
const teams_full_name_dict = { 'FERRARI': 1,'MCLAREN': 2,'RED BULL': 3,'MERCEDES': 4,'ALPINE': 5,'WILIIAMS': 6,'HAAS': 7,'ALPHA TAURI': 8,'ALFA ROMEO': 9,'ASTON MARTIN': 10 }
const logos_disc =  { 
    1: '../assets/images/ferrari.png', 
    2: '../assets/images/mclaren.png', 
    3: '../assets/images/redbull.png', 
    4: '../assets/images/mercedes.png', 
    5: '../assets/images/alpine.png', 
    6: '../assets/images/williams.png', 
    7: '../assets/images/haas.png', 
    8: '../assets/images/alphatauri.png', 
    9: '../assets/images/alfaromeo.png', 
    10: '../assets/images/astonmartin.png'};
let seasonTable;
let teamsTable;
let default_points = ["25","18","15","12","10","8","6","4","2","1","DNF","0","","-"]
let races_ids = []
let seasonResults;
let calendarData;
let pointsOrPos = "points"

/**
 * Creates the main table for the calendar of the season selected
 * @param {Object} calendar calendar of the year selected
 */
function createDriversTable(calendar) {
    calendarData = calendar;
    calendar.forEach(function (elem,index) {
        races_ids.push(calendar[index][0])
    })
    seasonTable = new Tabulator("#seasonresults-table",{
        layout: "fitColumns",
        maxWidth: "1650px",
        responsiveLayout: "hide",
        columns: [{ title: "Driver",field: "driver",width: 175,headerSort: false,resizable: false,formatter: "html",headerHozAlign: "center" },
        ...calendar.map((race,index) => ({
            title: '<div class="flag-header"><img src="' + codes_dict[races_map[race[1]]] + '" alt="Image 1"><div class="text-in-front bold-font">' + races_names[race[1]] + '</div></div>',
            field: "race" + race[0],
            hozAlign: "center",
            headerSort: false,
            resizable: false
        })),
        { title: "Points",field: "points",hozAlign: "center",headerSort: false,headerHozAlign: "center",resizable: false },
        { title: "Position",field: "pos",hozAlign: "center",visible: false }

        ],
        rowFormatter: function (row) {
            var rowData = row.getData();
            for (var key in rowData) {
                if (key !== "driver" && key !== "points" && key !== "pos") {
                    let cellValue = rowData[key];
                    if (cellValue !== undefined) {
                        if (pointsOrPos === "points") {
                            let splitted = cellValue.split("(")
                            if (parseInt(splitted[0]) >= 25) {
                                row.getCell(key).getElement().style.backgroundColor = "#FDE06B";
                                row.getCell(key).getElement().style.color = "#18152e";
                            } else if (parseInt(splitted[0]) >= 18) {
                                row.getCell(key).getElement().style.backgroundColor = "#AEB2B8";
                                row.getCell(key).getElement().style.color = "#18152e";
                            } else if (parseInt(splitted[0]) >= 15) {
                                row.getCell(key).getElement().style.backgroundColor = "#d7985a";
                                row.getCell(key).getElement().style.color = "#18152e";
                            }
                            if (cellValue[cellValue.length - 1] === "s") {
                                row.getCell(key).getElement().innerText = row.getCell(key).getElement().innerText.slice(0,-1)
                                row.getCell(key).getElement().style.color = "#c90fd7";
                            }
                            if (cellValue[cellValue.length - 1] === "p") {
                                row.getCell(key).getElement().style.fontFamily = "Formula1Bold";
                                if (cellValue[cellValue.length - 2] === "s") {
                                    row.getCell(key).getElement().innerText = row.getCell(key).getElement().innerText.slice(0,-2)
                                    row.getCell(key).getElement().style.color = "#c90fd7";
                                }
                                else {
                                    row.getCell(key).getElement().innerText = row.getCell(key).getElement().innerText.slice(0,-1)

                                }
                            }
                        }
                        else if (pointsOrPos === "pos") {
                            let splitted = cellValue.split("(")
                            if (parseInt(splitted[0]) === 1) {
                                row.getCell(key).getElement().style.backgroundColor = "#FDE06B";
                                row.getCell(key).getElement().style.color = "#18152e";
                            } else if (parseInt(splitted[0]) == 2) {
                                row.getCell(key).getElement().style.backgroundColor = "#AEB2B8";
                                row.getCell(key).getElement().style.color = "#18152e";
                            } else if (parseInt(splitted[0]) === 3) {
                                row.getCell(key).getElement().style.backgroundColor = "#d7985a";
                                row.getCell(key).getElement().style.color = "#18152e";
                            }
                            if (cellValue[cellValue.length - 1] === "s") {
                                row.getCell(key).getElement().innerText = row.getCell(key).getElement().innerText.slice(0,-1)
                                row.getCell(key).getElement().style.color = "#c90fd7";
                            }
                            if (cellValue[cellValue.length - 1] === "p") {
                                row.getCell(key).getElement().style.fontFamily = "Formula1Bold";
                                if (cellValue[cellValue.length - 2] === "s") {
                                    row.getCell(key).getElement().innerText = row.getCell(key).getElement().innerText.slice(0,-2)
                                    row.getCell(key).getElement().style.color = "#c90fd7";
                                }
                                else {
                                    row.getCell(key).getElement().innerText = row.getCell(key).getElement().innerText.slice(0,-1)

                                }
                            }
                        }

                    }
                }
            }
        }

    });



}

function createTeamsTable(calendar) {
    teamsTable = new Tabulator("#seasonresults-teams-table",{
        layout: "fitColumns",
        maxWidth: "1650px",
        rowHeight: 60,
        responsiveLayout: "hide",
        columns: [{ title: "Team",field: "team",width: 195,headerSort: false,vertAlign: "middle",resizable: false,formatter: "html",headerHozAlign: "center" },
        ...calendar.map((race,index) => ({
            title: '<div class="flag-header"><img src="' + codes_dict[races_map[race[1]]] + '" alt="Image 1"><div class="text-in-front bold-font">' + races_names[race[1]] + '</div></div>',
            field: "race" + race[0],
            hozAlign: "center",
            vertAlign: "middle",
            headerSort: false,
            resizable: false
        })),
        { title: "Points",field: "points",hozAlign: "center", vertAlign: "middle",headerSort: false,headerHozAlign: "center",resizable: false },
        { title: "Position",field: "pos",hozAlign: "center",visible: false }],
    });
}

function colorTeamTable() {
    teamsTable.getColumns().forEach(column => {
        let field = column.getField();
        let topThreeValues = [];
        if (field.startsWith('race')) {
            let rows = teamsTable.getRows();
            let values = [];
            rows.forEach(row => {
                let cell = row.getCell(field);
                let value = cell.getValue();
                if (typeof value === 'string') {
                    let parts = value.split('(');
                    value = Number(parts[0]) + Number(parts[1].replace(')',''));
                }
                values.push(value);

            });
            values.sort((a,b) => b - a);
            topThreeValues = values.slice(0,3);
        }

        column.updateDefinition({
            formatter: function (cell,formatterParams) {
                let value = cell.getValue();
                if (value !== undefined) {
                    if (field.startsWith('race')) {
                        if (typeof value === 'string') {
                            let parts = value.split('(');
                            value = Number(parts[0]) + Number(parts[1].replace(')',''));
                        }
                        if(value !== 0){
                            if (topThreeValues[0] === value) {
                                return "<div style='background-color:#FDE06B; color:#18152e; align-items: center; display:flex; justify-content:center; height:100%; width:100%'>" + cell.getValue() + "</div>";
                            }
                            else if (topThreeValues[1] === value) {
                                return "<div style='background-color:#AEB2B8; color:#18152e; align-items: center; display:flex; justify-content:center; height:100%; width:100%'>" + cell.getValue() + "</div>";
                            }
                            else if (topThreeValues[2] === value) {
                                return "<div style='background-color:#d7985a; color:#18152e; align-items: center; display:flex; justify-content:center; height:100%; width:100%'>" + cell.getValue() + "</div>";
                            }
                            else {
                                return cell.getValue();
                            }
                        }
                        else{
                            return ""
                        }

                    }
                    else {
                        return cell.getValue();
                    }
                }
                else{
                    return "-"
                }

            }
        });
    })
}


document.getElementById("driverspill").addEventListener("click",function () {
    document.getElementById("seasonresults-teams-table").classList.add("d-none")
    document.getElementById("seasonresults-table").classList.remove("d-none")
})

document.getElementById("teamspill").addEventListener("click",function () {
    document.getElementById("seasonresults-teams-table").classList.remove("d-none")
    document.getElementById("seasonresults-table").classList.add("d-none")
})

/**
 * Even listener for the positions and points pill
 */
document.getElementById("pospill").addEventListener("click",function () {
    if (seasonTable) {
        seasonTable.destroy()
    }
    pointsOrPos = "pos"
    createDriversTable(calendarData)
    setTimeout(function () {
        loadDriversTable(seasonResults)
    },10);
})

document.getElementById("pointspill").addEventListener("click",function () {
    if (seasonTable) {
        seasonTable.destroy()
    }
    pointsOrPos = "points"
    createDriversTable(calendarData)
    setTimeout(function () {
        loadDriversTable(seasonResults)
    },10);
})

/**
 * Creates the year selector menu
 * @param {String} actualYear current year of the save
 */
function generateYearsMenu(actualYear) {
    var yearMenu = document.querySelector("#yearMenu");
    var yearH2H = document.querySelector("#yearMenuH2H");
    yearMenu.innerHTML = ""
    yearH2H.innerHTML = ""
    for (let year = actualYear; year >= 2023; year--) {
        let a = document.createElement("a");
        a.textContent = year.toString();
        a.classList = "dropdown-item"
        a.style.cursor = "pointer"
        yearMenu.appendChild(a);
        a.addEventListener("click",function () {
            document.getElementById("yearButton").textContent = a.textContent
            let dataYear = {
                command: "yearSelected",
                year: a.textContent
            }

            socket.send(JSON.stringify(dataYear))
        })
        let a2 = document.createElement("a");
        a2.textContent = year.toString();
        a2.classList = "dropdown-item"
        a2.style.cursor = "pointer"
        yearH2H.appendChild(a2);
        a2.addEventListener("click",function () {
            resetH2H()
            document.getElementById("yearButtonH2H").textContent = a2.textContent
            let dataYear = {
                command: "yearSelectedH2H",
                year: a2.textContent
            }

            socket.send(JSON.stringify(dataYear))
        })
    }
}

/**
 * Loads the data into the table
 * @param {Object} allDrivers all driver's results of the season
 */
function loadDriversTable(allDrivers) {
    seasonResults = allDrivers;
    allDrivers.forEach(function (driver) {
        addDriver(driver)
    })
    seasonTable.setSort("pos","asc");
    formatTable()
    document.querySelector("#seasonresults-table").querySelector(".tabulator-tableholder").style.maxHeight = document.querySelector("#seasonresults-table").querySelector(".tabulator-table").offsetHeight + "px";
    document.querySelector("#seasonresults-table").querySelector(".tabulator-tableholder").style.overflow = "hidden";
}

function loadTeamsTable(allDrivers) {
    for (let team in teams_full_name_dict) {
        addTeam(teams_full_name_dict[team],team,allDrivers)
    }
    console.log(allDrivers)
    colorTeamTable()
    teamsTable.setSort("points","desc");
    document.querySelector("#seasonresults-teams-table").querySelector(".tabulator-tableholder").style.maxHeight = "598px";
    document.querySelector("#seasonresults-teams-table").querySelector(".tabulator-tableholder").style.overflow = "hidden";
}

function addTeam(code,teamName,drivers) {
    let spanTeamName = document.createElement("span")
    spanTeamName.textContent = teamName
    spanTeamName.dataset.teamid = code
    let divOverall = document.createElement("div")
    divOverall.className = "team-table-logo-name"
    let logo = document.createElement("img")
    logo.setAttribute("src", logos_disc[code])
    logo.id = team_dict[code] + "logo"
    divOverall.appendChild(logo)
    divOverall.appendChild(spanTeamName)
    // manageColor(spanTeamName,spanTeamName)
    let rowData = { team: divOverall }
    drivers.forEach(function (elem) {
        if (elem[1] === code) {
            let totalPoints = 0;
            let raceValue;
            let sprintvalue;
            elem.slice(3).forEach((pair,index) => {
                if (pointsOrPos === "points") {
                    raceValue = 2;
                    sprintvalue = 5;
                }
                else if (pointsOrPos === "pos") {
                    raceValue = 1;
                    sprintvalue = 6;
                }
                let race;
                if (pair[raceValue] === -1) {
                    race = 0
                }
                else {
                    race = pair[raceValue]
                }
 
                if ('race' + pair[0] in rowData) {
                    if (pair.length === 5) {
                        rowData["race" + pair[0]] += race;
                    }
                    else if (pair.length === 7) {
                        let racePoints = parseInt(rowData["race" + pair[0]].split("(")[0]) + race
                        let sprintPoints = parseInt(rowData["race" + pair[0]].split("(")[1].slice(0,-1)) + pair[sprintvalue]
                        rowData["race" + pair[0]] = racePoints + "(" + sprintPoints + ")"
                    }
                } else {
                    if (pair.length === 5) {
                        rowData["race" + pair[0]] = race;
                    }
                    else if (pair.length === 7) {
                        rowData["race" + pair[0]] = race + "(" + pair[sprintvalue] + ")"
                    }
                }

                
            });
            elem.slice(3).forEach(function (elem) {
                if (elem[2] != "-1") {
                    totalPoints += elem[2]
                }
        
                if (elem.length === 7) {
                    totalPoints += elem[5]
                }
            })
            if("points" in rowData){
                rowData["points"] += totalPoints;
            }
            else{
                rowData["points"] = totalPoints;
            }
        }
    })
    teamsTable.addData(rowData)

}

/**
 * Formats the table for special vlaues
 */
function formatTable() {
    let data = seasonTable.getData()
    data.forEach(row => {
        for (var key in row) {
            if (key !== "driver" && key !== "points" && key !== "pos") {
                if (row[key] !== undefined) {
                    let val = row[key].split("(")
                    if (val.length == 2) {
                        if (val[0] === "0") {
                            val[0] = ""
                        }
                        if (val[0] === "-1") {
                            val[0] = "DNF"
                        }
                        else if (val[0] === "-1s") {
                            val[0] = "DNFs"
                        }
                        else if (val[0] === "-1p") {
                            val[0] = "DNFp"
                        }
                        else if (val[0] === "-1sp") {
                            val[0] = "DNFsp"
                        }
                        if (val[1] === "0)") {
                            val[1] = ""
                        }
                        else {
                            val[1] = "(" + val[1]
                        }
                        row[key] = val[0] + val[1]
                    }
                    else if (val.length == 1) {
                        if (row[key] === "0") {
                            row[key] = "";
                        }
                        if (row[key] === "-1") {
                            row[key] = "DNF";
                        }
                        else if (row[key] === "-1s") {
                            row[key] = "DNFs";
                        }
                        else if (row[key] === "-1p") {
                            row[key] = "DNFp";
                        }
                        else if (row[key] === "-1sp") {
                            row[key] = "DNFsp";
                        }
                    }
                }
                else {
                    row[key] = "-"
                }
            }
        }
    });
    seasonTable.setData(data);
}

/**
 * Adds one driver into the table
 * @param {Object} driverInfo one driver's season results
 */
function addDriver(driverInfo) {
    let nameDiv = document.createElement("div");
    let name = driverInfo[0].split(" ")
    let spanName = document.createElement("span")
    let spanLastName = document.createElement("span")
    spanName.textContent = name[0] + " "
    spanLastName.textContent = " " + name[1].toUpperCase()
    spanLastName.classList.add("bold-font")
    spanLastName.dataset.teamid = driverInfo[1]
    nameDiv.appendChild(spanName)
    nameDiv.appendChild(spanLastName)
    manageColor(spanLastName,spanLastName)
    let rowData = { driver: nameDiv.innerHTML,pos: driverInfo[2] }
    let raceValue;
    let sprintvalue;
    if (pointsOrPos === "points") {
        raceValue = 2;
        sprintvalue = 5;
    }
    else if (pointsOrPos === "pos") {
        raceValue = 1;
        sprintvalue = 6;
    }

    driverInfo.slice(3).forEach((pair,index) => {
        if (pair.length === 5) {
            rowData["race" + pair[0]] = "" + pair[raceValue];
        }
        else if (pair.length === 7) {
            rowData["race" + pair[0]] = pair[raceValue] + "(" + pair[sprintvalue] + ")"
        }
        if (pair[3] === 1) {
            rowData["race" + pair[0]] += "s"
        }
        if (pair[4] === 1) {
            rowData["race" + pair[0]] += "p"
        }

    });


    let totalPoints = 0;
    driverInfo.slice(3).forEach(function (elem) {
        if (elem[2] != "-1") {
            totalPoints += elem[2]
        }

        if (elem.length === 7) {
            totalPoints += elem[5]
        }
    })
    rowData["points"] = totalPoints;
    seasonTable.addData(rowData);
}
