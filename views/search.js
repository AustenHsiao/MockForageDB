function user_search() {
    let search_parameter = document.getElementById("userNameInput").value;
    let locations = document.getElementsByClassName("userid");

    for (const loc of locations) {
        if (String(search_parameter) === loc.innerHTML) {
            loc.style.display = "block";
        }
    };
}