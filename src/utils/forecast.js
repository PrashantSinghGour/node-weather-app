const request = require('request')


const getForecast = (latitude,longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=8f29b678b8b1d26b8055d7edcc82360b&query='+ longitude+','+latitude
  
  request({url, json:true}, (error, {body} ={})=> {
    
    if(error) {
      callback('Unable to connect to weather service!', undefined)
    } else if(body.error) {
      callback('Unable to find location!', undefined)
    } else {
      const currentTemperature = body.current.temperature;
      const feelsLike = body.current.feelslike
      callback( undefined, body.current.weather_descriptions[0] + '. It is currently ' + currentTemperature + ' out. It feels like ' + feelsLike + ' out' )
    }
    
  })
}

module.exports = getForecast

