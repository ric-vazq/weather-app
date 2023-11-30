const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const request = require('request')
const apiKey = '44e40c651836a2ed49b97f00a74cc892'
const port = 3000; 

app.set('views', './views');
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.render('index')
});

app.post('/', (req, res) => {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    request(url, (err, respose, body) => {
        if (err){
            res.render('index', {weather: null, error: 'Error, please try again'})       
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', {weather: null, error: 'Error, please try again'})
            } else {
                let weatherText = `It's ${weather.main.temp} degrees Celcius in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null})
            }
        }
    })
})

app.listen(port, ()=> {console.log(`Example app listening on port ${port}`);})