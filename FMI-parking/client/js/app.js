'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('register', 'components/home/', 'home.html', true),
            new Route('login', 'components/login/', 'login.html')
        ]);
    }
    init();
}());
