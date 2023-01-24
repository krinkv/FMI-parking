// Get all the navigation links
var links = document.querySelectorAll('.menu-element a');

// Loop through the links and add a click event listener to each one
for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(event) {
        event.preventDefault();
        var link = this.getAttribute('href');

        // Use AJAX to get the new content for the page
        var xhr = new XMLHttpRequest();
        xhr.open('GET', link, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Update the content of the page with the new content
                document.querySelector('main').innerHTML = xhr.responseText;
            }
        };
        xhr.send();
    });
}
