// TODO: create legit images
let parkingImgs = [ new Image(), new Image(), new Image() ];
parkingImgs[0].src = "./images/fmi.png";
parkingImgs[1].src = "./images/fzf.png";
parkingImgs[2].src = "./images/fhf.png";
let carImgs = [ new Image(), new Image(), new Image() ];
carImgs[0].src = "./images/car-v-red.png";
carImgs[1].src = "./images/car-hl-red.png";
carImgs[2].src = "./images/car-hr-red.png";
// Coordinates of where car images should be positioned inside each parking image to indicate that a particular spot is taken
// Example: Spot 6 in sector 1 (FMI parking) is taken means that a car image should be placed on position parkingImgSpots[0][5]
// TODO: fill with legit data
let parkingImgSpots = [
    [ [126,346,0],[242,346,0],[356,346,0],[472,346,0],[590,346,0],[708,346,0],[822,346,0],[940,346,0],[1055,346,0],[1172,346,0], /*carDrawWidth*/60 ],
    [ [940,68,1],[940,190,1],[940,310,1],[940,428,1],[350,324,2],[350,430,2],[350,530,2],[350,636,2],[350,734,2],[350,836,2], /*carDrawWidth*/80 ],
    [ [950,68,2],[950,161,2],[950,247,2],[950,336,2],[950,421,2],[950,508,2],[950,596,2],[950,682,2],[950,772,2],[950,856,2], /*carDrawWidth*/60 ]
];
let parkingStrs = [ "FMI", "FZF", "FHF" ];

// Initally taken spots will be empty.
// If we want them to match the initial/default time interval, we need to call endpoint here
let takenSpots = [];

let curParkingIdx = 0;

const getDays = (year, month) => {
    return new Date(year, month, 0).getDate();
};

function startOfMonth(date) {
   return new Date(date.getFullYear(), date.getMonth(), 1);
}

window.onload = function loadMonth() {
    drawParking();
    const DAYS = 7;
    const WEEKS = 5;
    const current = new Date();
    const lastMonthLimit = getDays(current.getFullYear(), current.getMonth() - 1);
    const thisMonthLimit = getDays(current.getFullYear(), current.getMonth());

    var firstMonthDay = startOfMonth(current).getDay();
    var index = lastMonthLimit - firstMonthDay + 1;

    const tbl = document.getElementById("table");
  
    for (let i = 0; i < WEEKS; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < DAYS; j++) {
        const cell = document.createElement("td");
        if (i == 0 && j == firstMonthDay) {
            index = 1;
        }
        if (i == WEEKS - 1 && index == thisMonthLimit) {
            index = 1;
        }

        if ((i == WEEKS - 1 && index < 10) || (i == 0 && index > 10)) {
            cell.classList.add("notCurMonth");
        } else if (index == current.getDay()) {
            cell.classList.add("curDay");
        }
        const cellText = document.createTextNode(index);
        cell.appendChild(cellText);
        row.appendChild(cell);
        index++;
      }
  
      tbl.appendChild(row);
    }

    var parkingOption = document.getElementById("parking-option");
    parkingOption.addEventListener("change", function() {
        curParkingIdx = parkingOption.value - 1;
        drawParking();
    });
}

function showCalendar() {
    var popUps = document.querySelectorAll(".pop-up");
    for (var i = 0; i < popUps.length; i++) {
        popUps[i].addEventListener("click", function() {
            document.querySelector("#overlay").style.display = "block";
            document.querySelector(".calendar").style.display = "block";
            var clickedButton = this.parentElement.querySelector("input").id;
            document.querySelector(".dates").dataset.type = clickedButton;
        });
    }
    
    var table = document.querySelector("table");
    table.addEventListener("click", function(event) {
        var target = event.target;
        if (target.tagName === "TD" && !target.classList.contains("notCurMonth") && !target.classList.contains("holiday") && !target.classList.contains("curDay")) {
            document.querySelector("td.curDay").classList.toggle("curDay");
            target.classList.toggle("curDay");
        }
    });
    
    var addEvent = document.querySelector("#add_event");
    addEvent.addEventListener("click", function() {
        var value = document.querySelector("td.curDay").innerHTML;
        document.querySelector("#overlay").style.display = "none";
        document.querySelector(".calendar").style.display = "none";
        var id = document.querySelector(".dates").dataset.type;
        document.querySelector("#" + id).value = value + " Февруари, 2023";
        updateTakenSpots();
    });

    var beginHourOption = document.getElementById("begin-hour");
    beginHourOption.addEventListener("change", function() {
        updateTakenSpots();
    });

    var endHourOption = document.getElementById("end-hour");
    endHourOption.addEventListener("change", function() {
        updateTakenSpots();
    });
}

function reserveSpot() {
    let date = document.getElementById("checkin").value;
    let begin_hour = document.getElementById("begin-hour").value;
    let end_hour = document.getElementById("end-hour").value;
    let start_time = getDateTimeForRequest(date, begin_hour);
    let end_time = getDateTimeForRequest(date, end_hour);
    let parking_option = document.getElementById("parking-option").value;
    let number = document.getElementById("number-option").value;
    let sector = parkingStrs[parking_option - 1];

    let reqData = {
        "start_time" : start_time,
        "end_time" : end_time,
        "sector" : sector,
        "number" : number
    };

    reserveSpotRequest(reqData)
        .then((data) => {
            updateTakenSpots();
        })
        .catch((errorMsg) => {
            console.log(errorMsg);
        });
}

function updateTakenSpots() {
    let date = document.getElementById("checkin").value;
    let begin_hour = document.getElementById("begin-hour").value;
    let end_hour = document.getElementById("end-hour").value;

    let start_time = getDateTimeForRequest(date, begin_hour);
    let end_time = getDateTimeForRequest(date, end_hour);

    let reqData = { "start_time" : start_time, "end_time" : end_time };

    getTakenSpots(reqData)
        .then((data) => {
            takenSpots = data["taken_spots"];
            drawParking();
        })
        .catch((errorMsg) => {
            console.log(errorMsg);
        })
}

function drawParking() {
    let canvas = document.querySelector('canvas');
    let canvasCtx = canvas.getContext('2d');
    canvasCtx.drawImage(parkingImgs[curParkingIdx], 0, 0, canvas.width, canvas.height);

    // Put cars on the taken spots
    let ratioCanvasToImg = [
        (canvas.width / parkingImgs[curParkingIdx].width),
        (canvas.height / parkingImgs[curParkingIdx].height)
    ]
    takenSpots.forEach((takenSpot) => {
        if (takenSpot["sector"] != parkingStrs[curParkingIdx]) {
            return; // meaning continue in forEach()
        }
        let spotNumber = takenSpot["number"];
        let carPositionX = parkingImgSpots[curParkingIdx][spotNumber][0];
        let carPositionY = parkingImgSpots[curParkingIdx][spotNumber][1];
        let carDrawWidth = parkingImgSpots[curParkingIdx][10];
        let carImg = carImgs[parkingImgSpots[curParkingIdx][spotNumber][2]];
        carPositionX *= ratioCanvasToImg[0];
        carPositionY *= ratioCanvasToImg[1];
        canvasCtx.drawImage(carImg, carPositionX, carPositionY, carDrawWidth, carDrawWidth * (carImg.height / carImg.width));
    });
}

function getMonthFromBulgarian(str) {
    if (str == "Януари") return "01";
    else if (str == "Февруари") return "02";
    else if (str == "Март") return "03";
    else if (str == "Април") return "04";
    else if (str == "Май") return "05";
    else if (str == "Юни") return "06";
    else if (str == "Юли") return "07";
    else if (str == "Август") return "08";
    else if (str == "Септември") return "09";
    else if (str == "Октомври") return "10";
    else if (str == "Ноември") return "11";
    else if (str == "Декември") return "12";
    return "invalidmonth";
}

function getDateTimeForRequest(date, time) {
    let dateParts = date.split(" ");
    let day = dateParts[0];
    if (day.length == 1) {
        day = "0" + day;
    }
    let month = getMonthFromBulgarian(dateParts[1].slice(0,-1));
    let year = dateParts[2];

    let datetime = year + "-" + month + "-" + day + " " + time;
    return datetime;
}

function getTakenSpotsTestData() {
    return [{"sector":"FMI", "number":3}, {"sector":"FMI", "number":5}, {"sector":"FHF", "number":2}];
}

function getTakenSpots(data) {
    return fetch("../../../../server/controller/taken_parking_spots.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        return data;
    })
}

function reserveSpotRequest(data) {
    return fetch("../../../../server/controller/reserve_parking_spot.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        return data;
    })
}