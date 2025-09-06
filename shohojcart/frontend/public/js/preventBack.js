document.addEventListener('DOMContentLoaded', (event) => {
    if (sessionStorage.getItem('loggedIn') === 'true') {
        window.history.pushState(null, '', window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    }
});
