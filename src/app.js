const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const foreCast = require("./utils/foreCast")

// All Paths
const publicPath = path.join(__filename, "../../public");
const viewsPath = path.join(__filename, "../../components/views");
const partialPath = path.join(__filename, "../../components/partials")

// Setting up for the static components like webpage, css , images
app.use(express.static(publicPath));

// Setting up for the dynamic pages
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialPath)



app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        author: "Nikhil"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        author: "Nikhil"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        author: "Nikhil"
    })
})

app.get("/weather", (req, res) => {

    if (!req.query.address) {
        return res.send({ error: "Please provide the address" })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        foreCast({ latitude, longitude, location }, (error, weather) => {
            if (error) {
                return res.send({ error });
            }
            let { responseData, location, weather_icons } = weather;
            res.send({ responseData, location, address: req.query.address, weather_icons });
        })
    })
})
app.get("*", (req, res) => {
    res.send("404 not found")
})

app.listen(port, () => {
    console.log("App is started at port ", port)
})
