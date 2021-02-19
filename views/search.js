function user_search() {
    let search_parameter = document.getElementById("searchBar");
    let locations = document.getElementsByClassName("userid");

    for (const loc of locations) {
        if (search_parameter === loc.innerHTML) {
            loc.style.display = "block";
        }
    };
}