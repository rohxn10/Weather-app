import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const apiKey = "6a1c617a8f196f129143dee35b027cb0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
let data;

app.get("/", (req, res) => {
    res.render("index.ejs", { content: data });
})

app.post("/search", async (req, res) => {

    try {
        const cityName = req.body.cityName;
        const result = await axios.get(apiUrl + `&apiKey=${apiKey}` + `&q=${cityName}`);
    
        data = {
            temp: Math.floor(result.data.main.temp) + "°C",
            name: result.data.name,
            humidity: result.data.main.humidity + "%",
            wind: result.data.wind.speed + " km/h",
            image: result.data.weather[0].main
        }
        console.log(data.image);
        res.redirect("/")
    }
    catch{
        data={
            error: "true"
        }
        res.redirect("/")
    }
});
app.listen(port, function () {
    console.log(`running on port ${port}`);
})