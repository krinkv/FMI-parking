// TODO: create legit images
let fmiImg = new Image();
fmiImg.src = "./images/fmi.png";
let fhfImg = new Image();
fhfImg.src = "./images/fhf.png";
let fzfImg = new Image();
fzfImg.src = "./images/fzf.png";
let carImg = new Image();
carImg.src = "./images/car.png";
// Coordinates of where car images should be positioned inside each parking image to indicate that a particular spot is taken
// Example: Spot 6 in sector 1 (FMI parking) is taken means that a car image should be placed on position parkingImgSpots[0][5]
// TODO: fill with legit data
let parkingImgSpots = [
    [ [120,260],[160,260],[210,260],[270,260],[340,260],[400,260],[490,260],[580,260],[650,260],[720,260] ],
    [ [120,260],[160,260],[210,260],[270,260],[340,260],[400,260],[490,260],[580,260],[650,260],[720,260] ],
    [ [120,260],[160,260],[210,260],[270,260],[340,260],[400,260],[490,260],[580,260],[650,260],[720,260] ]
];
let parkingStrs = [ "FMI", "FZF", "FHF" ];

// Initally taken spots will be empty.
// If we want them to match the initial/default time interval, we need to call endpoint here
let takenSpots = [{"sector":"FMI", "number":3}, {"sector":"FMI", "number":5}, {"sector":"FHF", "number":2}];

let curParkingIdx = 0;

const getDays = (year, month) => {
    return new Date(year, month, 0).getDate();
};

function startOfMonth(date) {
   return new Date(date.getFullYear(), date.getMonth(), 1);
}

window.onload = function loadMonth() {
    setupCanvas(fmiImg);
    const DAYS = 7;
    const WEEKS = 5;
    const current = new Date();
    const lastMonthLimit = getDays(current.getFullYear(), current.getMonth() - 1);
    const thisMonthLimit = getDays(current.getFullYear(), current.getMonth());

    console.log("last month limit " + lastMonthLimit);
    var firstMonthDay = startOfMonth(current).getDay();
    console.log("first month day " + firstMonthDay);
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
        console.log("parking changed");
        curParkingIdx = parkingOption.value - 1;
        if (curParkingIdx == 0) {
            setupCanvas(fmiImg);
        }
        else if (curParkingIdx == 1) {
            setupCanvas(fzfImg);
        }
        else if (curParkingIdx == 2) {
            setupCanvas(fhfImg);
        }
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
        canvasPutCars();
    });
    
    var search = document.querySelector("#search");
    search.addEventListener("click", function(e) {
        document.querySelector(".booking").classList.add("is-sent");
        e.preventDefault();
    });
}

function setupCanvas(img) {
    let canvas = document.querySelector('canvas');
    let canvasCtx = canvas.getContext('2d');
    canvasCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
    canvasPutCars();
}

function updateTakenSpots() {
    console.log("updating canvas with checkin = ", checkin.value, " checkout = ", checkout.value);
    let checkin = document.getElementById("checkin");
    let checkout = document.getElementById("checkout");

    // TODO: convert checkin and checkout datetimes to the format that backend expects
    takenSpots = getTakenSpots(/*convert*/checkin, /*convert*/checkout);
}

function canvasPutCars() {
    let canvas = document.querySelector('canvas');
    let canvasCtx = canvas.getContext('2d');

    takenSpots.forEach((takenSpot) => {
        if (takenSpot["sector"] != parkingStrs[curParkingIdx]) {
            return; // meaning continue in forEach()
        }
        let spotNumber = takenSpot["number"];
        let carPosition = parkingImgSpots[curParkingIdx][spotNumber - 1];
        canvasCtx.drawImage(carImg, carPosition[0], carPosition[1], 140, 100);
    });
}

function getTakenSpots(start_time, end_time) {
    // TODO: call endpoint here
    return [{"sector":"FMI", "number":3}, {"sector":"FMI", "number":5}, {"sector":"FHF", "number":2}];
}