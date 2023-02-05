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