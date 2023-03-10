window.onload = function loadUserProgram() {
    getUserProgram()
        .then((program) => {
            console.log(program);
            for (let i = 0; i < program.length; i++) {
                addElement(program[i]);
            }
        })
        .catch((errorMessage) => {
            console.log(errorMessage);
        })        
}

function getUserProgram() {
    return fetch("../../../../server/controller/user_program.php", {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data.program;
        })
}

function addElement(course) {
    const HOURS = ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18"];
    // create a new div element
    const newDiv = document.createElement("div");
  
    // and give it some content
    const newContent = document.createTextNode(course.title);
  
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
    newDiv.classList.add('event');
    newDiv.style.background = "#1abc9c";
    const startHour = course.start_time.slice(0, 2);
    const endHour = course.end_time.slice(0, 2);

    for (let i = 0; i < HOURS.length; i++) {
        if (startHour === HOURS[i]) {
            newDiv.style.gridRowStart = i + 2;
        }

        if (endHour === HOURS[i]) {
            newDiv.style.gridRowEnd = i + 2;
        }
    }

    const currentDiv = document.getElementById(course.day.toLowerCase());
  
    currentDiv.appendChild(newDiv);
  }