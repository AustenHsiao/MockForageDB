function user_search() {
    let search_parameter = document.getElementById("userNameInput").value;
    let locations = document.getElementsByClassName("location_data");

    for (const loc of locations) {
        //loc.rows[0].innerText.trim() -- row 0 contains the userid. Trim whitespace
        if (String(search_parameter) === loc.rows[0].innerText.trim()) {
            loc.style.display = "block";
        }
    };
}