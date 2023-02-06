function deleteCookie() {
    removeCookie("PHPSESSID");
}

function removeCookie(cookieName) {
    cookieValue = "";
    cookieLifetime = -1;
    var date = new Date();
    date.setTime(date.getTime()+(cookieLifetime*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
    document.cookie = cookieName+"="+JSON.stringify(cookieValue)+expires+"; path=/";
}

var getNameFn = function getName() {
  return getUserName().then((response) => {
    return response["name"];
  })
  .catch((errorMessage) => {
      console.log(errorMessage);
  });
};

$(window).load(function() {
  getNameFn().then(function(name) {
    $("h2#user-title-id").html(name);
  });
});

function getUserName() {
    return fetch("../../../../server/controller/current_user.php", {
        method: "GET",
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        return data;
    })
}
