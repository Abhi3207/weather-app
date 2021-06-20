const express = require('express')
const bodyparser = require('body-parser')
const request = require('request')
const app = express()


app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: true}));
app.set('view engine', 'ejs')

let apikey='4901e85860bb94e57b1ac15062076c81';
 

app.get('/',(req,res)=>{
    res.render('index',{weather: null, error: null});
})


app.post('/', (req, res)=> {
    let city = req.body.city;
    const url=`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`; 

  request(url,(err, response, body)=> {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `Temp= ${weather.main.temp}, location=${weather.name},  wind speed=${weather.wind.speed}, humidity=${weather.main.humidity}, pressure=${weather.main.pressure}`;
          res.render('index', {weather: weatherText, error: null});
        }
      }
    });
  })
app.get('*', (req,res)=>{
    console.log('data not found')
})

app.listen(5000,() => {
    console.log('Example app listening on port 3000!')
  })
