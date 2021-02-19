function user_search() {
    let search_parameter = document.getElementById("searchBar");
    let locations = document.getElementsByClassName("userid");
    locations.forEach(loc => {
        if (search_parameter === loc.innerHTML) {
            loc.style.display = "block";
        }
    });

}