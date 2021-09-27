console.log("Connected");

let form = document.querySelector("form");
let address = document.querySelector("input");
let first = document.querySelector("#first");
let second = document.querySelector("#second")

form.addEventListener("submit", (e) => {
    e.preventDefault();

    first.innerText = "loading....";
    second.innerText = "";

    fetch(`http://localhost:3000/weather?address=${address.value}`).then((res) => {
        res.json().then(data => {
            if (data.error) {
                first.innerText = data.error;

            } else {
                first.innerText = data.location;
                second.innerText = data.responseData;
            }
        })
    })
})

