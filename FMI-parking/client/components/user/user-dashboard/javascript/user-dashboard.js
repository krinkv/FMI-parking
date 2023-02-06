var getNumberTakenSpots = function getTakenSpots(payload) {
  return getNumberOfTakenSpotsByRole(payload).then((response) => {
    return response["taken_spots"];
  })
  .catch((errorMessage) => {
      console.log(errorMessage);
  });
};

var getNumberFreeSpots = function getFreeSpots() {
  return getFreeSpotsNow().then((response) => {
    return response["free_spots_now"];
  })
  .catch((errorMessage) => {
      console.log(errorMessage);
  });
};

$(window).load(function() {
    const hon_payload = { user_type: "CONTRACT_LECTURER" };
    const shtat_payload = { user_type: "FULL_TIME_LECTURER" };
    const stu_payload = { user_type: "RESTRICTED_ACESS" };

    getNumberTakenSpots(shtat_payload).then(function(num) {
        $("h2#shtat-count").html(num);
    });
    getNumberTakenSpots(hon_payload).then(function(num) {
        $("h2#hon-count").html(num);
    });
    getNumberTakenSpots(stu_payload).then(function(num) {
        $("h2#stu-count").html(num);
    });
    getNumberTakenSpots().then(function(num) {
        $("h2#free-count").html(num);
    });
});

function getNumberOfTakenSpotsByRole(payload) {
    return fetch("../../../../server/controller/taken_spots_by_user_type.php", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        return data;
    })
}

function getFreeSpotsNow() {
    return fetch("../../../../server/controller/free_parking_spots.php", {
        method: "GET",
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        return data;
    })
}
