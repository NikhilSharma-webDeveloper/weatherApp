let form = document.querySelector("form");
let address = document.querySelector("input");
let first = document.querySelector("#first");
let second = document.querySelector("#second")
let icon = document.querySelector("#icon");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    first.innerText = "loading....";
    second.innerText = "";

    fetch(`/weather?address=${address.value}`).then((res) => {
        res.json().then(data => {
            if (data.error) {
                first.innerText = data.error;

            } else {
                icon.setAttribute("src", data.weather_icons)
                first.innerText = data.location;
                second.innerText = data.responseData;
            }
        })
    })
})

