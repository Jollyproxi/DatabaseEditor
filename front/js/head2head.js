let driver1_selected = false;
let driver2_selected = false;
let driver1Sel;
let driver2Sel;
let pos_dict = { 1: "1st", 2: "2nd", 3: "3rd" }
let d1_team
let d2_team
let wins = false;
let poles = false;
let colors_dict = { "10": "#F91536", "11": "#f1f1f1", "20": "#F58020", "21": "#47c7fc", "30": "#3671C6", "31": "#ffd300", "40": "#6CD3BF", "41": "#fcfcfc", "50": "#2293D1", "51": "#fd48c7", "60": "#37BEDD", "61": "#3792dd", "70": "#B6BABD", "71": "#da291c", "80": "#5E8FAA", "81": "#f1f1f1", "90": "#C92D4B", "91": "#f1f1f1", "100": "#358C75", "101": "#c3dc00" }
let graph;

function manage_h2h_bars(data) {
    console.log(data)
    let relValue
    let d1_width
    let d2_width
    if (data[7].some(elem => elem >= 2)) {
        data[4] = data[7]
        document.getElementById("bestrh2h").querySelector(".name-H2H").textContent = "WINS"
        wins = true
        console.log(data)
    }
    else {
        document.getElementById("bestrh2h").querySelector(".name-H2H").textContent = "BEST RACE"
        wins = false
    }
    if (data[8].some(elem => elem >= 2)) {
        data[5] = data[8]
        document.getElementById("bestqh2h").querySelector(".name-H2H").textContent = "POLES"
        poles = true
    }
    else {
        document.getElementById("bestqh2h").querySelector(".name-H2H").textContent = "BEST QUALI"
        poles = false
    }

    document.querySelectorAll(".one-statH2H").forEach(function (elem, index) {
        if (elem.id === "bestrh2h" || elem.id === "bestqh2h") {
            if (!wins && elem.id === "bestrh2h") {
                d1_width = 100 - (data[index][0] - 1) * 5
                d2_width = 100 - (data[index][1] - 1) * 5
                if (data[index][0] <= 3) {
                    elem.querySelector(".driver1-number").textContent = pos_dict[data[index][0]]
                }
                else {
                    elem.querySelector(".driver1-number").textContent = data[index][0] + "th"
                }
                if (data[index][1] <= 3) {
                    elem.querySelector(".driver2-number").textContent = pos_dict[data[index][1]]
                }
                else {
                    elem.querySelector(".driver2-number").textContent = data[index][1] + "th"
                }
            }
            else if (wins && elem.id === "bestrh2h") {
                relValue = (100 / (data[index][0] + data[index][1])).toFixed(2)
                d1_width = data[index][0] * relValue
                d2_width = data[index][1] * relValue
                elem.querySelector(".driver1-number").textContent = data[index][0]
                elem.querySelector(".driver2-number").textContent = data[index][1]
            }
            if (!poles && elem.id === "bestqh2h") {
                d1_width = 100 - (data[index][0] - 1) * 5
                d2_width = 100 - (data[index][1] - 1) * 5
                if (data[index][0] <= 3) {
                    elem.querySelector(".driver1-number").textContent = pos_dict[data[index][0]]
                }
                else {
                    elem.querySelector(".driver1-number").textContent = data[index][0] + "th"
                }
                if (data[index][1] <= 3) {
                    elem.querySelector(".driver2-number").textContent = pos_dict[data[index][1]]
                }
                else {
                    elem.querySelector(".driver2-number").textContent = data[index][1] + "th"
                }
            }
            else if (poles && elem.id === "bestqh2h") {
                relValue = (100 / (data[index][0] + data[index][1])).toFixed(2)
                d1_width = data[index][0] * relValue
                d2_width = data[index][1] * relValue
                elem.querySelector(".driver1-number").textContent = data[index][0]
                elem.querySelector(".driver2-number").textContent = data[index][1]
            }
        }
        else {
            if (elem.id === "raceh2h" || elem.id === "qualih2h") {
                relValue = (100 / (data[0][0] + data[0][1])).toFixed(2)
            }
            else if (elem.id === "ptsh2h") {
                relValue = 100 / Math.max(data[index][0], data[index][1])
                console.log(relValue)
            }
            else if (elem.id === "dnfh2h" || elem.id === "podiumsh2h") {
                relValue = (100 / (data[index][0] + data[index][1])).toFixed(2)
            }
            if (relValue == Infinity) {
                relValue = 0
            }
            d1_width = data[index][0] * relValue
            d2_width = data[index][1] * relValue
            elem.querySelector(".driver1-number").textContent = data[index][0]
            elem.querySelector(".driver2-number").textContent = data[index][1]
        }
        if (d1_width > 100) {
            d1_width = 100
        }
        if (d2_width > 100) {
            d2_width = 100
        }
        elem.querySelector(".driver1-bar").className = "driver1-bar"
        elem.querySelector(".driver2-bar").className = "driver2-bar"
        document.querySelector(".driver1-name").className = "driver1-name"
        document.querySelector(".driver2-name").className = "driver2-name"
        elem.querySelector(".driver1-bar").classList.add(team_dict[d1_team] + "bar-primary")
        document.querySelector(".driver1-name").classList.add(team_dict[d1_team] + "border-primary")
        if (d1_team === d2_team) {
            elem.querySelector(".driver2-bar").classList.add(team_dict[d2_team] + "bar-secondary")
            document.querySelector(".driver2-name").classList.add(team_dict[d2_team] + "border-secondary")
        }
        else {
            elem.querySelector(".driver2-bar").classList.add(team_dict[d2_team] + "bar-primary")
            document.querySelector(".driver2-name").classList.add(team_dict[d2_team] + "border-primary")
        }
        elem.querySelector(".driver1-bar").style.width = d1_width + "%"
        elem.querySelector(".driver2-bar").style.width = d2_width + "%"

    })
}

function load_drivers_h2h(drivers) {
    let driver1Menu = document.querySelector("#d1Menu")
    driver1Menu.innerHTML = ""
    let driver2Menu = document.querySelector("#d2Menu")
    driver2Menu.innerHTML = ""
    drivers.forEach(function (elem) {
        let nameDiv = document.createElement("div");
        let name = elem[0].split(" ")
        let spanName = document.createElement("span")
        let spanLastName = document.createElement("span")
        spanName.textContent = name[0] + " "
        spanLastName.textContent = " " + name[1].toUpperCase()
        spanLastName.classList.add("bold-font")
        spanLastName.dataset.teamid = elem[2]
        let a = document.createElement("a");
        a.dataset.driverid = elem[1]
        nameDiv.appendChild(spanName)
        nameDiv.appendChild(spanLastName)
        a.appendChild(nameDiv)
        a.classList = "dropdown-item"
        a.classList.add(team_dict[elem[2]] + "border-down")
        a.style.cursor = "pointer"
        let a2 = a.cloneNode(true)
        driver1Menu.appendChild(a2);
        driver2Menu.appendChild(a);
        listeners_h2h(a, a2)
    })
}

function listeners_h2h(aDriver2, aDriver1) {
    aDriver1.addEventListener("click", function () {
        if (!driver1_selected) {
            driver1_selected = true
        }
        driver1Sel = aDriver1
        document.querySelector(".driver1-first").textContent = driver1Sel.firstChild.children[0].innerText
        document.querySelector(".driver1-second").textContent = driver1Sel.firstChild.children[1].innerText
        document.querySelector(".driver1-second").dataset.teamid = driver1Sel.firstChild.children[1].dataset.teamid
        d1_team = driver1Sel.firstChild.children[1].dataset.teamid
        document.querySelector(".driver1-second").className = "driver1-second bold-font"
        let newName = aDriver1.firstChild.cloneNode(true)
        document.querySelector("#driver1Button").innerHTML = ""
        document.querySelector("#driver1Button").appendChild(newName)
        manageColor(document.querySelector(".driver1-second"), document.querySelector(".driver1-second"))
        if (driver1_selected && driver2_selected) {
            let data = {
                command: "H2HConfigured",
                d1: driver1Sel.dataset.driverid,
                d2: driver2Sel.dataset.driverid,
                year: document.querySelector("#yearButtonH2H").textContent
            }

            socket.send(JSON.stringify(data))
        }
    })
    aDriver2.addEventListener("click", function () {
        if (!driver2_selected) {
            driver2_selected = true
        }
        driver2Sel = aDriver2
        console.log(driver2Sel)
        document.querySelector(".driver2-first").textContent = driver2Sel.firstChild.children[0].innerText
        document.querySelector(".driver2-second").textContent = driver2Sel.firstChild.children[1].innerText
        document.querySelector(".driver2-second").dataset.teamid = driver2Sel.firstChild.children[1].dataset.teamid
        document.querySelector(".driver2-second").className = "driver2-second bold-font"
        let newName2 = aDriver2.firstChild.cloneNode(true)
        document.querySelector("#driver2Button").innerHTML = ""
        document.querySelector("#driver2Button").appendChild(newName2)
        d2_team = driver2Sel.firstChild.children[1].dataset.teamid
        manageColor(document.querySelector(".driver2-second"), document.querySelector(".driver2-second"))
        if (driver1_selected && driver2_selected) {
            let data = {
                command: "H2HConfigured",
                d1: driver1Sel.dataset.driverid,
                d2: driver2Sel.dataset.driverid,
                year: document.querySelector("#yearButtonH2H").textContent
            }

            socket.send(JSON.stringify(data))
        }
    })
}

function load_h2h_graph(data) {
    var labels = [];
    data[0].forEach(function (elem) {
        labels.push(races_names[elem[1]])
    })

    let d1_res = [];
    let d2_res = [];

    data[1].slice(3).forEach(function (elem) {
        if (elem[1] === -1) {
            elem[1] = 20
        }
        d1_res.push(elem[1])
    })
    data[2].slice(3).forEach(function (elem) {
        if (elem[1] === -1) {
            elem[1] = 20
        }
        d2_res.push(elem[1])
    })
    let d1_color = colors_dict[data[1][1] + "0"]
    let d2_color;
    if (data[1][1] === data[2][1]) {
        d2_color = colors_dict[data[2][1] + "1"]
    }
    else {
        d2_color = colors_dict[data[2][1] + "0"]
    }

    console.log(labels)
    if (typeof graph !== 'undefined' && graph !== null) {
        graph.destroy();
    }
    createChart(labels, d1_res, d2_res, d1_color, d2_color, data[1][0], data[2][0])

}

function createChart(labelsArray, d1Results, d2Results, d1_color, d2_color, d1_name, d2_name) {
    const dataD = {
        labels: labelsArray,
        datasets: [
            {
                label: d1_name,
                data: d1Results,
                borderColor: d1_color,
                pointBackgroundColor: d1_color,
                borderWidth: 2,
                fill: false
            },
            {
                label: d2_name,
                data: d2Results,
                borderColor: d2_color,
                pointBackgroundColor: d2_color,
                borderWidth: 2,
                fill: false
            },
        ]
    };
    graph = new Chart(
        document.getElementById('driverGraph'),
        {
            type: 'line',
            data: dataD,
            options: {
                scales: {
                    x: {
                        grid: {
                            color: '#3d3b4d' // Cambia el color de las guías en el eje X
                        },
                        ticks: {
                            color: "#dedde6"
                        }
                    },
                    y: {
                        reverse: true, // Invierte el eje Y
                        min: 1,
                        max: 20,
                        grid: {
                            color: '#3d3b4d' // Cambia el color de las guías en el eje Y
                        },
                        ticks: {
                            color: "#dedde6"
                        }

                    }
                },
                plugins:{
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: "#dedde6",
                        },
                    }
                }


            }
        }
    );
}